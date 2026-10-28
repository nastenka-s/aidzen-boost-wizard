SELECT NOT public.pinterest_article_eligible('tomorrow_horoscope','Гороскоп на завтра, 29 октября 2026') AS daily_excluded;
SELECT NOT public.pinterest_article_eligible('horoscope','Гороскоп на 2026-10-29') AS dated_daily_excluded;
SELECT public.pinterest_article_eligible('horoscope','Гороскоп на ноябрь 2026') AS monthly_allowed;
SELECT public.pinterest_article_eligible('astrology_education','Дома натальной карты') AS astrology_allowed;
SELECT public.pinterest_article_eligible('numerology_education','Совместимость в Матрице судьбы') AS numerology_allowed;
SELECT NOT EXISTS (
  SELECT 1 FROM public.pinterest_article_jobs j JOIN public.pinterest_article_campaigns c USING(article_url)
  WHERE j.status='pending' AND NOT public.pinterest_article_eligible(c.content_kind,c.title)
) AS no_excluded_pending_jobs;