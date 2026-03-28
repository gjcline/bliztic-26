/*
  # Create AI Workforce Waitlist Table

  1. New Tables
    - `ai_workforce_waitlist`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `full_name` (text) - Full name of the applicant
      - `email` (text) - Email address
      - `company_name` (text) - Company name
      - `use_case` (text) - Description of what they'd use AI Workforce for
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `ai_workforce_waitlist` table
    - Add policy for authenticated users to read their own submissions
    - Add policy to allow anyone to insert (for public waitlist form)

  3. Important Notes
    - This is a public-facing waitlist form, so INSERT is allowed without authentication
    - Data is also sent to webhook for immediate processing
*/

CREATE TABLE IF NOT EXISTS ai_workforce_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company_name text NOT NULL,
  use_case text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_workforce_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit to waitlist"
  ON ai_workforce_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON ai_workforce_waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
