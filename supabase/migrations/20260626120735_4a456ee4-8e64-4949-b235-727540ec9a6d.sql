
CREATE TABLE public.threads_formats (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  template text,
  is_thread boolean NOT NULL DEFAULT false,
  weight integer NOT NULL DEFAULT 10,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.threads_formats TO authenticated;
GRANT ALL ON public.threads_formats TO service_role;
ALTER TABLE public.threads_formats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role manages formats" ON public.threads_formats FOR ALL TO service_role USING (true) WITH CHECK (true);

ALTER TABLE public.threads_posts
  ADD COLUMN IF NOT EXISTS format_id text REFERENCES public.threads_formats(id),
  ADD COLUMN IF NOT EXISTS length_bucket text,
  ADD COLUMN IF NOT EXISTS parent_post_id uuid REFERENCES public.threads_posts(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS reply_index integer;
