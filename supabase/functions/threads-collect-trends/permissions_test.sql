-- Run against the deployed database; no data is changed.
DO $$
BEGIN
  IF has_table_privilege('anon', 'public.threads_competitor_posts', 'SELECT') THEN
    RAISE EXCEPTION 'Anonymous readers must not access competitor research';
  END IF;
  IF has_table_privilege('authenticated', 'public.threads_competitor_posts', 'SELECT') THEN
    RAISE EXCEPTION 'Browser sessions must not access competitor research';
  END IF;
  IF NOT has_table_privilege('service_role', 'public.threads_competitor_posts', 'SELECT,INSERT,UPDATE,DELETE') THEN
    RAISE EXCEPTION 'Automated jobs require service access';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='threads_competitor_posts' AND roles <> ARRAY['service_role']::name[]) THEN
    RAISE EXCEPTION 'Competitor research policies must be service-only';
  END IF;
END $$;