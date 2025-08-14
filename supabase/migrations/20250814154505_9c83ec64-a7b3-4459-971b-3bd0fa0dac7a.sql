-- Add VSL click tracking fields to quiz_manifestation table
ALTER TABLE public.quiz_manifestation 
ADD COLUMN vsl_clicked_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN vsl_click_count INTEGER DEFAULT 0;