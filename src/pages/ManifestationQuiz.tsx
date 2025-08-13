import { useQuizLogic } from "@/hooks/useQuizLogic";
import { QuizHookScreen } from "@/components/quiz/QuizHookScreen";
import { QuizQuestionScreen } from "@/components/quiz/QuizQuestionScreen";
import { QuizRevelationScreen } from "@/components/quiz/QuizRevelationScreen";
import { QuizPatternScreen } from "@/components/quiz/QuizPatternScreen";
import { QuizEmailScreen } from "@/components/quiz/QuizEmailScreen";
import { QuizResultScreen } from "@/components/quiz/QuizResultScreen";
import { GamificationElements } from "@/components/quiz/GamificationElements";
import { AchievementPopup } from "@/components/quiz/AchievementPopup";
import { SoundEffects } from "@/components/quiz/SoundEffects";

const ManifestationQuiz = () => {
  const {
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
  } = useQuizLogic();

  return (
    <div className="relative">
      {/* Gamification Elements */}
      <GamificationElements 
        currentScreen={quizState.currentScreen}
        answers={quizState.answers}
        onDiscoveryUnlock={handleDiscoveryUnlock}
      />
      
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
      {quizState.currentScreen === 0 && (
        <QuizHookScreen onStart={startQuiz} />
      )}

      {/* Revelation Screen */}
      {showRevelation && selectedAnswer && (
        <QuizRevelationScreen
          selectedAnswer={selectedAnswer}
          revelationText={getRevelationText()}
          onContinue={continueFromRevelation}
          currentScreen={1.5}
        />
      )}

      {/* Pattern Recognition Screen */}
      {showPattern && (
        <QuizPatternScreen
          pattern={getPatternDescription()}
          onContinue={continueFromPattern}
          currentScreen={2.5}
        />
      )}

      {/* Question Screens */}
      {quizState.currentScreen >= 1 && quizState.currentScreen <= 3 && (() => {
        const question = getCurrentQuestion();
        if (!question) return null;

        return (
          <QuizQuestionScreen
            question={question}
            currentScreen={quizState.currentScreen}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
          />
        );
      })()}

      {/* Email Capture Screen */}
      {quizState.currentScreen === 4 && (
        <QuizEmailScreen
          onSubmit={submitEmailAndName}
          currentScreen={quizState.currentScreen}
        />
      )}

      {/* Result Screen */}
      {quizState.currentScreen === 5 && (
        <QuizResultScreen
          profile={getFinalProfile()}
          onContinue={handleContinueToVSL}
        />
      )}
    </div>
  );
};

export default ManifestationQuiz;