/*
  # Add custom_business_type column

  1. Changes
    - Add `custom_business_type` column to `qualification_submissions` table
      - Stores custom business type when user selects "Other"
      - Optional field (nullable)

  2. Important Notes
    - This column stores the user's custom business type input
    - Only populated when business_type = 'other'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'qualification_submissions' AND column_name = 'custom_business_type'
  ) THEN
    ALTER TABLE qualification_submissions ADD COLUMN custom_business_type text;
  END IF;
END $$;
