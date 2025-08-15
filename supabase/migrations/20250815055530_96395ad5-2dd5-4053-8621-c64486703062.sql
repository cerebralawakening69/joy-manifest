-- PHASE 1: RADICAL CLEANUP AND NEW STRUCTURE

-- Backup valid data from quiz_manifestation
CREATE TABLE IF NOT EXISTS quiz_manifestation_backup AS 
SELECT * FROM quiz_manifestation WHERE email IS NOT NULL;

-- Backup valid data from quiz_answers  
CREATE TABLE IF NOT EXISTS quiz_answers_backup AS
SELECT * FROM quiz_answers;

-- Drop all current messy tables
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS quiz_answers CASCADE;
DROP TABLE IF EXISTS quiz_manifestation CASCADE;

-- Create ONE clean table for everything
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User Information
  email TEXT,
  name TEXT,
  
  -- Quiz Results
  primary_desire TEXT,
  manifestation_frequency TEXT, 
  main_block TEXT,
  manifestation_profile TEXT,
  readiness_score INTEGER,
  
  -- All Quiz Answers (JSON)
  answers JSONB DEFAULT '{}',
  
  -- Tracking Data
  session_id TEXT,
  user_ip INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- UTM Parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  
  -- Third-party IDs
  facebook_pixel_id TEXT,
  bemob_click_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  quiz_started_at TIMESTAMPTZ,
  quiz_completed_at TIMESTAMPTZ,
  email_submitted_at TIMESTAMPTZ,
  result_viewed_at TIMESTAMPTZ,
  
  -- VSL Tracking
  vsl_clicked_at TIMESTAMPTZ,
  vsl_click_count INTEGER DEFAULT 0,
  
  -- Progress Tracking
  current_question INTEGER DEFAULT 0,
  questions_completed INTEGER DEFAULT 0,
  quiz_completed BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow anonymous submissions" ON public.quiz_submissions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous updates" ON public.quiz_submissions  
FOR UPDATE USING (true);

CREATE POLICY "Allow public read access" ON public.quiz_submissions
FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_quiz_submissions_email ON public.quiz_submissions(email);
CREATE INDEX idx_quiz_submissions_created_at ON public.quiz_submissions(created_at);
CREATE INDEX idx_quiz_submissions_utm_source ON public.quiz_submissions(utm_source);
CREATE INDEX idx_quiz_submissions_completed ON public.quiz_submissions(quiz_completed);

-- Migrate valid data from backup
INSERT INTO public.quiz_submissions (
  email, name, primary_desire, manifestation_frequency, main_block,
  manifestation_profile, readiness_score, user_ip, user_agent, referrer,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  facebook_pixel_id, bemob_click_id, created_at, quiz_started_at,
  quiz_completed_at, vsl_clicked_at, vsl_click_count, quiz_completed
)
SELECT 
  email, name, primary_desire, manifestation_frequency, main_block,
  manifestation_profile, readiness_score, user_ip, user_agent, referrer,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  facebook_pixel_id, bemob_click_id, created_at, quiz_started_at,
  quiz_completed_at, vsl_clicked_at, vsl_click_count,
  CASE WHEN quiz_completed_at IS NOT NULL THEN true ELSE false END
FROM quiz_manifestation_backup;