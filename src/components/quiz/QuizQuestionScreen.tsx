import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { SparkleEffect } from "./SparkleEffect";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";

interface QuizQuestionScreenProps {
  question: QuizQuestion;
  currentScreen: number;
  onAnswer: (answer: QuizAnswer) => void;
}

export const QuizQuestionScreen = ({ question, currentScreen, onAnswer }: QuizQuestionScreenProps) => {
  const progressValue = (currentScreen / 5) * 100;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-4 sm:p-6 md:p-8 bg-card border-2 border-border animate-glow">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-foreground leading-tight">
            {question.question}
          </h2>
          
          <div className="grid gap-3 sm:gap-4 md:gap-6">
            {question.answers.map((answer, index) => (
              <Button
                key={answer.id}
                onClick={() => onAnswer(answer)}
                variant="outline"
                size="xl"
                className="p-3 sm:p-4 md:p-6 text-left justify-start h-auto min-h-[64px] sm:min-h-[72px] border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 animate-slide-up w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0 leading-none">{answer.emoji}</span>
                <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-left flex-1 break-words">
                  {answer.text}
                </span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};