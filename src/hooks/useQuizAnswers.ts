import { supabase } from "@/integrations/supabase/client";

export const saveQuizAnswers = async (quizId: string, answers: Record<string, string>) => {
  const answerInserts = Object.entries(answers).map(([questionId, answerValue]) => ({
    quiz_id: quizId,
    question_id: questionId,
    answer_id: answerValue,
    answer_text: getAnswerText(questionId, answerValue),
    answer_value: answerValue
  }));

  const { error } = await supabase
    .from('quiz_answers')
    .insert(answerInserts);

  if (error) {
    console.error('Error saving quiz answers:', error);
    throw error;
  }
};

const getAnswerText = (questionId: string, answerValue: string): string => {
  // Map answer values to readable text
  const answerTexts: Record<string, Record<string, string>> = {
    primary_desire: {
      abundance: "Abundância Financeira",
      love: "Relacionamentos e Amor",
      health: "Saúde e Vitalidade",
      success: "Sucesso Profissional",
      spiritual: "Crescimento Espiritual"
    },
    manifestation_frequency: {
      daily: "Todos os dias",
      weekly: "Algumas vezes por semana",
      monthly: "Uma vez por mês ou menos",
      rarely: "Raramente ou nunca"
    },
    main_block: {
      doubt: "Dúvidas e ceticismo",
      patience: "Falta de paciência",
      focus: "Dificuldade de foco",
      worthiness: "Sentimentos de não merecimento",
      technique: "Não sei as técnicas certas"
    }
  };

  return answerTexts[questionId]?.[answerValue] || answerValue;
};