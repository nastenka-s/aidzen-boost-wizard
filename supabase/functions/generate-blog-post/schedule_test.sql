-- Run against the database after applying the scheduling migration.
DO $$
BEGIN
 IF public.blog_schedule_hour('tomorrow_horoscope') IS DISTINCT FROM 9 THEN
  RAISE EXCEPTION 'Tomorrow horoscope must start at 09:00 Moscow';
 END IF;
END $$;
DO $$
BEGIN
 IF public.blog_schedule_hour('astrology_education') IS DISTINCT FROM 13 THEN
  RAISE EXCEPTION 'Astrology education must start at 13:00 Moscow';
 END IF;
END $$;
DO $$
BEGIN
 IF public.blog_schedule_hour('numerology_education') IS DISTINCT FROM 18 THEN
  RAISE EXCEPTION 'Numerology education must start at 18:00 Moscow';
 END IF;
END $$;