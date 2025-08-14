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
          
          <div className="grid gap-3 sm:gap-4">
            {question.answers.map((answer, index) => (
              <Button
                key={answer.id}
                onClick={() => onAnswer(answer)}
                variant="outline"
                className="group relative p-4 sm:p-5 text-left justify-start h-auto min-h-[68px] sm:min-h-[76px] border-2 hover:border-primary hover:bg-primary/10 transition-all duration-200 w-full overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s`, animation: 'slide-up 0.5s ease-out both' }}
              >
                <div className="flex items-center w-full gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 leading-none group-hover:scale-110 transition-transform duration-200">
                    {answer.emoji}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-left flex-1 hyphens-auto break-words">
                    {answer.text}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};