-- Ensure the quiz_manifestation table can properly store email data
-- Check if we need to update any constraints or triggers

-- First, let's make sure the email and name columns can store data properly
ALTER TABLE public.quiz_manifestation 
ALTER COLUMN email SET DEFAULT NULL,
ALTER COLUMN name SET DEFAULT NULL;

-- Ensure we have proper RLS policies for insertion
DROP POLICY IF EXISTS "Allow anonymous quiz submissions" ON public.quiz_manifestation;
CREATE POLICY "Allow anonymous quiz submissions" 
ON public.quiz_manifestation 
FOR INSERT 
WITH CHECK (true);

-- Add a policy to allow updates for completion data
CREATE POLICY "Allow anonymous quiz updates" 
ON public.quiz_manifestation 
FOR UPDATE 
WITH CHECK (true);