CREATE TABLE IF NOT EXISTS public.blog_plan_items(
 id text PRIMARY KEY, publish_at timestamptz NOT NULL, status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','generating','needs_review','success')),
 attempts integer NOT NULL DEFAULT 0, topic_id uuid, payload jsonb, meta jsonb, error_message text, published_url text, published_at timestamptz, updated_at timestamptz NOT NULL DEFAULT now());
ALTER TABLE public.blog_plan_items ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.blog_plan_items FROM anon, authenticated;
GRANT ALL ON public.blog_plan_items TO service_role;

CREATE OR REPLACE FUNCTION public.claim_blog_plan(p_item text, p_publish_at timestamptz)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE s public.blog_job_state%ROWTYPE; tok uuid := gen_random_uuid(); r public.blog_plan_items%ROWTYPE;
BEGIN
 IF p_publish_at > now() THEN RETURN jsonb_build_object('skipped','not_due'); END IF;
 IF (p_publish_at AT TIME ZONE 'Europe/Moscow')::date <> (now() AT TIME ZONE 'Europe/Moscow')::date THEN RETURN jsonb_build_object('skipped','stale_slot'); END IF;
 INSERT INTO public.blog_job_state(id) VALUES ('daily') ON CONFLICT DO NOTHING;
 SELECT * INTO s FROM public.blog_job_state WHERE id='daily' FOR UPDATE;
 IF s.paused_reason IS NOT NULL AND (s.resume_after IS NULL OR s.resume_after > now()) THEN RETURN jsonb_build_object('skipped','paused','reason',s.paused_reason); END IF;
 IF s.lease_until > now() THEN RETURN jsonb_build_object('skipped','busy'); END IF;
 INSERT INTO public.blog_plan_items(id,publish_at) VALUES(p_item,p_publish_at) ON CONFLICT DO NOTHING;
 SELECT * INTO r FROM public.blog_plan_items WHERE id=p_item FOR UPDATE;
 IF r.status IN ('success','needs_review') THEN RETURN jsonb_build_object('skipped',r.status); END IF;
 UPDATE public.blog_plan_items SET status='generating',attempts=attempts+1,updated_at=now() WHERE id=p_item RETURNING * INTO r;
 UPDATE public.blog_job_state SET lease_token=tok,lease_until=now()+interval '20 minutes',paused_reason=NULL,resume_after=NULL,updated_at=now() WHERE id='daily';
 RETURN jsonb_build_object('token',tok,'item',to_jsonb(r));
END $$;

CREATE OR REPLACE FUNCTION public.finish_blog_plan(p_token uuid, p_item text, p_topic uuid, p_article jsonb, p_cover text, p_html text, p_commit jsonb, p_meta jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
 PERFORM 1 FROM public.blog_job_state WHERE id='daily' AND lease_token=p_token AND lease_until>now() FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Lost blog lease'; END IF;
 UPDATE public.blog_topics SET status='published',topic=p_article->>'title',published_url='https://aidzen.ru/'||(p_article->>'slug'),generated_at=now(),cover_url=p_cover,description=p_article->>'metaDescription',dzen_html=p_html WHERE id=p_topic;
 UPDATE public.blog_plan_items SET status='success',topic_id=p_topic,meta=p_meta,published_url='https://aidzen.ru/'||(p_article->>'slug'),published_at=now(),error_message=NULL,updated_at=now() WHERE id=p_item;
 INSERT INTO public.blog_generations(topic_id,status,slug,title,commit_sha,commit_url) VALUES(p_topic,'success',p_article->>'slug',p_article->>'title',p_commit->>'sha',p_commit->>'url');
 UPDATE public.blog_job_state SET lease_token=NULL,lease_until=NULL WHERE id='daily' AND lease_token=p_token;
END $$;
REVOKE ALL ON FUNCTION public.claim_blog_plan(text,timestamptz) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.finish_blog_plan(uuid,text,uuid,jsonb,text,text,jsonb,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_blog_plan(text,timestamptz) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_blog_plan(uuid,text,uuid,jsonb,text,text,jsonb,jsonb) TO service_role;