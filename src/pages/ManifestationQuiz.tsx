import { useQuizLogic } from "@/hooks/useQuizLogic";
import { QuizHookScreen } from "@/components/quiz/QuizHookScreen";
import { QuizQuestionScreen } from "@/components/quiz/QuizQuestionScreen";
import { QuizRevelationScreen } from "@/components/quiz/QuizRevelationScreen";
import { QuizPatternScreen } from "@/components/quiz/QuizPatternScreen";
import { QuizEmailScreen } from "@/components/quiz/QuizEmailScreen";
import { QuizResultScreen } from "@/components/quiz/QuizResultScreen";

const ManifestationQuiz = () => {
  const {
    quizState,
    showRevelation,
    showPattern,
    selectedAnswer,
    startQuiz,
    handleAnswer,
    continueFromRevelation,
    continueFromPattern,
    submitEmailAndName,
    getCurrentQuestion,
    getRevelationText,
    getPatternDescription,
    getFinalProfile,
    handleContinueToVSL
  } = useQuizLogic();

  // Hook Screen
  if (quizState.currentScreen === 0) {
    return <QuizHookScreen onStart={startQuiz} />;
  }

  // Revelation Screen
  if (showRevelation && selectedAnswer) {
    return (
      <QuizRevelationScreen
        selectedAnswer={selectedAnswer}
        revelationText={getRevelationText()}
        onContinue={continueFromRevelation}
        currentScreen={1.5}
      />
    );
  }

  // Pattern Recognition Screen
  if (showPattern) {
    return (
      <QuizPatternScreen
        pattern={getPatternDescription()}
        onContinue={continueFromPattern}
        currentScreen={2.5}
      />
    );
  }

  // Question Screens
  if (quizState.currentScreen >= 1 && quizState.currentScreen <= 3) {
    const question = getCurrentQuestion();
    if (!question) return null;

    return (
      <QuizQuestionScreen
        question={question}
        currentScreen={quizState.currentScreen}
        onAnswer={(answer) => handleAnswer(question.id, answer)}
      />
    );
  }

  // Email Capture Screen
  if (quizState.currentScreen === 4) {
    return (
      <QuizEmailScreen
        onSubmit={submitEmailAndName}
        currentScreen={quizState.currentScreen}
      />
    );
  }

  // Result Screen
  if (quizState.currentScreen === 5) {
    return (
      <QuizResultScreen
        profile={getFinalProfile()}
        onContinue={handleContinueToVSL}
      />
    );
  }

  return null;
};

export default ManifestationQuiz;