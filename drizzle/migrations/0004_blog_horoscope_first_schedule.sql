CREATE OR REPLACE FUNCTION public.blog_schedule_hour(p_kind text)
RETURNS integer LANGUAGE sql IMMUTABLE SET search_path TO public
AS $$ SELECT CASE p_kind WHEN 'tomorrow_horoscope' THEN 9 WHEN 'astrology_education' THEN 13 WHEN 'numerology_education' THEN 18 ELSE NULL END $$;
REVOKE ALL ON FUNCTION public.blog_schedule_hour(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.blog_schedule_hour(text) TO service_role;

CREATE OR REPLACE FUNCTION public.claim_blog_daily(p_kind text DEFAULT NULL::text)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO public
AS $function$
DECLARE s public.blog_job_state%ROWTYPE; d date := (now() AT TIME ZONE 'Europe/Moscow')::date;
 k text; tok uuid := gen_random_uuid(); hour integer := extract(hour FROM now() AT TIME ZONE 'Europe/Moscow');
BEGIN
 IF p_kind IS NOT NULL AND p_kind NOT IN ('astrology_education','numerology_education','tomorrow_horoscope') THEN RAISE EXCEPTION 'Invalid content kind'; END IF;
 INSERT INTO public.blog_job_state(id) VALUES ('daily') ON CONFLICT DO NOTHING;
 SELECT * INTO s FROM public.blog_job_state WHERE id='daily' FOR UPDATE;
 IF s.paused_reason IS NOT NULL AND (s.resume_after IS NULL OR s.resume_after > now()) THEN RETURN jsonb_build_object('skipped','paused','reason',s.paused_reason); END IF;
 IF s.lease_until > now() THEN RETURN jsonb_build_object('skipped','busy'); END IF;
 SELECT candidate INTO k FROM unnest(ARRAY['tomorrow_horoscope','astrology_education','numerology_education']) WITH ORDINALITY AS c(candidate,n)
 WHERE (p_kind IS NULL OR candidate=p_kind)
 AND (p_kind IS NOT NULL OR hour >= public.blog_schedule_hour(candidate))
 AND NOT EXISTS (SELECT 1 FROM public.blog_daily_slots b WHERE b.publication_day=d AND b.content_kind=candidate AND b.status='success')
 ORDER BY n LIMIT 1;
 IF k IS NULL THEN RETURN jsonb_build_object('skipped','daily_slots_complete'); END IF;
 INSERT INTO public.blog_daily_slots(publication_day,content_kind) VALUES(d,k) ON CONFLICT DO NOTHING;
 UPDATE public.blog_job_state SET lease_token=tok,lease_until=now()+interval '20 minutes',paused_reason=NULL,resume_after=NULL,updated_at=now() WHERE id='daily';
 RETURN jsonb_build_object('token',tok,'day',d,'kind',k,'slot',(SELECT to_jsonb(b) FROM public.blog_daily_slots b WHERE b.publication_day=d AND b.content_kind=k));
END $function$;
REVOKE ALL ON FUNCTION public.claim_blog_daily(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_blog_daily(text) TO service_role;