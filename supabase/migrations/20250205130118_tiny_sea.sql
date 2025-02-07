/*
  # Add phone authentication support

  1. Changes
    - Add phone_number column to profiles table
    - Update handle_new_user function to handle phone authentication
    - Add index on phone_number for better query performance

  2. Security
    - Maintain existing RLS policies
    - Phone numbers are protected by the same policies as other profile data
*/

-- Add phone_number to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone_number text;

-- Add index for phone lookups
CREATE INDEX IF NOT EXISTS profiles_phone_number_idx ON profiles(phone_number);

-- Update the handle_new_user function to handle phone auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    phone_number
  )
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'name',
      CASE 
        WHEN new.phone IS NOT NULL THEN 'User ' || substr(new.phone, -4)
        ELSE split_part(COALESCE(new.email, ''), '@', 1)
      END
    ),
    new.phone
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;