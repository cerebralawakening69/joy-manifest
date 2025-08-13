import { useState } from "react";
import { QuizState, QuizAnswer } from "@/types/quiz";
import { quizQuestions, revelationTexts, getManifestationProfile, getPatternText } from "@/data/quizData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useQuizLogic = () => {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>({
    currentScreen: 0,
    answers: {},
    email: "",
    name: "",
    manifestationProfile: "",
    readinessScore: 0
  });

  const [showRevelation, setShowRevelation] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer | null>(null);

  const startQuiz = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 1 }));
  };

  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value }
    }));
    setSelectedAnswer(answer);
    
    // Show revelation for first question
    if (questionId === "primary_desire") {
      setShowRevelation(true);
    }
    // Show pattern recognition for second question  
    else if (questionId === "manifestation_frequency") {
      setShowPattern(true);
    }
    // Go to email capture for third question
    else if (questionId === "main_block") {
      setQuizState(prev => ({ ...prev, currentScreen: 4 }));
    }
  };

  const continueFromRevelation = () => {
    setShowRevelation(false);
    setQuizState(prev => ({ ...prev, currentScreen: 2 }));
  };

  const continueFromPattern = () => {
    setShowPattern(false);
    setQuizState(prev => ({ ...prev, currentScreen: 3 }));
  };

  const submitEmailAndName = async (email: string, name: string) => {
    setQuizState(prev => ({ ...prev, email, name }));
    
    // Calculate final profile
    const profile = getManifestationProfile(quizState.answers);
    
    // Save to database
    try {
      const { error } = await supabase
        .from('quiz_manifestation')
        .insert({
          email,
          name,
          primary_desire: quizState.answers.primary_desire,
          manifestation_frequency: quizState.answers.manifestation_frequency,
          main_block: quizState.answers.main_block,
          readiness_score: profile.details ? 75 : 50, // Simple scoring
          manifestation_profile: profile.title
        });

      if (error) {
        console.error('Error saving quiz result:', error);
        toast({
          title: "Error",
          description: "Failed to save your results. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your manifestation profile has been revealed!"
      });
      
      setQuizState(prev => ({ 
        ...prev, 
        currentScreen: 5,
        manifestationProfile: profile.title,
        readinessScore: 75
      }));
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error", 
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getCurrentQuestion = () => {
    const questionIndex = quizState.currentScreen - 1;
    return quizQuestions[questionIndex];
  };

  const getRevelationText = () => {
    if (!selectedAnswer) return "";
    const questionId = getCurrentQuestion()?.id;
    const revelationFn = revelationTexts[questionId];
    return revelationFn ? revelationFn(selectedAnswer.value) : "";
  };

  const getPatternDescription = () => {
    return getPatternText(quizState.answers);
  };

  const getFinalProfile = () => {
    return getManifestationProfile(quizState.answers);
  };

  const handleContinueToVSL = () => {
    // This would typically redirect to a sales page or video
    window.open('https://example.com/manifestation-method', '_blank');
  };

  return {
    quizState,
    showRevelation,
    showPattern,
    selectedAnswer,
    startQuiz,
    handleAnswer,
    continueFromRevelation,
    continueFromPattern,
    submitEmailAndName,
    getCurrentQuestion,
    getRevelationText,
    getPatternDescription,
    getFinalProfile,
    handleContinueToVSL
  };
};