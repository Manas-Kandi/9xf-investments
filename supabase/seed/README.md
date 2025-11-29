# Supabase test data

Use `supabase/seed/test-data.sql` to load deterministic fixtures into a local or CI Supabase instance. The script is idempotent so it can safely run before automated suites.

```bash
supabase db reset --use-migra --seed supabase/seed/test-data.sql
```

Environment defaults for CI are provided in `supabase/test.env.example`.
