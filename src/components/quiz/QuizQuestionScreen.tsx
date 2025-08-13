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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-8 bg-card border-2 border-border animate-glow">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {question.question}
          </h2>
          
          <div className="grid gap-4 md:gap-6">
            {question.answers.map((answer, index) => (
              <Button
                key={answer.id}
                onClick={() => onAnswer(answer)}
                variant="outline"
                size="lg"
                className="p-6 text-left justify-start h-auto border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-2xl mr-4">{answer.emoji}</span>
                <span className="text-lg font-medium">{answer.text}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};