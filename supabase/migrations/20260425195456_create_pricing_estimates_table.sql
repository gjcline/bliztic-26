/*
  # Create pricing_estimates table

  ## Summary
  Stores pricing estimate submissions from the Pricing page estimator.
  Users fill out the estimator form, provide contact info, and submit to reveal their estimate.

  ## New Table: pricing_estimates
  - id: uuid primary key
  - name, company, email, role: contact info
  - biz_type: business type selected
  - staffing, rev_target, meetings, deal_size, markets, infra, urgency: estimator inputs (1-based string values)
  - estimate_lo, estimate_hi: computed monthly estimate range in dollars
  - tier: engagement tier label
  - created_at: submission timestamp

  ## Security
  - RLS enabled
  - Anon insert only (public form submission)
  - No select/update/delete for anon users (data only readable by service role)
*/

CREATE TABLE IF NOT EXISTS pricing_estimates (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  company     text NOT NULL DEFAULT '',
  email       text NOT NULL,
  role        text DEFAULT '',
  biz_type    text DEFAULT '',
  staffing    text DEFAULT '',
  rev_target  text DEFAULT '',
  meetings    text DEFAULT '',
  deal_size   text DEFAULT '',
  markets     text DEFAULT '',
  infra       text DEFAULT '',
  urgency     text DEFAULT '',
  estimate_lo integer,
  estimate_hi integer,
  tier        text DEFAULT '',
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE pricing_estimates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert for pricing estimates"
  ON pricing_estimates
  FOR INSERT
  TO anon
  WITH CHECK (true);
