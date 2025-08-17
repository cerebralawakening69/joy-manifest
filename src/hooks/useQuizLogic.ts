import { useState } from "react";
import { api, getSessionId } from "@/integrations/backend/client";
import { QuizState, QuizAnswer } from "@/types/quiz";
import { quizQuestions, revelationTexts, getManifestationProfile, getPatternText } from "@/data/quizData";
import { useToast } from "@/hooks/use-toast";
import { useTracking } from "@/hooks/useTracking";
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

  // === COMEÇOU O QUIZ ===
  const startQuiz = () => {
    // back-end: marca início do quiz
    try { api.startQuiz({ session_id: getSessionId() }); } catch {}
    // tracking local
    startQuizTracking();
    trackEvent("quiz_started", { timestamp: new Date().toISOString() });
    trackQuizStarted({
      content_name: "Manifestation Quiz",
      content_category: "Quiz",
      value: 18,
    });
    setQuizState(prev => ({ ...prev, currentScreen: 1 }));
  };

  // === RESPOSTA ===
  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value }
    }));
    setSelectedAnswer(answer);
    setSoundTrigger("answer_select");
    
    trackEvent("quiz_answer", {
      questionId,
      answerId: answer.id,
      answerValue: answer.value,
      answerText: answer.text,
      timestamp: new Date().toISOString(),
    });

    const questionNumber = quizState.currentScreen;
    trackQuizProgress(questionNumber, quizState.manifestationProfile);
    
    // Efeitos por pergunta
    if (questionId === "primary_desire") {
      setTimeout(() => {
        setSoundTrigger("revelation");
        setShowRevelation(true);
        trackEvent("revelation_shown", { questionId, timestamp: new Date().toISOString() });
      }, 1000);
    } else if (questionId === "manifestation_frequency") {
      setTimeout(() => {
        setSoundTrigger("pattern_detected");
        setShowPattern(true);
        trackEvent("pattern_shown", { questionId, timestamp: new Date().toISOString() });
        const newAnswers = { ...quizState.answers, [questionId]: answer.value };
        const pattern = getPatternText(newAnswers);
        trackPatternRevealed(pattern);
      }, 1000);
    } else if (questionId === "main_block") {
      setTimeout(() => {
        setShowPreEmail(true);
        trackEvent("pre_email_screen_shown", { timestamp: new Date().toISOString() });
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
    trackEvent("email_screen_reached", { timestamp: new Date().toISOString() });
    trackViewContent({
      content_name: "Email Collection Screen",
      content_category: "Lead Generation",
      value: 18,
    });
  };

  // === LEAD (EMAIL + NOME) ===
  const submitEmailAndName = async (email: string, name: string) => {
    try {
      // Atualiza estado
      setQuizState(prev => ({ ...prev, email, name }));

      // Calcula perfil + coleta meta
      const profile = getManifestationProfile(quizState.answers);
      const completionData = getCompletionData();

      // IP é nice-to-have; se falhar, ignora
      const userIP = await fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => null);

      // Envia pro Sheets (Apps Script) — UMA CHAMADA resolve (email + respostas)
      await api.emailSubmitted({
        session_id: getSessionId(),
        email,
        name,
        profileTitle: profile.title,
        answers: quizState.answers,
        // extras úteis (o Apps Script ignora o que não usar)
        utm_source: trackingData.utm_source,
        utm_medium: trackingData.utm_medium,
        utm_campaign: trackingData.utm_campaign,
        utm_content: trackingData.utm_content,
        utm_term: trackingData.utm_term,
        user_agent: navigator.userAgent,
        referrer: trackingData.referrer,
        user_ip: userIP,
        completionData,
      });

      // Tracking de marketing
      trackEvent("email_submitted", { email, name, timestamp: new Date().toISOString() });
      trackLead({
        content_name: "Manifestation Quiz Lead",
        value: 18,
        currency: "USD",
        custom_data: { email, name, quiz_type: "manifestation" },
      });

      // UI feedback
      const readinessScore = 75; // se tiver lógica real, troca aqui
      toast({ title: "Success!", description: "Your manifestation profile has been revealed!" });
      setSoundTrigger("email_success");

      // Vai para a tela de resultado
      setTimeout(() => {
        setSoundTrigger("final_reveal");
        setQuizState(prev => ({
          ...prev,
          currentScreen: 5,
          manifestationProfile: profile.title,
          readinessScore,
        }));
      }, 1000);
    } catch (error) {
      console.error("❌ Error on emailSubmitted:", error);
      // Mesmo falhando, segue o fluxo pra não travar o usuário
      const profile = getManifestationProfile(quizState.answers);
      setQuizState(prev => ({
        ...prev,
        currentScreen: 5,
        manifestationProfile: profile.title,
        readinessScore: 75,
      }));
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

  // === CLIQUE NA VSL ===
  const handleContinueToVSL = () => {
    // tracking próprio
    trackEvent("affiliate_link_clicked", {
      timestamp: new Date().toISOString(),
      affiliateId: trackingData.affiliate_id,
    });

    // Meta Pixel
    trackInitiateCheckout({
      content_name: "Affiliate Product",
      value: 18,
      currency: "USD",
      custom_data: {
        affiliate_id: trackingData.affiliate_id,
        source: "quiz_completion",
      },
    });

    // back-end: registra clique (usa sendBeacon no client, não bloqueia)
    try {
      const affiliateLink = getAffiliateLink();
      api.vslClick({ session_id: getSessionId(), vsl_url: affiliateLink });
      window.open(affiliateLink, "_blank");
    } catch {
      const fallbackLink = getAffiliateLink();
      window.open(fallbackLink, "_blank");
    }
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
  };
};
