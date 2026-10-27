DROP POLICY IF EXISTS "Public read competitor posts" ON public.threads_competitor_posts;
REVOKE ALL ON public.threads_competitor_posts FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.threads_competitor_posts TO service_role;
ALTER TABLE public.threads_competitor_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service manages competitor research" ON public.threads_competitor_posts FOR ALL TO service_role USING (true) WITH CHECK (true);