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
    console.log('📧 submitEmailAndName called with:', { email, name });
    setQuizState(prev => ({ ...prev, email, name }));
    
    // Track email submission
    trackEvent('email_submitted', {
      email,
      name,
      timestamp: new Date().toISOString()
    });
    
    // Meta Pixel: Track lead conversion (main conversion event)
    trackLead({
      content_name: 'Manifestation Quiz Lead',
      value: 18,
      currency: 'USD',
      custom_data: {
        email,
        name,
        quiz_type: 'manifestation'
      }
    });
    
    // Calculate final profile
    const profile = getManifestationProfile(quizState.answers);
    
    // Get completion tracking data
    const completionData = getCompletionData();
    
    // Save to database
    try {
      const { data: quizData, error } = await supabase
        .from('quiz_manifestation')
        .insert({
          email,
          name,
          primary_desire: quizState.answers.primary_desire,
          manifestation_frequency: quizState.answers.manifestation_frequency,
          main_block: quizState.answers.main_block,
          readiness_score: profile.details ? 75 : 50, // Simple scoring
          manifestation_profile: profile.title,
          // Tracking data
          utm_source: completionData.utm_source,
          utm_medium: completionData.utm_medium,
          utm_campaign: completionData.utm_campaign,
          utm_term: completionData.utm_term,
          utm_content: completionData.utm_content,
          user_agent: completionData.user_agent,
          device_type: completionData.device_type,
          referrer: completionData.referrer,
          facebook_pixel_id: completionData.facebook_pixel_id,
          bemob_click_id: completionData.bemob_click_id,
          quiz_started_at: completionData.quiz_started_at,
          quiz_completed_at: completionData.quiz_completed_at
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase error in submitEmailAndName:', error);
        console.error('❌ Error details:', JSON.stringify(error, null, 2));
        toast({
          title: "Error",
          description: "Failed to save your results. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      console.log('✅ Quiz data saved successfully:', quizData);

      // Save detailed answers in background (non-blocking)
      if (quizData?.id) {
        saveQuizAnswers(quizData.id, quizState.answers).catch(error => {
          console.error('Background saveQuizAnswers failed:', error);
          // Don't throw error - let quiz continue normally
        });
      }

      // Track quiz completion
      trackEvent('quiz_completed', {
        profile: profile.title,
        email,
        name,
        answers: quizState.answers,
        readinessScore: 75,
        timestamp: new Date().toISOString()
      });
      
      // Meta Pixel: Track complete registration
      trackCompleteRegistration({
        content_name: profile.title,
        value: 18,
        currency: 'USD',
        custom_data: {
          manifestation_profile: profile.title,
          readiness_score: 75
        }
      });

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
      toast({
        title: "Error", 
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      // Force continue to result screen even on error
      console.log('🚨 Forcing navigation to result screen despite error');
      setTimeout(() => {
        setQuizState(prev => ({ 
          ...prev, 
          currentScreen: 5,
          manifestationProfile: getFinalProfile().title,
          readinessScore: 50
        }));
      }, 500);
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