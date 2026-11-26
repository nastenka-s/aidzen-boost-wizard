BEGIN;
DO $$
DECLARE days date[]; n integer;
BEGIN
 IF public.pinterest_daily_limit()<>4 THEN RAISE EXCEPTION 'Expected four daily pins'; END IF;
 IF has_table_privilege('anon','public.pinterest_article_jobs','SELECT') OR has_function_privilege('authenticated','public.claim_pinterest_article()','EXECUTE') OR has_function_privilege('anon','public.fail_pinterest_article(text,integer,text)','EXECUTE') THEN RAISE EXCEPTION 'Queue must be service-only'; END IF;
 PERFORM public.enqueue_pinterest_article('https://aidzen.ru/pin-schedule-regression','Regression','','astrology','2099-10-30');
 PERFORM public.enqueue_pinterest_article('https://aidzen.ru/pin-schedule-regression','Regression','','astrology','2099-10-30');
 SELECT count(*),array_agg(due_day ORDER BY variant) INTO n,days FROM public.pinterest_article_jobs WHERE article_url='https://aidzen.ru/pin-schedule-regression';
 IF n<>2 THEN RAISE EXCEPTION 'Expected exactly two idempotent jobs'; END IF;
 IF days<>ARRAY['2099-10-30'::date,'2099-10-31'::date] THEN RAISE EXCEPTION 'Wrong two-day schedule'; END IF;
 -- Three failed attempts retire one job without pausing the queue.
 PERFORM public.fail_pinterest_article('https://aidzen.ru/pin-schedule-regression',0,'x');
 PERFORM public.fail_pinterest_article('https://aidzen.ru/pin-schedule-regression',0,'x');
 IF (SELECT status FROM public.pinterest_article_jobs WHERE article_url='https://aidzen.ru/pin-schedule-regression' AND variant=0)<>'pending' THEN RAISE EXCEPTION 'Retired too early'; END IF;
 PERFORM public.fail_pinterest_article('https://aidzen.ru/pin-schedule-regression',0,'x');
 IF (SELECT status FROM public.pinterest_article_jobs WHERE article_url='https://aidzen.ru/pin-schedule-regression' AND variant=0)<>'failed' THEN RAISE EXCEPTION 'Not retired after three attempts'; END IF;
 IF (SELECT paused_reason FROM public.pinterest_generation_state WHERE id='daily') IS NOT NULL THEN RAISE EXCEPTION 'A failed pin paused the queue'; END IF;
 UPDATE public.pinterest_generation_state SET lease_token=NULL,lease_until=NULL,paused_reason=NULL,resume_after=NULL WHERE id='daily';
 INSERT INTO public.pinterest_pins(title,description,image_url,link_url,style,link_target,status)
 SELECT 'Regression','','https://aidzen.ru/test.png','https://aidzen.ru/test','dark','site','published' FROM generate_series(1,5);
 IF public.claim_pinterest_article()->>'skipped'<>'daily_limit' THEN RAISE EXCEPTION 'Daily cap bypassed'; END IF;
END $$;
ROLLBACK;
