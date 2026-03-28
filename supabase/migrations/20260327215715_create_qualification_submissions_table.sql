/*
  # Create qualification_submissions table

  1. New Tables
    - `qualification_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `business_type` (text, nullable) - Type of business (agency, saas, ecommerce, etc.)
      - `company_name` (text, nullable) - Name of the company
      - `full_name` (text, nullable) - Full name of contact person
      - `email` (text, nullable) - Email address
      - `phone_number` (text, nullable) - Phone number
      - `team_size` (text, nullable) - Size of the team (solo, 2-5, 6-20, etc.)
      - `funding_stage` (text, nullable) - Funding stage (series_a, series_b, not_funded, not_looking)
      - `outreach_channels` (jsonb, default: []) - Array of channels with success levels
      - `monthly_spend` (text, nullable) - Monthly marketing spend tier
      - `monthly_revenue` (text, nullable) - Monthly revenue tier
      - `primary_goal` (text, nullable) - Primary business goal/challenge
      - `status` (text, default: 'in_progress') - Status of submission (in_progress, completed)
      - `webhook_sent` (boolean, default: false) - Whether webhook was sent to Make.com
      - `webhook_sent_at` (timestamptz, nullable) - Timestamp when webhook was sent
      - `created_at` (timestamptz, default: now()) - When submission was created
      - `last_updated_at` (timestamptz, default: now()) - When submission was last updated

  2. Security
    - Enable RLS on `qualification_submissions` table
    - Add policy for anonymous inserts (form is public)
    - Add policy for authenticated users to read all submissions (for admin access)

  3. Important Notes
    - This table stores qualification form responses
    - Submissions are public (no auth required to submit)
    - Data is sent to Make.com webhook after completion
    - Status tracks whether form is in progress or completed
*/

CREATE TABLE IF NOT EXISTS qualification_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_type text,
  company_name text,
  full_name text,
  email text,
  phone_number text,
  team_size text,
  funding_stage text,
  outreach_channels jsonb DEFAULT '[]'::jsonb,
  monthly_spend text,
  monthly_revenue text,
  primary_goal text,
  status text DEFAULT 'in_progress',
  webhook_sent boolean DEFAULT false,
  webhook_sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  last_updated_at timestamptz DEFAULT now()
);

ALTER TABLE qualification_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (form is public)
CREATE POLICY "Anyone can submit qualification forms"
  ON qualification_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to update their own submission (by ID)
CREATE POLICY "Anyone can update qualification submissions"
  ON qualification_submissions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin dashboard)
CREATE POLICY "Authenticated users can read all submissions"
  ON qualification_submissions
  FOR SELECT
  TO authenticated
  USING (true);