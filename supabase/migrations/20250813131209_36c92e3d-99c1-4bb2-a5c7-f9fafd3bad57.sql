-- Create table for manifestation quiz results
CREATE TABLE public.quiz_manifestation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(100),
  primary_desire VARCHAR(30) NOT NULL,
  manifestation_frequency VARCHAR(20) NOT NULL,
  main_block VARCHAR(30) NOT NULL,
  readiness_score INTEGER NOT NULL,
  manifestation_profile VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.quiz_manifestation ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for quiz submissions)
CREATE POLICY "Allow anonymous quiz submissions" 
ON public.quiz_manifestation 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow users to view all quiz results (for analytics)
CREATE POLICY "Allow public read access" 
ON public.quiz_manifestation 
FOR SELECT 
TO anon
USING (true);