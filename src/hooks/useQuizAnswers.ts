import { supabase } from "@/integrations/supabase/client";

export const saveQuizAnswers = async (quizId: string, answers: Record<string, string>) => {
  console.log('🔄 Starting saveQuizAnswers for quizId:', quizId);
  
  if (!quizId || Object.keys(answers).length === 0) {
    console.warn('⚠️ Invalid data - skipping saveQuizAnswers', { quizId, answersCount: Object.keys(answers).length });
    return;
  }

  try {
    const answerInserts = Object.entries(answers).map(([questionId, answerValue]) => ({
      quiz_id: quizId,
      question_id: questionId,
      answer_id: answerValue,
      answer_text: getAnswerText(questionId, answerValue),
      answer_value: answerValue
    }));

    console.log('📝 Inserting answers:', answerInserts);

    const { error } = await supabase
      .from('quiz_answers')
      .insert(answerInserts);

    if (error) {
      console.error('❌ Supabase error in saveQuizAnswers:', error);
      // Don't throw - let the operation fail gracefully
      return;
    }
    
    console.log('✅ Successfully saved quiz answers');
  } catch (error) {
    console.error('❌ Unexpected error in saveQuizAnswers:', error);
    // Don't throw - let the operation fail gracefully
  }
};

const getAnswerText = (questionId: string, answerValue: string): string => {
  // Map answer values to readable text
  const answerTexts: Record<string, Record<string, string>> = {
    primary_desire: {
      money: "Financial abundance and true freedom",
      love: "Find or improve my soulmate connection",
      health: "Radiant health and limitless energy",
      purpose: "Discover my life purpose and live with passion"
    },
    manifestation_frequency: {
      stuck: "I feel trapped in the same patterns",
      effort: "I work hard but see no real results",
      direction: "I'm confused about which path to take",
      doubt: "I fear I'm not capable of achieving my dreams"
    },
    main_block: {
      beliefs: "Limiting beliefs about what's possible for me",
      knowledge: "I don't know the right method or system",
      fear: "Fear of failure or being judged",
      energy: "Lack of energy and motivation to persist"
    }
  };

  return answerTexts[questionId]?.[answerValue] || answerValue;
};