/*
  # Add phone field to pricing_estimates

  Adds a phone number column to the pricing_estimates table.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pricing_estimates' AND column_name = 'phone'
  ) THEN
    ALTER TABLE pricing_estimates ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;
