import { useState } from "react";
import { QuizState, QuizAnswer } from "@/types/quiz";
import { quizQuestions, revelationTexts, getManifestationProfile, getPatternText } from "@/data/quizData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTracking } from "@/hooks/useTracking";
import { saveQuizAnswers, updateVSLClick } from "@/hooks/useQuizAnswers";
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

  // Static tracking functions to prevent infinite loops
  const trackPageView = async () => {
    console.log('🔄 trackPageView called');
    
    // Check localStorage first
    let currentQuizId = localStorage.getItem('quiz_current_id');
    
    if (currentQuizId) {
      console.log('✅ Using existing quizId from localStorage:', currentQuizId);
      
      // Update state if needed
      setQuizState(prev => {
        if (prev.quizId !== currentQuizId) {
          console.log('🔄 Syncing state with localStorage quizId');
          return { ...prev, quizId: currentQuizId };
        }
        return prev;
      });
      
      // Update existing record with page view
      const { error } = await supabase
        .from('quiz_manifestation')
        .update({ 
          page_viewed_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          referrer: document.referrer || null
        })
        .eq('id', currentQuizId);
      
      if (error) {
        console.error('❌ Error updating quiz record:', error);
      } else {
        console.log('✅ Quiz record updated with page view');
      }
      return currentQuizId;
    }

    // Create new quiz record
    console.log('🆕 Creating new quiz record');
    const completionData = getCompletionData();
    
    const { data: quizData, error } = await supabase
      .from('quiz_manifestation')
      .insert({
        page_viewed_at: new Date().toISOString(),
        quiz_started_at: new Date().toISOString(),
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
        primary_desire: 'unknown',
        manifestation_frequency: 'unknown',
        main_block: 'unknown',
        manifestation_profile: 'unknown',
        readiness_score: 0
      })
      .select('id')
      .single();

    if (error) {
      console.error('❌ Error creating quiz record:', error);
      return null;
    }

    if (quizData?.id) {
      localStorage.setItem('quiz_current_id', quizData.id);
      setQuizState(prev => ({ ...prev, quizId: quizData.id }));
      console.log('✅ New quiz record created, quizId:', quizData.id);
      return quizData.id;
    }
    
    return null;
  };

  const trackQuestionProgress = async (questionNumber: number, questionId: string) => {
    const currentQuizId = localStorage.getItem('quiz_current_id');
    if (!currentQuizId) {
      console.error('❌ No quizId available for tracking question progress');
      return;
    }

    console.log(`📊 Tracking question ${questionNumber} progress`);
    
    const currentProgress = quizState.answers;
    const progressWithTimestamp = {
      ...currentProgress,
      [`${questionId}_timestamp`]: new Date().toISOString()
    };

    const { error } = await supabase
      .from('quiz_manifestation')
      .update({
        last_question_reached: questionNumber,
        questions_progress: progressWithTimestamp
      })
      .eq('id', currentQuizId);

    if (error) {
      console.error('❌ Error tracking question progress:', error);
    } else {
      console.log(`✅ Question ${questionNumber} progress tracked`);
    }
  };

  const trackEmailScreenReached = async () => {
    const currentQuizId = localStorage.getItem('quiz_current_id');
    if (!currentQuizId) {
      console.error('❌ No quizId available for tracking email screen');
      return;
    }

    console.log('📧 Tracking email screen reached');
    
    const { error } = await supabase
      .from('quiz_manifestation')
      .update({ email_screen_reached_at: new Date().toISOString() })
      .eq('id', currentQuizId);
    
    if (error) {
      console.error('❌ Error tracking email screen:', error);
    } else {
      console.log('✅ Email screen reached tracked');
    }
  };

  const trackResultViewed = async () => {
    const currentQuizId = localStorage.getItem('quiz_current_id');
    if (!currentQuizId) {
      console.error('❌ No quizId available for tracking result view');
      return;
    }

    console.log('🎯 Tracking result viewed');
    
    const { error } = await supabase
      .from('quiz_manifestation')
      .update({ result_viewed_at: new Date().toISOString() })
      .eq('id', currentQuizId);
    
    if (error) {
      console.error('❌ Error tracking result view:', error);
    } else {
      console.log('✅ Result view tracked');
    }
  };

  const startQuiz = async () => {
    startQuizTracking();
    trackEvent('quiz_started', { timestamp: new Date().toISOString() });
    
    trackQuizStarted({
      content_name: 'Manifestation Quiz',
      content_category: 'Quiz',
      value: 18
    });
    
    // Ensure we have a quizId before starting
    await trackPageView();
    
    setQuizState(prev => ({ ...prev, currentScreen: 1 }));
  };

  const handleAnswer = async (questionId: string, answer: QuizAnswer) => {
    console.log(`🔥 BUTTON CLICKED: ${questionId} = ${answer.value} | Screen: ${quizState.currentScreen}`);
    
    let currentQuizId = localStorage.getItem('quiz_current_id');
    
    // FALLBACK: Create new quiz ID if missing (DON'T BLOCK UI)
    if (!currentQuizId) {
      console.log('🔥 NO QUIZ ID - CREATING NEW ONE');
      currentQuizId = crypto.randomUUID();
      localStorage.setItem('quiz_current_id', currentQuizId);
      setQuizState(prev => ({ ...prev, quizId: currentQuizId }));
    }

    // UPDATE STATE IMMEDIATELY (non-blocking UI response)
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value }
    }));
    setSelectedAnswer(answer);
    setSoundTrigger("answer_select");
    
    // Show revelation for first question
    if (questionId === "primary_desire") {
      console.log('🔥 SHOWING REVELATION SCREEN');
      setTimeout(() => {
        setSoundTrigger("revelation");
        setShowRevelation(true);
        trackEvent('revelation_shown', { questionId, timestamp: new Date().toISOString() });
      }, 1000);
      // Save in background (non-blocking)
      saveAnswerInBackground(currentQuizId, questionId, answer);
      return;
    }
    // Show pattern recognition for second question  
    else if (questionId === "manifestation_frequency") {
      console.log('🔥 SHOWING PATTERN SCREEN');
      setTimeout(() => {
        setSoundTrigger("pattern_detected");
        setShowPattern(true);
        trackEvent('pattern_shown', { questionId, timestamp: new Date().toISOString() });
        // Meta Pixel: Track pattern revealed
        const pattern = getPatternText({ ...quizState.answers, [questionId]: answer.value });
        trackPatternRevealed(pattern);
      }, 1000);
      // Save in background (non-blocking)
      saveAnswerInBackground(currentQuizId, questionId, answer);
      return;
    }
    // Show pre-email screen for third question
    else if (questionId === "main_block") {
      console.log('🔥 SHOWING PRE-EMAIL SCREEN');
      setTimeout(async () => {
        setShowPreEmail(true);
        trackEvent('pre_email_screen_shown', { timestamp: new Date().toISOString() });
        await trackEmailScreenReached();
      }, 1000);
      // Save in background (non-blocking)
      saveAnswerInBackground(currentQuizId, questionId, answer);
      return;
    }
    
    // Default: continue to next screen
    console.log('🔥 NO SPECIAL SCREEN - CONTINUING');
    // Save in background (non-blocking)
    saveAnswerInBackground(currentQuizId, questionId, answer);
  };

  // Background save function (non-blocking)
  const saveAnswerInBackground = async (quizId: string, questionId: string, answer: QuizAnswer) => {
    try {
      console.log(`🔥 SAVING IN BACKGROUND: ${questionId} = ${answer.value}`);
      
      // Save answer to database
      await saveQuizAnswers(quizId, { [questionId]: answer.value });
      
      // Map questionId to correct question number (1,2,3)
      const questionNumberMap: Record<string, number> = {
        'primary_desire': 1,
        'manifestation_frequency': 2,
        'main_block': 3
      };
      const questionNumber = questionNumberMap[questionId] || 1;
      
      // Track question progress with correct number
      await trackQuestionProgress(questionNumber, questionId);
      
      // Track answer selection
      trackEvent('quiz_answer', {
        questionId,
        answerId: answer.id,
        answerValue: answer.value,
        answerText: answer.text,
        timestamp: new Date().toISOString()
      });
      
      // Meta Pixel: Track quiz progress
      trackQuizProgress(questionNumber, quizState.manifestationProfile);
      
      console.log(`🔥 BACKGROUND SAVE SUCCESS: ${questionId}`);
    } catch (error) {
      console.error(`🔥 BACKGROUND SAVE ERROR for ${questionId}:`, error);
      // Don't block UI on save errors
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
    const currentQuizId = localStorage.getItem('quiz_current_id');
    if (!currentQuizId) {
      console.error('❌ No quizId available for email submission');
      return;
    }

    console.log('📧 Submitting email:', { email, name });
    
    // Calculate final profile and readiness score
    const profile = getManifestationProfile(quizState.answers);
    const readinessScore = 75;

    try {
      // Update the existing record
      await updateQuizRecord(currentQuizId, email, name, profile, readinessScore);
      await saveQuizAnswers(currentQuizId, quizState.answers);

      console.log('✅ Email and name saved successfully for quiz:', currentQuizId);

      setQuizState(prev => ({
        ...prev,
        quizId: currentQuizId,
        email,
        name,
        manifestationProfile: profile.title,
        readinessScore
      }));

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

      // Track quiz completion
      trackEvent('quiz_completed', {
        profile: profile.title,
        email,
        name,
        answers: quizState.answers,
        readinessScore,
        timestamp: new Date().toISOString()
      });
      
      // Meta Pixel: Track complete registration
      trackCompleteRegistration({
        content_name: profile.title,
        value: 18,
        currency: 'USD',
        custom_data: {
          manifestation_profile: profile.title,
          readiness_score: readinessScore
        }
      });

      toast({
        title: "Success!",
        description: "Your manifestation profile has been revealed!"
      });
      
      setSoundTrigger("email_success");
      
      setTimeout(async () => {
        await trackResultViewed();
        setSoundTrigger("final_reveal");
        setQuizState(prev => ({ 
          ...prev, 
          currentScreen: 5,
          manifestationProfile: profile.title,
          readinessScore
        }));
      }, 1000);
    } catch (error) {
      console.error('❌ Error in submitEmailAndName:', error);
      toast({
        title: "Error", 
        description: "Failed to save your results. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateQuizRecord = async (quizId: string, email: string, name: string, profile: any, readinessScore: number) => {
    const { error } = await supabase
      .from('quiz_manifestation')
      .update({
        email,
        name,
        primary_desire: quizState.answers.primary_desire || 'unknown',
        manifestation_frequency: quizState.answers.manifestation_frequency || 'unknown', 
        main_block: quizState.answers.main_block || 'unknown',
        manifestation_profile: profile.title,
        readiness_score: readinessScore,
        quiz_completed_at: new Date().toISOString(),
        conversion_event_fired: true
      })
      .eq('id', quizId);

    if (error) {
      console.error('❌ Error updating quiz record:', error);
      throw error;
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

  const handleContinueToVSL = async () => {
    const currentQuizId = localStorage.getItem('quiz_current_id');
    
    if (!currentQuizId) {
      console.error('❌ No quiz ID available for VSL tracking');
      // Still allow user to continue to VSL even if tracking fails
      const affiliateLink = getAffiliateLink();
      window.open(affiliateLink, '_blank');
      return;
    }

    console.log('🎬 VSL button clicked, tracking for quiz:', currentQuizId);

    // Update VSL click in database
    try {
      await updateVSLClick(currentQuizId);
      console.log('✅ VSL click tracked successfully for quiz:', currentQuizId);
    } catch (error) {
      console.error('❌ Failed to track VSL click:', error);
    }

    // Track affiliate link click
    trackEvent('affiliate_link_clicked', {
      timestamp: new Date().toISOString(),
      affiliateId: trackingData.affiliate_id,
      quiz_id: currentQuizId
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
    clearSoundTrigger,
    trackPageView,
    trackEmailScreenReached,
    trackResultViewed
  };
};