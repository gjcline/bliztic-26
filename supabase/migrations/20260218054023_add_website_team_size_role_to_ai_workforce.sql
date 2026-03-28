/*
  # Add Website, Team Size, and Role columns to AI Workforce Waitlist

  1. Schema Changes
    - Add `website` (text, nullable) - Optional company website URL
    - Add `team_size` (text, nullable) - Size of the team/company
    - Add `role` (text, nullable) - Role of the person filling out the form
    - Make `use_case` nullable - This field is not currently being used in the form

  2. Important Notes
    - Website is optional and can be left blank
    - These fields align with the current form implementation
    - use_case is made nullable for backward compatibility
*/

DO $$
BEGIN
  -- Add website column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_workforce_waitlist' AND column_name = 'website'
  ) THEN
    ALTER TABLE ai_workforce_waitlist ADD COLUMN website text;
  END IF;

  -- Add team_size column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_workforce_waitlist' AND column_name = 'team_size'
  ) THEN
    ALTER TABLE ai_workforce_waitlist ADD COLUMN team_size text;
  END IF;

  -- Add role column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_workforce_waitlist' AND column_name = 'role'
  ) THEN
    ALTER TABLE ai_workforce_waitlist ADD COLUMN role text;
  END IF;
END $$;

-- Make use_case nullable for backward compatibility
ALTER TABLE ai_workforce_waitlist ALTER COLUMN use_case DROP NOT NULL;
