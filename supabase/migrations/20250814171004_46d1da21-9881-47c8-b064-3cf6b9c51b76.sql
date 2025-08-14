-- Delete all empty records created today that are wasting space
DELETE FROM quiz_manifestation 
WHERE DATE(created_at) = CURRENT_DATE 
AND (email IS NULL OR email = '') 
AND (last_question_reached = 0 OR last_question_reached IS NULL)
AND (questions_progress = '{}' OR questions_progress IS NULL);