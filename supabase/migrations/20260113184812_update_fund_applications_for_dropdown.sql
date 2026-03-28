/*
  # Update Fund Applications Table for Dropdown

  1. Changes
    - Add `funding_purpose` column (text) - What the applicant will use the funding for
    - Add `other_details` column (text, nullable) - Additional details when "Other" is selected
    - Make `idea_summary` nullable for backward compatibility
  
  2. Notes
    - This supports the new dropdown-based form where users select their funding purpose
    - The "Other" option allows users to provide custom details
*/

-- Add new columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'fund_applications' AND column_name = 'funding_purpose'
  ) THEN
    ALTER TABLE fund_applications ADD COLUMN funding_purpose text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'fund_applications' AND column_name = 'other_details'
  ) THEN
    ALTER TABLE fund_applications ADD COLUMN other_details text;
  END IF;
END $$;

-- Make idea_summary nullable for backward compatibility
ALTER TABLE fund_applications ALTER COLUMN idea_summary DROP NOT NULL;