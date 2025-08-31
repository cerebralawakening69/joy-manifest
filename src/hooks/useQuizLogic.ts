// src/hooks/useQuizLogic.ts
import { useState } from "react";
import { QuizState, QuizAnswer } from "@/types/quiz";
import {
  quizQuestions,
  revelationTexts,
  getManifestationProfile,
  getPatternText,
} from "@/data/quizData";
import { useToast } from "@/hooks/use-toast";
import { useTracking } from "@/hooks/useTracking";
import { useMetaPixel } from "@/hooks/useMetaPixel";

export const useQuizLogic = () => {
  const { toast } = useToast();
  const t = useTracking(); // -> fornece trackStartQuiz, trackQuestionShown, trackAnswerSubmitted, trackEmailSubmitted, trackResultShown, trackCompleteQuiz
  const {
    trackQuizStarted,
    trackQuizProgress,
    trackLead,
    trackCompleteRegistration,
    trackViewContent,
    trackInitiateCheckout,
    trackPatternRevealed,
  } = useMetaPixel();

  const [quizState, setQuizState] = useState<QuizState>({
    currentScreen: 0,
    answers: {},
    email: "",
    name: "",
    manifestationProfile: "",
    readinessScore: 0,
  });

  const [showRevelation, setShowRevelation] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [showPreEmail, setShowPreEmail] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [soundTrigger, setSoundTrigger] = useState<string | null>(null);
  const [currentDiscovery, setCurrentDiscovery] = useState<any>(null);

  // === COMEÇAR O QUIZ ===
  const startQuiz = () => {
    // tracking (Sheets/Apps Script)
    t.trackStartQuiz(1);
    t.trackQuestionShown(1);

    // Meta Pixel opcional
    trackQuizStarted({
      content_name: "Manifestation Quiz",
      content_category: "Quiz",
      value: 18,
    });

    // UI
    setQuizState((prev) => ({ ...prev, currentScreen: 1 }));
  };

  // === RESPOSTA DE UMA PERGUNTA ===
  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    // atualiza estado de respostas
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer.value },
    }));

    setSelectedAnswer(answer);
    setSoundTrigger("answer_select");

    // número da pergunta atual (antes de ir para a próxima)
    const qIndex = quizState.currentScreen || 1;

    // tracking do funil
    t.trackAnswerSubmitted(qIndex, questionId, answer.value);
    trackQuizProgress(qIndex, quizState.manifestationProfile);

    // efeitos visuais/sons por pergunta
    if (questionId === "primary_desire") {
      setTimeout(() => {
        setSoundTrigger("revelation");
        setShowRevelation(true);
      }, 1000);
    } else if (questionId === "manifestation_frequency") {
      setTimeout(() => {
        setSoundTrigger("pattern_detected");
        setShowPattern(true);
        const newAnswers = { ...quizState.answers, [questionId]: answer.value };
        const pattern = getPatternText(newAnswers);
        trackPatternRevealed(pattern);
      }, 1000);
    } else if (questionId === "main_block") {
      setTimeout(() => {
        setShowPreEmail(true);
      }, 1000);
    }
  };

  // === CONTINUAÇÕES ENTRE TELAS ===
  const continueFromRevelation = () => {
    setShowRevelation(false);
    setQuizState((prev) => ({ ...prev, currentScreen: 2 }));
    t.trackQuestionShown(2);
  };

  const continueFromPattern = () => {
    setShowPattern(false);
    setQuizState((prev) => ({ ...prev, currentScreen: 3 }));
    t.trackQuestionShown(3);
  };

  const continueFromPreEmail = () => {
    setShowPreEmail(false);
    setQuizState((prev) => ({ ...prev, currentScreen: 4 }));
    // view de tela de captura (Meta Pixel)
    trackViewContent({
      content_name: "Email Collection Screen",
      content_category: "Lead Generation",
      value: 18,
    });
  };

  // === ENVIO DE EMAIL + NOME (LEAD) ===
  const submitEmailAndName = async (email: string, name: string) => {
    try {
      // atualiza estado local
      setQuizState((prev) => ({ ...prev, email, name }));

      // calcula perfil com as respostas atuais
      const profile = getManifestationProfile(quizState.answers);

      // grava no Sheets (Apps Script) — 1 chamada resolve tudo
      await t.trackEmailSubmitted(email, name, profile.title, quizState.answers);

      // marketing pixels (opcional)
      trackLead({
        content_name: "Manifestation Quiz Lead",
        value: 18,
        currency: "USD",
        custom_data: { email, name, quiz_type: "manifestation" },
      });
      trackCompleteRegistration?.({}); // se existir na sua lib

      // feedback UI
      const readinessScore = 75; // ajuste se tiver fórmula real
      toast({
        title: "Success!",
        description: "Your manifestation profile has been revealed!",
      });
      setSoundTrigger("email_success");

      // mostra resultado (e marca no funil)
      setTimeout(() => {
        setSoundTrigger("final_reveal");
        setQuizState((prev) => ({
          ...prev,
          currentScreen: 5,
          manifestationProfile: profile.title,
          readinessScore,
        }));
        t.trackResultShown(profile.title);
        // se você considera o resultado como fim do funil:
        t.trackCompleteQuiz();
      }, 1000);
    } catch (error) {
      console.error("❌ Error on emailSubmitted:", error);
      // segue o fluxo mesmo se a chamada falhar
      const profile = getManifestationProfile(quizState.answers);
      setQuizState((prev) => ({
        ...prev,
        currentScreen: 5,
        manifestationProfile: profile.title,
        readinessScore: 75,
      }));
      t.trackResultShown(profile.title);
      t.trackCompleteQuiz();
    }
  };

  // === UTILS DE UI/CONTEÚDO ===
  const getCurrentQuestion = () => {
    const questionIndex = quizState.currentScreen - 1;
    return quizQuestions[questionIndex];
  };

  const getRevelationText = () => {
    if (!selectedAnswer) return "";
    const questionId = getCurrentQuestion()?.id;
    const revelationFn = revelationTexts[questionId as keyof typeof revelationTexts];
    return revelationFn ? revelationFn(selectedAnswer.value) : "";
  };

  const getPatternDescription = () => {
    return getPatternText(quizState.answers);
  };

  const getFinalProfile = () => {
    return getManifestationProfile(quizState.answers);
  };

  // === CTA FINAL (sem abrir VSL no quiz; link vai por e-mail) ===
  const handleContinueToVSL = () => {
    // Só feedback + marca conclusão
    toast({
      title: "Confira seu e-mail 📬",
      description: "Enviamos o link do vídeo para o seu e-mail.",
    });
    t.trackCompleteQuiz();
    // Se quiser acionar algum pixel de intenção:
    trackInitiateCheckout?.({
      content_name: "Affiliate Product",
      value: 18,
      currency: "USD",
      custom_data: { source: "quiz_completion" },
    });
  };

  const handleDiscoveryUnlock = (discovery: any) => {
    setCurrentDiscovery(discovery);
    setSoundTrigger("achievement");
  };

  const closeDiscovery = () => setCurrentDiscovery(null);
  const clearSoundTrigger = () => setSoundTrigger(null);

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

    handleContinueToVSL, // mantém para compatibilidade com UI
    handleDiscoveryUnlock,
    closeDiscovery,
    clearSoundTrigger,
  };
};
