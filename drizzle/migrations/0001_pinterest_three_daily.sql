CREATE OR REPLACE FUNCTION public.claim_pinterest_generation(p_slot integer) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE s public.pinterest_generation_state; day_start timestamptz := date_trunc('day', now() AT TIME ZONE 'Europe/Moscow') AT TIME ZONE 'Europe/Moscow'; n integer; token uuid;
BEGIN
 IF p_slot IS NULL OR p_slot NOT IN (0,1,2) THEN RETURN jsonb_build_object('skipped','invalid_slot'); END IF;
 INSERT INTO public.pinterest_generation_state(id) VALUES ('daily') ON CONFLICT DO NOTHING;
 SELECT * INTO s FROM public.pinterest_generation_state WHERE id='daily' FOR UPDATE;
 IF s.paused_reason IS NOT NULL AND (s.resume_after IS NULL OR s.resume_after > now()) THEN RETURN jsonb_build_object('skipped','paused','reason',s.paused_reason); END IF;
 IF s.lease_until > now() THEN RETURN jsonb_build_object('skipped','generation_in_progress'); END IF;
 SELECT count(*) INTO n FROM public.pinterest_pins WHERE status='published' AND created_at >= day_start AND created_at < day_start + interval '1 day';
 IF n >= 3 THEN RETURN jsonb_build_object('skipped','daily_limit'); END IF;
 IF EXISTS (SELECT 1 FROM public.pinterest_pins WHERE status='published' AND created_at >= day_start AND created_at < day_start + interval '1 day' AND style=CASE WHEN p_slot=1 THEN 'light' ELSE 'dark' END AND link_target=CASE WHEN p_slot=0 THEN 'site' ELSE 'bot' END) THEN RETURN jsonb_build_object('skipped','slot_already_done'); END IF;
 token := gen_random_uuid();
 UPDATE public.pinterest_generation_state SET lease_token=token, lease_until=now()+interval '10 minutes', paused_reason=NULL, resume_after=NULL WHERE id='daily';
 RETURN jsonb_build_object('token',token);
END $$;
REVOKE ALL ON FUNCTION public.claim_pinterest_generation(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_pinterest_generation(integer) TO service_role;