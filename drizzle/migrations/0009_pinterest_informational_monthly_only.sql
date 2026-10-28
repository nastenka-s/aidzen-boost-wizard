CREATE OR REPLACE FUNCTION public.pinterest_article_eligible(p_kind text,p_title text) RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path=public AS $$
 SELECT CASE
 WHEN lower(coalesce(p_kind,'')) ~ 'daily|tomorrow' OR lower(coalesce(p_title,'')) ~ 'на завтра|на сегодня|на день|[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN false
 WHEN lower(coalesce(p_kind,'')) ~ '^(astrology_education|numerology_education|astrology|numerology|informational)$' THEN true
 ELSE lower(coalesce(p_kind,'')) ~ '^(horoscope|monthly_horoscope)$' AND lower(coalesce(p_title,'')) ~ 'январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр|на месяц'
 END
$$;
REVOKE ALL ON FUNCTION public.pinterest_article_eligible(text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.pinterest_article_eligible(text,text) TO service_role;
CREATE OR REPLACE FUNCTION public.enqueue_pinterest_article(p_url text,p_title text,p_description text,p_kind text,p_day date) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NOT public.pinterest_article_eligible(p_kind,p_title) THEN RETURN; END IF;
 IF p_title IS NULL OR length(trim(p_title))=0 OR p_day IS NULL THEN RAISE EXCEPTION 'Invalid article'; END IF;
 INSERT INTO public.pinterest_article_campaigns(article_url,title,description,content_kind,publication_day)
 VALUES(p_url,p_title,coalesce(p_description,''),coalesce(p_kind,''),p_day) ON CONFLICT DO NOTHING;
 INSERT INTO public.pinterest_article_jobs(article_url,variant,due_day)
 SELECT article_url,i,publication_day+i FROM public.pinterest_article_campaigns CROSS JOIN generate_series(0,3) i WHERE article_url=p_url AND public.pinterest_article_eligible(content_kind,title) ON CONFLICT DO NOTHING;
END $$;
REVOKE ALL ON FUNCTION public.enqueue_pinterest_article(text,text,text,text,date) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_pinterest_article(text,text,text,text,date) TO service_role;
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
 AND EXISTS (SELECT 1 FROM public.pinterest_article_campaigns eligible WHERE eligible.article_url=q.article_url AND public.pinterest_article_eligible(eligible.content_kind,eligible.title))
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
CREATE OR REPLACE FUNCTION public.guard_pinterest_article_pin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NEW.article_url IS NOT NULL AND NEW.status='published' AND NOT EXISTS (
 SELECT 1 FROM public.pinterest_article_campaigns c WHERE c.article_url=NEW.article_url AND public.pinterest_article_eligible(c.content_kind,c.title)
 ) THEN RAISE EXCEPTION 'Article is not eligible for Pinterest pins'; END IF;
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.guard_pinterest_article_pin() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER guard_pinterest_article_pin BEFORE INSERT OR UPDATE OF article_url,status ON public.pinterest_pins FOR EACH ROW EXECUTE FUNCTION public.guard_pinterest_article_pin();