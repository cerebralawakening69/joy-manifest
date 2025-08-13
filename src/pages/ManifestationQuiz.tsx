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
      {quizState.currentScreen === 0 && !showRevelation && !showPattern && (
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

      {/* Question Screens */}
      {quizState.currentScreen >= 1 && quizState.currentScreen <= 3 && !showRevelation && !showPattern && (() => {
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
      {quizState.currentScreen === 4 && !showRevelation && !showPattern && (
        <div key="email-screen" className="animate-fade-in">
          <QuizEmailScreen
            onSubmit={submitEmailAndName}
            currentScreen={quizState.currentScreen}
          />
        </div>
      )}

      {/* Result Screen */}
      {quizState.currentScreen === 5 && !showRevelation && !showPattern && (
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