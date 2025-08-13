import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { FloatingParticles } from "./FloatingParticles";
import { QuizAnswer } from "@/types/quiz";

interface QuizRevelationScreenProps {
  selectedAnswer: QuizAnswer;
  revelationText: string;
  onContinue: () => void;
  currentScreen: number;
}

export const QuizRevelationScreen = ({ 
  selectedAnswer, 
  revelationText, 
  onContinue, 
  currentScreen 
}: QuizRevelationScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-8 bg-card border-2 border-primary animate-glow text-center">
          <div className="text-6xl mb-6 animate-float">
            {selectedAnswer.emoji}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
            {revelationText}
          </h2>
          
          <div className="mb-8 text-lg text-muted-foreground">
            This reveals something <span className="text-golden font-bold">POWERFUL</span> about your manifestation energy...
          </div>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className="text-xl px-8 py-4 animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90"
          >
            DISCOVER THE SECRET →
          </Button>
        </Card>
      </div>
    </div>
  );
};