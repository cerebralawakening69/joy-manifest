// src/pages/ManifestationQuiz.tsx
import { useEffect, useCallback } from "react";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { api, getSessionId } from "@/integrations/backend/client";
import { QuizHookScreen } from "@/components/quiz/QuizHookScreen";
import { QuizQuestionScreen } from "@/components/quiz/QuizQuestionScreen";
import { QuizRevelationScreen } from "@/components/quiz/QuizRevelationScreen";
import { QuizPatternScreen } from "@/components/quiz/QuizPatternScreen";
import { QuizEmailScreen } from "@/components/quiz/QuizEmailScreen";
import { QuizPreEmailScreen } from "@/components/quiz/QuizPreEmailScreen";
import { QuizResultScreen } from "@/components/quiz/QuizResultScreen";
import { GamificationElements } from "@/components/quiz/GamificationElements";
import { AchievementPopup } from "@/components/quiz/AchievementPopup";
import { SoundEffects } from "@/components/quiz/SoundEffects";

const ManifestationQuiz = () => {
  const {
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
    handleDiscoveryUnlock,
    closeDiscovery,
    clearSoundTrigger
  } = useQuizLogic();

  // ✅ LANDING: registra entrada no funil
  useEffect(() => {
    const sid = getSessionId(); // cria/pega um session_id estável

    const p = new URLSearchParams(window.location.search);
    const variant = p.get("var") || p.get("flow") || "A";

    api.landing({
      session_id: sid,
      variant,
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_content: p.get("utm_content") || "",
      utm_term: p.get("utm_term") || "",
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
    });
  }, []);

  // ✅ COMEÇOU O QUIZ: chama API e depois inicia fluxo
  const handleStart = useCallback(() => {
    try {
      api.startQuiz({ session_id: getSessionId() });
    } catch {}
    startQuiz();
  }, [startQuiz]);

  return (
    <div className="relative min-h-screen">
      {/* Gamification Elements */}
      {quizState.currentScreen > 0 && (
        <GamificationElements 
          currentScreen={quizState.currentScreen}
          answers={quizState.answers}
          onDiscoveryUnlock={handleDiscoveryUnlock}
        />
      )}
      
      {/* Sound Effects */}
      <SoundEffects 
        trigger={soundTrigger}
        onComplete={clearSoundTrigger}
      />
      
      {/* Discovery Popup */}
      <AchievementPopup 
        discovery={currentDiscovery}
        onClose={closeDiscovery}
      />

      {/* Hook Screen */}
      {quizState.currentScreen === 0 && !showRevelation && !showPattern && !showPreEmail && (
        <div key="hook-screen" className="animate-fade-in">
          <QuizHookScreen onStart={handleStart} />
        </div>
      )}

      {/* Revelation Screen */}
      {showRevelation && selectedAnswer && (
        <div key="revelation-screen" className="animate-fade-in">
          <QuizRevelationScreen
            selectedAnswer={selectedAnswer}
            revelationText={getRevelationText()}
            onContinue={continueFromRevelation}
            currentScreen={1.5}
          />
        </div>
      )}

      {/* Pattern Recognition Screen */}
      {showPattern && (
        <div key="pattern-screen" className="animate-fade-in">
          <QuizPatternScreen
            pattern={getPatternDescription()}
            onContinue={continueFromPattern}
            currentScreen={2.5}
          />
        </div>
      )}

      {/* Pre-Email Warning Screen */}
      {showPreEmail && (
        <div key="pre-email-screen" className="animate-fade-in">
          <QuizPreEmailScreen
            onContinue={continueFromPreEmail}
            currentScreen={3.5}
          />
        </div>
      )}

      {/* Question Screens */}
      {quizState.currentScreen >= 1 && quizState.currentScreen <= 3 && !showRevelation && !showPattern && !showPreEmail && (() => {
        const question = getCurrentQuestion();
        if (!question) return null;

        return (
          <div key={`question-${quizState.currentScreen}`} className="animate-fade-in">
            <QuizQuestionScreen
              question={question}
              currentScreen={quizState.currentScreen}
              onAnswer={(answer) => handleAnswer(question.id, answer)}
            />
          </div>
        );
      })()}

      {/* Email Capture Screen */}
      {quizState.currentScreen === 4 && !showRevelation && !showPattern && !showPreEmail && (
        <div key="email-screen" className="animate-fade-in">
          <QuizEmailScreen
            onSubmit={submitEmailAndName}
            currentScreen={quizState.currentScreen}
          />
        </div>
      )}

      {/* Result Screen */}
      {quizState.currentScreen === 5 && !showRevelation && !showPattern && !showPreEmail && (
        <div key="result-screen" className="animate-fade-in">
          <QuizResultScreen profile={getFinalProfile()} />
        </div>
      )}
    </div>
  );
};

export default ManifestationQuiz;
