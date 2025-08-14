import { useEffect } from "react";
import { useQuizLogic } from "@/hooks/useQuizLogic";
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
    handleContinueToVSL,
    handleDiscoveryUnlock,
    closeDiscovery,
    clearSoundTrigger,
    trackPageView,
    trackEmailScreenReached,
    trackResultViewed
  } = useQuizLogic();

  // Track page view on mount - only once per session
  useEffect(() => {
    const hasTrackedPageView = sessionStorage.getItem('page_view_tracked');
    
    if (!hasTrackedPageView) {
      console.log('🔄 First page view, tracking...');
      trackPageView();
      sessionStorage.setItem('page_view_tracked', 'true');
    } else {
      console.log('✅ Page view already tracked this session');
    }
  }, []);

  // Track email screen reached
  useEffect(() => {
    if (quizState.currentScreen === 4) {
      trackEmailScreenReached();
    }
  }, [quizState.currentScreen, trackEmailScreenReached]);

  // Track result viewed
  useEffect(() => {
    if (quizState.currentScreen === 5) {
      trackResultViewed();
    }
  }, [quizState.currentScreen, trackResultViewed]);

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
          <QuizHookScreen onStart={startQuiz} />
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
        console.log('🔥 ManifestationQuiz rendering question:', { currentScreen: quizState.currentScreen, question: question?.id });
        if (!question) {
          console.error('🔥 NO QUESTION FOUND for screen:', quizState.currentScreen);
          return null;
        }

        return (
          <div key={`question-${quizState.currentScreen}`} className="animate-fade-in">
            <QuizQuestionScreen
              question={question}
              currentScreen={quizState.currentScreen}
              onAnswer={(answer) => {
                console.log('🔥 ManifestationQuiz onAnswer called:', { questionId: question.id, answer: answer.value });
                handleAnswer(question.id, answer);
              }}
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
          <QuizResultScreen
            profile={getFinalProfile()}
            onContinue={handleContinueToVSL}
          />
        </div>
      )}
    </div>
  );
};

export default ManifestationQuiz;