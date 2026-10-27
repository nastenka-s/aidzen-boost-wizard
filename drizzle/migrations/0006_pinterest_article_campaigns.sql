CREATE TABLE public.pinterest_article_campaigns (
 article_url text PRIMARY KEY CHECK (article_url ~ '^https://aidzen\.ru/[a-z0-9][a-z0-9/-]*$'),
 title text NOT NULL, description text NOT NULL DEFAULT '', content_kind text NOT NULL DEFAULT '',
 publication_day date NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.pinterest_article_campaigns TO service_role;
REVOKE ALL ON public.pinterest_article_campaigns FROM anon, authenticated;
ALTER TABLE public.pinterest_article_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_manage ON public.pinterest_article_campaigns FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE TABLE public.pinterest_article_jobs (
 article_url text NOT NULL REFERENCES public.pinterest_article_campaigns(article_url),
 variant integer NOT NULL CHECK (variant BETWEEN 0 AND 3), due_day date NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','published')),
 pin_id uuid REFERENCES public.pinterest_pins(id), published_at timestamptz,
 image_payload jsonb, last_error text, PRIMARY KEY(article_url, variant)
);
GRANT ALL ON public.pinterest_article_jobs TO service_role;
REVOKE ALL ON public.pinterest_article_jobs FROM anon, authenticated;
ALTER TABLE public.pinterest_article_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_manage ON public.pinterest_article_jobs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE INDEX pinterest_article_jobs_due ON public.pinterest_article_jobs(due_day) WHERE status='pending';
ALTER TABLE public.pinterest_pins ADD COLUMN article_url text, ADD COLUMN article_variant integer;
CREATE UNIQUE INDEX pinterest_article_pin_unique ON public.pinterest_pins(article_url,article_variant) WHERE article_url IS NOT NULL AND status='published';
CREATE OR REPLACE FUNCTION public.enqueue_pinterest_article(p_url text,p_title text,p_description text,p_kind text,p_day date) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF p_title IS NULL OR length(trim(p_title))=0 OR p_day IS NULL THEN RAISE EXCEPTION 'Invalid article'; END IF;
 INSERT INTO public.pinterest_article_campaigns(article_url,title,description,content_kind,publication_day)
 VALUES(p_url,p_title,coalesce(p_description,''),coalesce(p_kind,''),p_day) ON CONFLICT DO NOTHING;
 INSERT INTO public.pinterest_article_jobs(article_url,variant,due_day)
 SELECT article_url,i,publication_day+i FROM public.pinterest_article_campaigns CROSS JOIN generate_series(0,3) i WHERE article_url=p_url ON CONFLICT DO NOTHING;
END $$;
REVOKE ALL ON FUNCTION public.enqueue_pinterest_article(text,text,text,text,date) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_pinterest_article(text,text,text,text,date) TO service_role;
CREATE OR REPLACE FUNCTION public.queue_published_article_pins() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NEW.status='published' AND NEW.published_url IS NOT NULL AND (TG_OP='INSERT' OR OLD.status IS DISTINCT FROM 'published' OR OLD.published_url IS DISTINCT FROM NEW.published_url) THEN
  PERFORM public.enqueue_pinterest_article(NEW.published_url,NEW.topic,NEW.description,NEW.content_kind,(coalesce(NEW.generated_at,now()) AT TIME ZONE 'Europe/Moscow')::date);
 END IF;
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.queue_published_article_pins() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER queue_published_article_pins AFTER INSERT OR UPDATE OF status,published_url ON public.blog_topics FOR EACH ROW EXECUTE FUNCTION public.queue_published_article_pins();
CREATE OR REPLACE FUNCTION public.pinterest_daily_limit() RETURNS integer LANGUAGE sql IMMUTABLE SET search_path=public AS $$ SELECT 12 $$;
REVOKE ALL ON FUNCTION public.pinterest_daily_limit() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.pinterest_daily_limit() TO service_role;
CREATE OR REPLACE FUNCTION public.claim_pinterest_generation(p_slot integer) RETURNS jsonb LANGUAGE sql SECURITY DEFINER SET search_path=public AS $$ SELECT jsonb_build_object('skipped','replaced_by_article_campaigns') $$;
REVOKE ALL ON FUNCTION public.claim_pinterest_generation(integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_pinterest_generation(integer) TO service_role;
CREATE OR REPLACE FUNCTION public.claim_pinterest_article() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE s public.pinterest_generation_state; j public.pinterest_article_jobs; c public.pinterest_article_campaigns; today date := (now() AT TIME ZONE 'Europe/Moscow')::date; day_start timestamptz; n integer; t uuid;
BEGIN
 INSERT INTO public.pinterest_generation_state(id) VALUES('daily') ON CONFLICT DO NOTHING;
 SELECT * INTO s FROM public.pinterest_generation_state WHERE id='daily' FOR UPDATE;
 IF s.paused_reason IS NOT NULL AND (s.resume_after IS NULL OR s.resume_after>now()) THEN RETURN jsonb_build_object('skipped','paused','reason',s.paused_reason); END IF;
 IF s.lease_until>now() THEN RETURN jsonb_build_object('skipped','generation_in_progress'); END IF;
 day_start := today::timestamp AT TIME ZONE 'Europe/Moscow';
 SELECT count(*) INTO n FROM public.pinterest_pins WHERE status='published' AND created_at>=day_start AND created_at<day_start+interval '1 day';
 IF n>=public.pinterest_daily_limit() THEN RETURN jsonb_build_object('skipped','daily_limit'); END IF;
 SELECT q.* INTO j FROM public.pinterest_article_jobs q WHERE q.status='pending' AND q.due_day<=today
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs done WHERE done.article_url=q.article_url AND done.published_at>=day_start AND done.published_at<day_start+interval '1 day')
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs earlier WHERE earlier.article_url=q.article_url AND earlier.variant<q.variant AND earlier.status<>'published')
 ORDER BY q.due_day,q.article_url,q.variant LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('skipped','no_due_articles'); END IF;
 SELECT * INTO c FROM public.pinterest_article_campaigns WHERE article_url=j.article_url;
 t:=gen_random_uuid();
 UPDATE public.pinterest_generation_state SET lease_token=t,lease_until=now()+interval '10 minutes',paused_reason=NULL,resume_after=NULL WHERE id='daily';
 RETURN jsonb_build_object('token',t,'day',today,'job',to_jsonb(j),'article',to_jsonb(c));
END $$;
REVOKE ALL ON FUNCTION public.claim_pinterest_article() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_pinterest_article() TO service_role;
CREATE OR REPLACE FUNCTION public.finish_pinterest_article(p_token uuid,p_day date,p_url text,p_variant integer,p_content jsonb) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE s public.pinterest_generation_state; j public.pinterest_article_jobs; pin uuid; day_start timestamptz;
BEGIN
 SELECT * INTO s FROM public.pinterest_generation_state WHERE id='daily' FOR UPDATE;
 IF s.lease_token IS DISTINCT FROM p_token OR s.lease_until<=now() OR p_day<>(now() AT TIME ZONE 'Europe/Moscow')::date THEN RAISE EXCEPTION 'Generation lease expired'; END IF;
 SELECT * INTO j FROM public.pinterest_article_jobs WHERE article_url=p_url AND variant=p_variant FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unknown article job'; END IF;
 IF j.status='published' THEN RETURN j.pin_id; END IF;
 day_start:=p_day::timestamp AT TIME ZONE 'Europe/Moscow';
 IF (SELECT count(*) FROM public.pinterest_pins WHERE status='published' AND created_at>=day_start AND created_at<day_start+interval '1 day')>=public.pinterest_daily_limit() THEN RAISE EXCEPTION 'Daily limit'; END IF;
 IF j.due_day>p_day OR EXISTS(SELECT 1 FROM public.pinterest_article_jobs WHERE article_url=p_url AND (published_at>=day_start AND published_at<day_start+interval '1 day' OR variant<p_variant AND status<>'published')) THEN RAISE EXCEPTION 'Article schedule violation'; END IF;
 IF coalesce(p_content->>'pinterest_title','')='' OR coalesce(p_content->>'image_url','')='' THEN RAISE EXCEPTION 'Missing pin content'; END IF;
 INSERT INTO public.pinterest_pins(title,description,image_url,link_url,style,link_target,topic,astro_context,image_prompt,status,article_url,article_variant)
 VALUES(p_content->>'pinterest_title',p_content->>'pinterest_description',p_content->>'image_url',p_url,p_content->>'style','site',p_content->>'topic',p_content->>'astro_context',p_content->>'image_prompt','published',p_url,p_variant) RETURNING id INTO pin;
 UPDATE public.pinterest_article_jobs SET status='published',pin_id=pin,published_at=now(),last_error=NULL WHERE article_url=p_url AND variant=p_variant;
 RETURN pin;
END $$;
REVOKE ALL ON FUNCTION public.finish_pinterest_article(uuid,date,text,integer,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finish_pinterest_article(uuid,date,text,integer,jsonb) TO service_role;