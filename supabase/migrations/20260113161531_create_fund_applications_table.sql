/*
  # Create Fund Applications Table

  1. New Tables
    - `fund_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `created_at` (timestamptz) - Timestamp when application was submitted
      - `full_name` (text) - Applicant's full name
      - `email` (text) - Applicant's email address
      - `phone_number` (text) - Applicant's phone number
      - `idea_name` (text) - Name of the business idea
      - `idea_summary` (text) - Summary description of the idea (minimum 10 words)
  
  2. Security
    - Enable RLS on `fund_applications` table
    - Add policy for public insert access (anyone can submit an application)
    - Add policy for authenticated admin users to read all applications
*/

-- Create fund_applications table
CREATE TABLE IF NOT EXISTS fund_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  idea_name text NOT NULL,
  idea_summary text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE fund_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application (public insert)
CREATE POLICY "Anyone can submit fund applications"
  ON fund_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can read all applications (for admin dashboard)
CREATE POLICY "Authenticated users can read all applications"
  ON fund_applications
  FOR SELECT
  TO authenticated
  USING (true);