
-- 1) Keywords/hashtags to monitor
CREATE TABLE public.threads_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL UNIQUE,
  language text NOT NULL DEFAULT 'ru',
  segment text NOT NULL DEFAULT 'astrology',
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.threads_keywords TO authenticated;
GRANT ALL ON public.threads_keywords TO service_role;
ALTER TABLE public.threads_keywords ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read keywords" ON public.threads_keywords FOR SELECT USING (true);

-- 2) Collected competitor posts (raw viral data)
CREATE TABLE public.threads_competitor_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id text UNIQUE,
  permalink text,
  username text,
  text text NOT NULL,
  media_type text,
  likes int NOT NULL DEFAULT 0,
  replies int NOT NULL DEFAULT 0,
  reposts int NOT NULL DEFAULT 0,
  quotes int NOT NULL DEFAULT 0,
  views int NOT NULL DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  source_keyword text,
  language text DEFAULT 'ru',
  segment text DEFAULT 'astrology',
  posted_at timestamptz,
  collected_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_competitor_posts_engagement ON public.threads_competitor_posts (engagement_rate DESC, collected_at DESC);
CREATE INDEX idx_competitor_posts_segment ON public.threads_competitor_posts (segment, language);
GRANT SELECT ON public.threads_competitor_posts TO authenticated;
GRANT ALL ON public.threads_competitor_posts TO service_role;
ALTER TABLE public.threads_competitor_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read competitor posts" ON public.threads_competitor_posts FOR SELECT USING (true);

-- 3) Extracted virality patterns (the AI's "lessons")
CREATE TABLE public.threads_virality_patterns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_type text NOT NULL, -- hook | structure | tone | topic | cta
  name text NOT NULL,
  description text NOT NULL,
  example text,
  avg_engagement numeric DEFAULT 0,
  sample_size int DEFAULT 0,
  weight numeric NOT NULL DEFAULT 1.0,
  segment text DEFAULT 'astrology',
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_patterns_type ON public.threads_virality_patterns (pattern_type, active);
GRANT SELECT ON public.threads_virality_patterns TO authenticated;
GRANT ALL ON public.threads_virality_patterns TO service_role;
ALTER TABLE public.threads_virality_patterns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read patterns" ON public.threads_virality_patterns FOR SELECT USING (true);

-- 4) Our published posts + metrics feedback loop
CREATE TABLE public.threads_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id text UNIQUE,
  permalink text,
  text text NOT NULL,
  hook text,
  topic text,
  link_target text NOT NULL DEFAULT 'site', -- site | bot
  link_url text NOT NULL,
  pattern_ids uuid[] DEFAULT '{}',
  predicted_score numeric,
  status text NOT NULL DEFAULT 'draft', -- draft | scheduled | published | failed
  error_message text,
  likes int NOT NULL DEFAULT 0,
  replies int NOT NULL DEFAULT 0,
  reposts int NOT NULL DEFAULT 0,
  quotes int NOT NULL DEFAULT 0,
  views int NOT NULL DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  metrics_updated_at timestamptz,
  posted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_threads_posts_status ON public.threads_posts (status, posted_at DESC);
GRANT SELECT ON public.threads_posts TO authenticated;
GRANT ALL ON public.threads_posts TO service_role;
ALTER TABLE public.threads_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read our threads posts" ON public.threads_posts FOR SELECT USING (true);

-- Seed keywords (RU astrology + esoteric + EN viral accounts segment)
INSERT INTO public.threads_keywords (keyword, language, segment) VALUES
  ('астрология', 'ru', 'astrology'),
  ('нумерология', 'ru', 'numerology'),
  ('матрица судьбы', 'ru', 'matrix'),
  ('натальная карта', 'ru', 'astrology'),
  ('таро', 'ru', 'esoteric'),
  ('ретроградный меркурий', 'ru', 'astrology'),
  ('новолуние', 'ru', 'astrology'),
  ('полнолуние', 'ru', 'astrology'),
  ('лунный календарь', 'ru', 'astrology'),
  ('совместимость знаков', 'ru', 'astrology'),
  ('число судьбы', 'ru', 'numerology'),
  ('лилит', 'ru', 'astrology'),
  ('руны', 'ru', 'esoteric'),
  ('ведическая астрология', 'ru', 'astrology'),
  ('arcana', 'ru', 'matrix'),
  ('astrology', 'en', 'astrology'),
  ('numerology', 'en', 'numerology'),
  ('mercury retrograde', 'en', 'astrology'),
  ('full moon', 'en', 'astrology'),
  ('tarot reading', 'en', 'esoteric')
ON CONFLICT (keyword) DO NOTHING;
