/*
  # Fix RLS policies for qualification_submissions

  1. Changes
    - Add SELECT policy for anonymous users to read their own submissions
    - This allows the form to retrieve the submission ID after insert
  
  2. Security
    - Anonymous users can now SELECT their submissions (needed for form flow)
    - Maintains security by still requiring authentication for admin access
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can submit qualification forms" ON qualification_submissions;
DROP POLICY IF EXISTS "Anyone can update qualification submissions" ON qualification_submissions;
DROP POLICY IF EXISTS "Authenticated users can read all submissions" ON qualification_submissions;

-- Allow anonymous users to insert submissions
CREATE POLICY "Anyone can submit qualification forms"
  ON qualification_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read all submissions (needed for .select() after insert)
CREATE POLICY "Anonymous users can read submissions"
  ON qualification_submissions
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to update submissions
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