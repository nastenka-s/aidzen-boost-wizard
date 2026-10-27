ALTER TABLE public.blog_topics ADD COLUMN IF NOT EXISTS content_kind text;
ALTER TABLE public.blog_topics ADD COLUMN IF NOT EXISTS editorial_brief jsonb;
ALTER TABLE public.blog_topics ADD COLUMN IF NOT EXISTS target_date date;
CREATE TABLE public.blog_job_state (
 id text PRIMARY KEY DEFAULT 'daily', lease_token uuid, lease_until timestamptz,
 paused_reason text, resume_after timestamptz, updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.blog_job_state TO service_role;
ALTER TABLE public.blog_job_state ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.blog_daily_slots (
 publication_day date NOT NULL, content_kind text NOT NULL,
 topic_id uuid REFERENCES public.blog_topics(id), status text NOT NULL DEFAULT 'pending',
 payload jsonb, commit_sha text, error_message text, published_at timestamptz,
 PRIMARY KEY (publication_day,content_kind)
);
GRANT ALL ON public.blog_daily_slots TO service_role;
ALTER TABLE public.blog_daily_slots ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.claim_blog_daily(p_kind text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE s public.blog_job_state%ROWTYPE; d date := (now() AT TIME ZONE 'Europe/Moscow')::date;
 k text; tok uuid := gen_random_uuid(); hour integer := extract(hour FROM now() AT TIME ZONE 'Europe/Moscow');
BEGIN
 IF p_kind IS NOT NULL AND p_kind NOT IN ('astrology_education','numerology_education','tomorrow_horoscope') THEN RAISE EXCEPTION 'Invalid content kind'; END IF;
 INSERT INTO public.blog_job_state(id) VALUES ('daily') ON CONFLICT DO NOTHING;
 SELECT * INTO s FROM public.blog_job_state WHERE id='daily' FOR UPDATE;
 IF s.paused_reason IS NOT NULL AND (s.resume_after IS NULL OR s.resume_after > now()) THEN RETURN jsonb_build_object('skipped','paused','reason',s.paused_reason); END IF;
 IF s.lease_until > now() THEN RETURN jsonb_build_object('skipped','busy'); END IF;
 SELECT candidate INTO k FROM unnest(ARRAY['astrology_education','numerology_education','tomorrow_horoscope']) WITH ORDINALITY AS c(candidate,n)
 WHERE (p_kind IS NULL OR candidate=p_kind)
 AND (p_kind IS NOT NULL OR hour >= CASE n WHEN 1 THEN 9 WHEN 2 THEN 13 ELSE 18 END)
 AND NOT EXISTS (SELECT 1 FROM public.blog_daily_slots b WHERE b.publication_day=d AND b.content_kind=candidate AND b.status='success')
 ORDER BY n LIMIT 1;
 IF k IS NULL THEN RETURN jsonb_build_object('skipped','daily_slots_complete'); END IF;
 INSERT INTO public.blog_daily_slots(publication_day,content_kind) VALUES(d,k) ON CONFLICT DO NOTHING;
 UPDATE public.blog_job_state SET lease_token=tok,lease_until=now()+interval '20 minutes',paused_reason=NULL,resume_after=NULL,updated_at=now() WHERE id='daily';
 RETURN jsonb_build_object('token',tok,'day',d,'kind',k,'slot',(SELECT to_jsonb(b) FROM public.blog_daily_slots b WHERE b.publication_day=d AND b.content_kind=k));
END $$;
REVOKE ALL ON FUNCTION public.claim_blog_daily(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_blog_daily(text) TO service_role;
CREATE OR REPLACE FUNCTION public.finish_blog_daily(p_token uuid,p_day date,p_kind text,p_topic uuid,p_article jsonb,p_cover text,p_html text,p_commit jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 PERFORM 1 FROM public.blog_job_state WHERE id='daily' AND lease_token=p_token AND lease_until>now() FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Lost blog lease'; END IF;
 UPDATE public.blog_topics SET status='published',topic=p_article->>'title',published_url='https://aidzen.ru/'||(p_article->>'slug'),generated_at=now(),cover_url=p_cover,description=p_article->>'metaDescription',dzen_html=p_html WHERE id=p_topic;
 UPDATE public.blog_daily_slots SET status='success',topic_id=p_topic,published_at=now(),commit_sha=p_commit->>'sha',error_message=NULL WHERE publication_day=p_day AND content_kind=p_kind;
 INSERT INTO public.blog_generations(topic_id,status,slug,title,commit_sha,commit_url) VALUES(p_topic,'success',p_article->>'slug',p_article->>'title',p_commit->>'sha',p_commit->>'url');
 UPDATE public.blog_job_state SET lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id='daily' AND lease_token=p_token;
END $$;
REVOKE ALL ON FUNCTION public.finish_blog_daily(uuid,date,text,uuid,jsonb,text,text,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finish_blog_daily(uuid,date,text,uuid,jsonb,text,text,jsonb) TO service_role;