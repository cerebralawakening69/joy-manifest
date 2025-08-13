-- Expand quiz_manifestation table with tracking and analytics fields
ALTER TABLE public.quiz_manifestation 
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS utm_term TEXT,
ADD COLUMN IF NOT EXISTS utm_content TEXT,
ADD COLUMN IF NOT EXISTS user_ip INET,
ADD COLUMN IF NOT EXISTS user_agent TEXT,
ADD COLUMN IF NOT EXISTS quiz_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS quiz_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS device_type TEXT,
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS facebook_pixel_id TEXT,
ADD COLUMN IF NOT EXISTS bemob_click_id TEXT,
ADD COLUMN IF NOT EXISTS conversion_event_fired BOOLEAN DEFAULT FALSE;

-- Create quiz_answers table for detailed response tracking
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quiz_manifestation(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on quiz_answers
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_answers
CREATE POLICY "Allow anonymous answer submissions" 
ON public.quiz_answers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read access to answers" 
ON public.quiz_answers 
FOR SELECT 
USING (true);

-- Create admin_users table for dashboard access
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (very restrictive)
CREATE POLICY "Only admins can read admin users" 
ON public.admin_users 
FOR SELECT 
USING (false); -- Will be updated with proper auth logic later

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_answers_quiz_id ON public.quiz_answers(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_question_id ON public.quiz_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_manifestation_email ON public.quiz_manifestation(email);
CREATE INDEX IF NOT EXISTS idx_quiz_manifestation_created_at ON public.quiz_manifestation(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_manifestation_utm_source ON public.quiz_manifestation(utm_source);

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();