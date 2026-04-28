/*
  # Add authenticated SELECT policies to all lead tables

  ## Summary
  Adds read-access policies for authenticated users (admin dashboard) on tables that
  were previously missing them. This allows the admin dashboard to query all lead
  sources securely.

  ## Tables Modified
  - `pricing_estimates` — add SELECT for authenticated users
  - `fund_applications` — add SELECT for authenticated users
  - `gtm_fund_applications` — add SELECT for authenticated users
  - `ai_workforce_waitlist` — add SELECT for authenticated users

  Note: `qualification_submissions` already has this policy from a prior migration.
  Note: `explore_submissions` already has this policy from its creation migration.

  ## Security
  Only authenticated Supabase sessions can read these rows. Anon users retain
  insert-only access as originally configured.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'pricing_estimates'
      AND policyname = 'Authenticated users can read pricing estimates'
  ) THEN
    CREATE POLICY "Authenticated users can read pricing estimates"
      ON pricing_estimates
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'fund_applications'
      AND policyname = 'Authenticated users can read fund applications'
  ) THEN
    CREATE POLICY "Authenticated users can read fund applications"
      ON fund_applications
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gtm_fund_applications'
      AND policyname = 'Authenticated users can read gtm fund applications'
  ) THEN
    CREATE POLICY "Authenticated users can read gtm fund applications"
      ON gtm_fund_applications
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ai_workforce_waitlist'
      AND policyname = 'Authenticated users can read ai workforce waitlist'
  ) THEN
    CREATE POLICY "Authenticated users can read ai workforce waitlist"
      ON ai_workforce_waitlist
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;
