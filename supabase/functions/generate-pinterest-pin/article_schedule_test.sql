BEGIN;
DO $$
DECLARE days date[]; n integer;
BEGIN
 IF public.pinterest_daily_limit()<>12 THEN RAISE EXCEPTION 'Expected twelve daily pins'; END IF;
 IF has_table_privilege('anon','public.pinterest_article_jobs','SELECT') OR has_function_privilege('authenticated','public.claim_pinterest_article()','EXECUTE') THEN RAISE EXCEPTION 'Queue must be service-only'; END IF;
 PERFORM public.enqueue_pinterest_article('https://aidzen.ru/pin-schedule-regression','Regression','','astrology','2099-10-30');
 PERFORM public.enqueue_pinterest_article('https://aidzen.ru/pin-schedule-regression','Regression','','astrology','2099-10-30');
 SELECT count(*),array_agg(due_day ORDER BY variant) INTO n,days FROM public.pinterest_article_jobs WHERE article_url='https://aidzen.ru/pin-schedule-regression';
 IF n<>4 THEN RAISE EXCEPTION 'Expected exactly four idempotent jobs'; END IF;
 IF days<>ARRAY['2099-10-30'::date,'2099-10-31'::date,'2099-11-01'::date,'2099-11-02'::date] THEN RAISE EXCEPTION 'Wrong four-day schedule'; END IF;
 UPDATE public.pinterest_generation_state SET lease_token=NULL,lease_until=NULL,paused_reason=NULL,resume_after=NULL WHERE id='daily';
 INSERT INTO public.pinterest_pins(title,description,image_url,link_url,style,link_target,status)
 SELECT 'Regression','','https://aidzen.ru/test.png','https://aidzen.ru/test','test','site','published' FROM generate_series(1,12);
 IF public.claim_pinterest_article()->>'skipped'<>'daily_limit' THEN RAISE EXCEPTION 'Daily cap bypassed'; END IF;
END $$;
ROLLBACK;