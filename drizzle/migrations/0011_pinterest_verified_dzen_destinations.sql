ALTER TABLE public.pinterest_article_campaigns ADD COLUMN dzen_url text CHECK (dzen_url ~ '^https://dzen\.ru/a/[A-Za-z0-9_-]+$');
ALTER TABLE public.pinterest_article_campaigns ADD COLUMN dzen_verified_at timestamptz;
COMMENT ON COLUMN public.pinterest_article_campaigns.dzen_url IS 'Verified published article destination; article_url remains the website campaign identity. Missing destination blocks generation.';
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
 AND EXISTS (SELECT 1 FROM public.pinterest_article_campaigns eligible WHERE eligible.article_url=q.article_url AND public.pinterest_article_eligible(eligible.content_kind,eligible.title) AND eligible.dzen_url IS NOT NULL AND eligible.dzen_verified_at IS NOT NULL)
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs done WHERE done.article_url=q.article_url AND done.published_at>=day_start AND done.published_at<day_start+interval '1 day')
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs earlier WHERE earlier.article_url=q.article_url AND earlier.variant<q.variant AND earlier.status<>'published')
 ORDER BY q.due_day,q.article_url,q.variant LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('skipped','no_due_verified_dzen_articles'); END IF;
 SELECT * INTO c FROM public.pinterest_article_campaigns WHERE article_url=j.article_url;
 t:=gen_random_uuid();
 UPDATE public.pinterest_generation_state SET lease_token=t,lease_until=now()+interval '10 minutes',paused_reason=NULL,resume_after=NULL WHERE id='daily';
 RETURN jsonb_build_object('token',t,'day',today,'job',to_jsonb(j),'article',to_jsonb(c));
END $$;
REVOKE ALL ON FUNCTION public.claim_pinterest_article() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_pinterest_article() TO service_role;
ALTER FUNCTION public.finish_pinterest_article(uuid,date,text,integer,jsonb) RENAME TO finish_pinterest_article_identity;
REVOKE ALL ON FUNCTION public.finish_pinterest_article_identity(uuid,date,text,integer,jsonb) FROM PUBLIC,anon,authenticated,service_role;
CREATE FUNCTION public.finish_pinterest_article(p_token uuid,p_day date,p_url text,p_variant integer,p_content jsonb) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE destination text; pin uuid;
BEGIN
 SELECT dzen_url INTO destination FROM public.pinterest_article_campaigns WHERE article_url=p_url AND dzen_verified_at IS NOT NULL AND public.pinterest_article_eligible(content_kind,title) FOR SHARE;
 IF destination IS NULL THEN RAISE EXCEPTION 'Verified Dzen article URL required'; END IF;
 IF p_content->>'destination_url' IS DISTINCT FROM destination THEN RAISE EXCEPTION 'Dzen destination mismatch'; END IF;
 pin := public.finish_pinterest_article_identity(p_token,p_day,p_url,p_variant,p_content);
 UPDATE public.pinterest_pins SET link_url=destination WHERE id=pin AND article_url=p_url AND article_variant=p_variant;
 RETURN pin;
END $$;
REVOKE ALL ON FUNCTION public.finish_pinterest_article(uuid,date,text,integer,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finish_pinterest_article(uuid,date,text,integer,jsonb) TO service_role;