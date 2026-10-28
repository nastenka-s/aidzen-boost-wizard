BEGIN;
SET LOCAL ROLE service_role;
DO $$
BEGIN
 IF public.pinterest_article_eligible('tomorrow_horoscope','Гороскоп на завтра, 29 октября 2026') THEN RAISE EXCEPTION 'Daily forecast allowed'; END IF;
 IF public.pinterest_article_eligible('horoscope','Гороскоп на 2026-10-29') THEN RAISE EXCEPTION 'Dated daily forecast allowed'; END IF;
 IF NOT public.pinterest_article_eligible('horoscope','Гороскоп на ноябрь 2026') THEN RAISE EXCEPTION 'Monthly forecast excluded'; END IF;
 IF NOT public.pinterest_article_eligible('astrology_education','Дома натальной карты') THEN RAISE EXCEPTION 'Astrology education excluded'; END IF;
 IF NOT public.pinterest_article_eligible('numerology_education','Совместимость в Матрице судьбы') THEN RAISE EXCEPTION 'Numerology education excluded'; END IF;
 PERFORM public.enqueue_pinterest_article('https://aidzen.ru/pin-daily-exclusion-regression','Гороскоп на завтра, 29 октября 2026','','tomorrow_horoscope','2026-10-28');
 IF EXISTS (SELECT 1 FROM public.pinterest_article_campaigns WHERE article_url='https://aidzen.ru/pin-daily-exclusion-regression') THEN RAISE EXCEPTION 'Daily enqueue created a campaign'; END IF;
 IF EXISTS (SELECT 1 FROM public.pinterest_article_jobs j JOIN public.pinterest_article_campaigns c USING(article_url) WHERE j.status='pending' AND NOT public.pinterest_article_eligible(c.content_kind,c.title)) THEN RAISE EXCEPTION 'Excluded pending jobs remain'; END IF;
END $$;
ROLLBACK;