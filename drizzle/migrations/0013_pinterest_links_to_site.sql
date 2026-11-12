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
 AND NOT EXISTS (SELECT 1 FROM public.pinterest_article_jobs earlier WHERE earlier.article_url=q.article_url AND earlier.variant<q.variant AND earlier.status<>'published')
 ORDER BY q.due_day,q.article_url,q.variant LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('skipped','no_due_articles'); END IF;
 SELECT * INTO c FROM public.pinterest_article_campaigns WHERE article_url=j.article_url;
 t:=gen_random_uuid();
 UPDATE public.pinterest_generation_state SET lease_token=t,lease_until=now()+interval '10 minutes',paused_reason=NULL,resume_after=NULL WHERE id='daily';
 RETURN jsonb_build_object('token',t,'day',today,'job',to_jsonb(j),'article',to_jsonb(c));
END $function$;

CREATE OR REPLACE FUNCTION public.finish_pinterest_article(p_token uuid, p_day date, p_url text, p_variant integer, p_content jsonb)
 RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE destination text; pin uuid;
BEGIN
 SELECT article_url INTO destination FROM public.pinterest_article_campaigns WHERE article_url=p_url AND public.pinterest_article_eligible(content_kind,title) FOR SHARE;
 IF destination IS NULL THEN RAISE EXCEPTION 'Eligible article required'; END IF;
 IF p_content->>'destination_url' IS DISTINCT FROM destination THEN RAISE EXCEPTION 'Article destination mismatch'; END IF;
 pin := public.finish_pinterest_article_identity(p_token,p_day,p_url,p_variant,p_content);
 UPDATE public.pinterest_pins SET link_url=destination WHERE id=pin AND article_url=p_url AND article_variant=p_variant;
 RETURN pin;
END $function$;

UPDATE public.pinterest_pins SET link_url=article_url WHERE link_url LIKE 'https://dzen.ru/%' AND article_url LIKE 'https://aidzen.ru/%';