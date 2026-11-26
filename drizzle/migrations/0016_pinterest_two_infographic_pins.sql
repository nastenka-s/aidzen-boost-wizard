ALTER TABLE public.pinterest_article_jobs ADD COLUMN IF NOT EXISTS attempts integer NOT NULL DEFAULT 0;
ALTER TABLE public.pinterest_article_jobs DROP CONSTRAINT pinterest_article_jobs_status_check;
ALTER TABLE public.pinterest_article_jobs ADD CONSTRAINT pinterest_article_jobs_status_check CHECK (status = ANY (ARRAY['pending'::text,'published'::text,'failed'::text]));

DELETE FROM public.pinterest_article_jobs WHERE status='pending' AND variant>=2;
UPDATE public.pinterest_article_jobs SET image_payload=NULL,last_error=NULL,attempts=0 WHERE status='pending';

CREATE OR REPLACE FUNCTION public.enqueue_pinterest_article(p_url text, p_title text, p_description text, p_kind text, p_day date)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
 IF NOT public.pinterest_article_eligible(p_kind,p_title) THEN RETURN; END IF;
 IF p_title IS NULL OR length(trim(p_title))=0 OR p_day IS NULL THEN RAISE EXCEPTION 'Invalid article'; END IF;
 INSERT INTO public.pinterest_article_campaigns(article_url,title,description,content_kind,publication_day)
 VALUES(p_url,p_title,coalesce(p_description,''),coalesce(p_kind,''),p_day) ON CONFLICT DO NOTHING;
 -- Two pins per article: publication day and the next day. Existing campaigns are never re-queued.
 INSERT INTO public.pinterest_article_jobs(article_url,variant,due_day)
 SELECT c.article_url,i,c.publication_day+i FROM public.pinterest_article_campaigns c CROSS JOIN generate_series(0,1) i
 WHERE c.article_url=p_url AND public.pinterest_article_eligible(c.content_kind,c.title)
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs j WHERE j.article_url=c.article_url)
 ON CONFLICT DO NOTHING;
END $function$;

CREATE OR REPLACE FUNCTION public.claim_pinterest_article()
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
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
 AND EXISTS (SELECT 1 FROM public.pinterest_article_campaigns eligible WHERE eligible.article_url=q.article_url AND public.pinterest_article_eligible(eligible.content_kind,eligible.title))
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs done WHERE done.article_url=q.article_url AND done.published_at>=day_start AND done.published_at<day_start+interval '1 day')
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs earlier WHERE earlier.article_url=q.article_url AND earlier.variant<q.variant AND earlier.status='pending')
 ORDER BY q.due_day DESC,q.article_url,q.variant LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('skipped','no_due_articles'); END IF;
 SELECT * INTO c FROM public.pinterest_article_campaigns WHERE article_url=j.article_url;
 t:=gen_random_uuid();
 UPDATE public.pinterest_generation_state SET lease_token=t,lease_until=now()+interval '10 minutes',paused_reason=NULL,resume_after=NULL WHERE id='daily';
 RETURN jsonb_build_object('token',t,'day',today,'job',to_jsonb(j),'article',to_jsonb(c));
END $function$;

CREATE OR REPLACE FUNCTION public.dispatch_pinterest_articles()
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE today date:=(now() AT TIME ZONE 'Europe/Moscow')::date; start_day timestamptz:=date_trunc('day',now() AT TIME ZONE 'Europe/Moscow') AT TIME ZONE 'Europe/Moscow'; destination text;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs WHERE status='pending') THEN
  PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname='pinterest-article-retry'; RETURN;
 END IF;
 IF NOT EXISTS(SELECT 1 FROM cron.job WHERE jobname='pinterest-article-retry') THEN
  PERFORM cron.schedule('pinterest-article-retry','10 6-19 * * *','SELECT public.dispatch_pinterest_articles();');
 END IF;
 IF EXISTS(SELECT 1 FROM public.pinterest_generation_state WHERE id='daily' AND (lease_until>now() OR paused_reason IS NOT NULL AND (resume_after IS NULL OR resume_after>now()))) THEN RETURN; END IF;
 IF (SELECT count(*) FROM public.pinterest_pins WHERE status='published' AND created_at>=start_day AND created_at<start_day+interval '1 day')>=public.pinterest_daily_limit() THEN RETURN; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs q WHERE q.status='pending' AND q.due_day<=today
 AND NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs d WHERE d.article_url=q.article_url AND d.published_at>=start_day AND d.published_at<start_day+interval '1 day')
 AND NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs e WHERE e.article_url=q.article_url AND e.variant<q.variant AND e.status='pending')) THEN RETURN; END IF;
 SELECT function_url INTO destination FROM public.pinterest_dispatch_config WHERE id='daily';
 IF destination IS NULL THEN RETURN; END IF;
 PERFORM net.http_post(url:=destination,headers:=jsonb_build_object('Content-Type','application/json','x-blog-scheduler-secret',(SELECT scheduler_secret::text FROM public.blog_job_state WHERE id='daily')),body:='{}'::jsonb);
END $function$;

CREATE OR REPLACE FUNCTION public.finish_pinterest_article_identity(p_token uuid, p_day date, p_url text, p_variant integer, p_content jsonb)
 RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE s public.pinterest_generation_state; j public.pinterest_article_jobs; pin uuid; day_start timestamptz;
BEGIN
 SELECT * INTO s FROM public.pinterest_generation_state WHERE id='daily' FOR UPDATE;
 IF s.lease_token IS DISTINCT FROM p_token OR s.lease_until<=now() OR p_day<>(now() AT TIME ZONE 'Europe/Moscow')::date THEN RAISE EXCEPTION 'Generation lease expired'; END IF;
 SELECT * INTO j FROM public.pinterest_article_jobs WHERE article_url=p_url AND variant=p_variant FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unknown article job'; END IF;
 IF j.status='published' THEN RETURN j.pin_id; END IF;
 IF j.status<>'pending' THEN RAISE EXCEPTION 'Article job is not pending'; END IF;
 day_start:=p_day::timestamp AT TIME ZONE 'Europe/Moscow';
 IF (SELECT count(*) FROM public.pinterest_pins WHERE status='published' AND created_at>=day_start AND created_at<day_start+interval '1 day')>=public.pinterest_daily_limit() THEN RAISE EXCEPTION 'Daily limit'; END IF;
 IF j.due_day>p_day OR EXISTS(SELECT 1 FROM public.pinterest_article_jobs WHERE article_url=p_url AND (published_at>=day_start AND published_at<day_start+interval '1 day' OR variant<p_variant AND status='pending')) THEN RAISE EXCEPTION 'Article schedule violation'; END IF;
 IF coalesce(p_content->>'pinterest_title','')='' OR coalesce(p_content->>'image_url','')='' THEN RAISE EXCEPTION 'Missing pin content'; END IF;
 INSERT INTO public.pinterest_pins(title,description,image_url,link_url,style,link_target,topic,astro_context,image_prompt,status,article_url,article_variant)
 VALUES(p_content->>'pinterest_title',p_content->>'pinterest_description',p_content->>'image_url',p_url,p_content->>'style','site',p_content->>'topic',p_content->>'astro_context',p_content->>'image_prompt','published',p_url,p_variant) RETURNING id INTO pin;
 UPDATE public.pinterest_article_jobs SET status='published',pin_id=pin,published_at=now(),last_error=NULL WHERE article_url=p_url AND variant=p_variant;
 RETURN pin;
END $function$;

-- A pin that cannot be built is retried, then retired, without pausing the queue.
CREATE OR REPLACE FUNCTION public.fail_pinterest_article(p_url text, p_variant integer, p_error text)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
 UPDATE public.pinterest_article_jobs SET attempts=attempts+1,last_error=left(coalesce(p_error,''),1000),image_payload=NULL,
  status=CASE WHEN attempts+1>=3 THEN 'failed' ELSE 'pending' END
 WHERE article_url=p_url AND variant=p_variant AND status='pending';
END $function$;
REVOKE ALL ON FUNCTION public.fail_pinterest_article(text,integer,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fail_pinterest_article(text,integer,text) TO service_role;

UPDATE public.pinterest_generation_state SET paused_reason=NULL,resume_after=NULL,lease_token=NULL,lease_until=NULL WHERE id='daily';