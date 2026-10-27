# Architecture rules
- Keep Dzen publication categories in its tested publication policy; imported articles must not be forced into drafts.
- Keep Pinterest editorial catalogs, astronomical calculations and deterministic visual rotation in the generator's local editorial module so scheduled output is testable independently of paid services.
- Acquire the service-only database lease before Pinterest provider calls; enforce the Moscow-day publication limit atomically and never allow force requests to bypass it.
- Build all pin text from curated or calculated briefs and allow AI only to select approved copy variants so generated imagery cannot introduce invented dated events or predictive claims.