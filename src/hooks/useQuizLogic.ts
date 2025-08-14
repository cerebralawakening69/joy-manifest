import { useState } from "react";
import { QuizState, QuizAnswer } from "@/types/quiz";
import { quizQuestions, revelationTexts, getManifestationProfile, getPatternText } from "@/data/quizData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTracking } from "@/hooks/useTracking";
import { saveQuizAnswers } from "@/hooks/useQuizAnswers";
import { useMetaPixel } from "@/hooks/useMetaPixel";

export const useQuizLogic = () => {
  const { toast } = useToast();
  const { trackingData, startQuizTracking, getCompletionData, getAffiliateLink, trackEvent } = useTracking();
  const { 
    trackQuizStarted, 
    trackQuizProgress, 
    trackLead, 
    trackCompleteRegistration, 
    trackViewContent, 
    trackInitiateCheckout,
    trackPatternRevealed 
  } = useMetaPixel();
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
  const [showPreEmail, setShowPreEmail] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [soundTrigger, setSoundTrigger] = useState<string | null>(null);
  const [currentDiscovery, setCurrentDiscovery] = useState<any>(null);

  const startQuiz = () => {
    startQuizTracking();
    trackEvent('quiz_started', { timestamp: new Date().toISOString() });
    // Meta Pixel: Track quiz started
    trackQuizStarted({
      content_name: 'Manifestation Quiz',
      content_category: 'Quiz',
      value: 18
    });
    setQuizState(prev => ({ ...prev, currentScreen: 1 }));
  };

  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    console.log('🔥 handleAnswer called with:', { questionId, answer });
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value }
    }));
    setSelectedAnswer(answer);
    setSoundTrigger("answer_select");
    
    // Track answer selection
    trackEvent('quiz_answer', {
      questionId,
      answerId: answer.id,
      answerValue: answer.value,
      answerText: answer.text,
      timestamp: new Date().toISOString()
    });
    
    // Meta Pixel: Track quiz progress
    const questionNumber = quizState.currentScreen;
    trackQuizProgress(questionNumber, quizState.manifestationProfile);
    
    // Show revelation for first question
    if (questionId === "primary_desire") {
      setTimeout(() => {
        setSoundTrigger("revelation");
        setShowRevelation(true);
        trackEvent('revelation_shown', { questionId, timestamp: new Date().toISOString() });
      }, 1000);
    }
    // Show pattern recognition for second question  
    else if (questionId === "manifestation_frequency") {
      setTimeout(() => {
        setSoundTrigger("pattern_detected");
        setShowPattern(true);
        trackEvent('pattern_shown', { questionId, timestamp: new Date().toISOString() });
        // Meta Pixel: Track pattern revealed
        const pattern = getPatternText(quizState.answers);
        trackPatternRevealed(pattern);
      }, 1000);
    }
    // Show pre-email screen for third question
    else if (questionId === "main_block") {
      setTimeout(() => {
        setShowPreEmail(true);
        trackEvent('pre_email_screen_shown', { timestamp: new Date().toISOString() });
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

  const continueFromPreEmail = () => {
    setShowPreEmail(false);
    setQuizState(prev => ({ ...prev, currentScreen: 4 }));
    trackEvent('email_screen_reached', { timestamp: new Date().toISOString() });
    // Meta Pixel: Track email screen view
    trackViewContent({
      content_name: 'Email Collection Screen',
      content_category: 'Lead Generation',
      value: 18
    });
  };

  const submitEmailAndName = async (email: string, name: string) => {
    console.log('📧 STARTING submitEmailAndName');
    
    // Update state immediately
    setQuizState(prev => ({ ...prev, email, name }));
    
    // Calculate profile first
    const profile = getManifestationProfile(quizState.answers);
    
    // SKIP ALL DATABASE OPERATIONS FOR NOW - just go to result screen
    console.log('📧 SKIPPING DATABASE - going direct to result');
    
    // Track events (these are safe)
    try {
      trackEvent('email_submitted', { email, name, timestamp: new Date().toISOString() });
      trackLead({
        content_name: 'Manifestation Quiz Lead',
        value: 18,
        currency: 'USD',
        custom_data: { email, name, quiz_type: 'manifestation' }
      });
    } catch (e) {
      console.log('Tracking failed but continuing:', e);
    }

    toast({
      title: "Success!",
      description: "Your manifestation profile has been revealed!"
    });
    
    setSoundTrigger("email_success");
    
    // Go directly to result screen
    setTimeout(() => {
      setSoundTrigger("final_reveal");
      setQuizState(prev => ({ 
        ...prev, 
        currentScreen: 5,
        manifestationProfile: profile.title,
        readinessScore: 75
      }));
    }, 1000);
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
    // Track affiliate link click
    trackEvent('affiliate_link_clicked', {
      timestamp: new Date().toISOString(),
      affiliateId: trackingData.affiliate_id
    });
    
    // Meta Pixel: Track initiate checkout (affiliate click)
    trackInitiateCheckout({
      content_name: 'Affiliate Product',
      value: 18,
      currency: 'USD',
      custom_data: {
        affiliate_id: trackingData.affiliate_id,
        source: 'quiz_completion'
      }
    });
    
    // Redirect to the affiliate sales page using tracked affiliate ID
    const affiliateLink = getAffiliateLink();
    window.open(affiliateLink, '_blank');
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
    showPreEmail,
    selectedAnswer,
    soundTrigger,
    currentDiscovery,
    startQuiz,
    handleAnswer,
    continueFromRevelation,
    continueFromPattern,
    continueFromPreEmail,
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