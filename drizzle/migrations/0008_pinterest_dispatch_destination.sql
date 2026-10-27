CREATE TABLE public.pinterest_dispatch_config(id text PRIMARY KEY DEFAULT 'daily', function_url text NOT NULL CHECK(function_url ~ '^https://'));
GRANT ALL ON public.pinterest_dispatch_config TO service_role;
REVOKE ALL ON public.pinterest_dispatch_config FROM anon,authenticated;
ALTER TABLE public.pinterest_dispatch_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_manage ON public.pinterest_dispatch_config FOR ALL TO service_role USING(true) WITH CHECK(true);
CREATE OR REPLACE FUNCTION public.dispatch_pinterest_articles() RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE today date:=(now() AT TIME ZONE 'Europe/Moscow')::date; start_day timestamptz:=date_trunc('day',now() AT TIME ZONE 'Europe/Moscow') AT TIME ZONE 'Europe/Moscow'; destination text;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs WHERE status='pending') THEN
  PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname='pinterest-article-retry'; RETURN;
 END IF;
 IF NOT EXISTS(SELECT 1 FROM cron.job WHERE jobname='pinterest-article-retry') THEN
  PERFORM cron.schedule('pinterest-article-retry','10 6-19 * * *','SELECT public.dispatch_pinterest_articles();');
 END IF;
 IF EXISTS(SELECT 1 FROM public.pinterest_generation_state WHERE id='daily' AND (lease_until>now() OR paused_reason IS NOT NULL AND (resume_after IS NULL OR resume_after>now()))) THEN RETURN; END IF;
 IF (SELECT count(*) FROM public.pinterest_pins WHERE status='published' AND created_at>=start_day AND created_at<start_day+interval '1 day')>=public.pinterest_daily_limit() THEN RETURN; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs q WHERE q.status='pending' AND q.due_day<=today
 AND NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs d WHERE d.article_url=q.article_url AND d.published_at>=start_day AND d.published_at<start_day+interval '1 day')
 AND NOT EXISTS(SELECT 1 FROM public.pinterest_article_jobs e WHERE e.article_url=q.article_url AND e.variant<q.variant AND e.status<>'published')) THEN RETURN; END IF;
 SELECT function_url INTO destination FROM public.pinterest_dispatch_config WHERE id='daily';
 IF destination IS NULL THEN RETURN; END IF;
 PERFORM net.http_post(url:=destination,headers:=jsonb_build_object('Content-Type','application/json','x-blog-scheduler-secret',(SELECT scheduler_secret::text FROM public.blog_job_state WHERE id='daily')),body:='{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.dispatch_pinterest_articles() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.dispatch_pinterest_articles() TO service_role;
DROP TRIGGER wake_pinterest_article_queue ON public.pinterest_article_jobs;
CREATE OR REPLACE FUNCTION public.wake_pinterest_article_queue() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF EXISTS(SELECT 1 FROM inserted_jobs) THEN PERFORM public.dispatch_pinterest_articles(); END IF;
 RETURN NULL;
END $$;
CREATE TRIGGER wake_pinterest_article_queue AFTER INSERT ON public.pinterest_article_jobs REFERENCING NEW TABLE AS inserted_jobs FOR EACH STATEMENT EXECUTE FUNCTION public.wake_pinterest_article_queue();