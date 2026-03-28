/*
  # Create GTM Fund Applications Table

  1. New Tables
    - `gtm_fund_applications`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone_number` (text, required)
      - `company_name` (text, required)
      - `funding_purpose` (text, required)
      - `other_details` (text, optional)
  
  2. Security
    - Enable RLS on `gtm_fund_applications` table
    - Add policy for service role to insert applications
*/

CREATE TABLE IF NOT EXISTS gtm_fund_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  company_name text NOT NULL,
  funding_purpose text NOT NULL,
  other_details text
);

ALTER TABLE gtm_fund_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON gtm_fund_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role full access"
  ON gtm_fund_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);