/*
  # Create explore_submissions table

  ## Summary
  This migration creates a table to store submissions from the "Core Client Readiness"
  multi-step routing form (the /explore page), triggered when users click "Explore other
  solutions" on the Pricing page.

  ## New Tables

  ### explore_submissions
  Stores each completed submission from the 4-step routing form.

  Columns:
  - `id` — UUID primary key
  - `first_name` — submitter's first name
  - `last_name` — submitter's last name
  - `email` — work email address
  - `company` — company name
  - `outcome` — optional description of the outcome they are working toward
  - `primary_reason` — the letter code (A–E) selected in step 1
  - `primary_reason_label` — human-readable label for the primary reason
  - `followup_answer` — the value selected in the conditional step 2
  - `followup_answer_label` — human-readable label for the follow-up answer
  - `recommended_route` — either 'consulting' or 'terms'
  - `webhook_sent` — whether the Make.com webhook was successfully fired
  - `webhook_sent_at` — timestamp when webhook was sent
  - `created_at` — submission timestamp

  ## Security
  - RLS enabled
  - Anon users can INSERT (submit the form)
  - Authenticated users can SELECT all rows (for admin dashboard)
  - No UPDATE or DELETE for anon users
*/

CREATE TABLE IF NOT EXISTS explore_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  outcome text DEFAULT '',
  primary_reason text NOT NULL DEFAULT '',
  primary_reason_label text NOT NULL DEFAULT '',
  followup_answer text NOT NULL DEFAULT '',
  followup_answer_label text NOT NULL DEFAULT '',
  recommended_route text NOT NULL DEFAULT '',
  webhook_sent boolean NOT NULL DEFAULT false,
  webhook_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE explore_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon users can submit explore forms"
  ON explore_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read explore submissions"
  ON explore_submissions
  FOR SELECT
  TO authenticated
  USING (true);
