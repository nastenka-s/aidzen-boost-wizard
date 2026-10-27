SELECT
 NOT has_table_privilege('anon', 'public.threads_competitor_posts', 'SELECT') AS anonymous_denied,
 NOT has_table_privilege('authenticated', 'public.threads_competitor_posts', 'SELECT') AS browser_denied,
 has_table_privilege('service_role', 'public.threads_competitor_posts', 'SELECT,INSERT,UPDATE,DELETE') AS automation_allowed,
 NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='threads_competitor_posts' AND roles <> ARRAY['service_role']::name[]) AS policies_service_only;