-- Add comprehensive funnel tracking fields to quiz_manifestation table
ALTER TABLE public.quiz_manifestation 
ADD COLUMN page_viewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN last_question_reached INTEGER DEFAULT 0,
ADD COLUMN email_screen_reached_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN result_viewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN questions_progress JSONB DEFAULT '{}'::jsonb;