ALTER TABLE public.blog_job_state ADD COLUMN IF NOT EXISTS scheduler_secret uuid NOT NULL DEFAULT gen_random_uuid();
CREATE OR REPLACE FUNCTION public.authorize_blog_scheduler(p_secret text) RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path=public AS $$ SELECT EXISTS(SELECT 1 FROM public.blog_job_state WHERE id='daily' AND scheduler_secret::text=p_secret) $$;
REVOKE ALL ON FUNCTION public.authorize_blog_scheduler(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.authorize_blog_scheduler(text) TO service_role;