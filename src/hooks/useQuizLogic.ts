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
  const [soundTrigger, setSoundTrigger] = useState<string | null>(null);
  const [currentDiscovery, setCurrentDiscovery] = useState<any>(null);

  const startQuiz = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 1 }));
  };

  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value }
    }));
    setSelectedAnswer(answer);
    setSoundTrigger("answer_select");
    
    // Show revelation for first question
    if (questionId === "primary_desire") {
      setTimeout(() => {
        setSoundTrigger("revelation");
        setShowRevelation(true);
      }, 1000);
    }
    // Show pattern recognition for second question  
    else if (questionId === "manifestation_frequency") {
      setTimeout(() => {
        setSoundTrigger("pattern_detected");
        setShowPattern(true);
      }, 1000);
    }
    // Go to email capture for third question
    else if (questionId === "main_block") {
      setTimeout(() => {
        setQuizState(prev => ({ ...prev, currentScreen: 4 }));
      }, 1000);
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
      
      setSoundTrigger("email_success");
      
      setTimeout(() => {
        setSoundTrigger("final_reveal");
        setQuizState(prev => ({ 
          ...prev, 
          currentScreen: 5,
          manifestationProfile: profile.title,
          readinessScore: 75
        }));
      }, 1000);
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
    // Redirect to the affiliate sales page
    window.open('https://pxt.pinealxt.com/ds/presentation/index.php#aff=awakeningprotocol', '_blank');
  };

  const handleDiscoveryUnlock = (discovery: any) => {
    setCurrentDiscovery(discovery);
    setSoundTrigger("achievement");
  };

  const closeDiscovery = () => {
    setCurrentDiscovery(null);
  };

  const clearSoundTrigger = () => {
    setSoundTrigger(null);
  };

  return {
    quizState,
    showRevelation,
    showPattern,
    selectedAnswer,
    soundTrigger,
    currentDiscovery,
    startQuiz,
    handleAnswer,
    continueFromRevelation,
    continueFromPattern,
    submitEmailAndName,
    getCurrentQuestion,
    getRevelationText,
    getPatternDescription,
    getFinalProfile,
    handleContinueToVSL,
    handleDiscoveryUnlock,
    closeDiscovery,
    clearSoundTrigger
  };
};