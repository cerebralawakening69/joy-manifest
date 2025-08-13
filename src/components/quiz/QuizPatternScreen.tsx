import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { SparkleEffect } from "./SparkleEffect";

interface QuizPatternScreenProps {
  pattern: string;
  onContinue: () => void;
  currentScreen: number;
}

export const QuizPatternScreen = ({ pattern, onContinue, currentScreen }: QuizPatternScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-4 sm:p-6 md:p-8 bg-card border-2 border-energy-pink animate-glow text-center">
          <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 animate-float">🌀</div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-energy-pink leading-tight">
            ALARMING PATTERN DETECTED!
          </h2>
          
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-foreground">
            {pattern} = <span className="text-golden font-bold">RARE COMBINATION!</span>
          </p>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Only <span className="text-energy-pink font-bold">11%</span> have this pattern...
          </p>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 animate-pulse-glow bg-energy-pink text-primary-foreground hover:bg-energy-pink/90 w-full sm:w-auto touch-manipulation"
          >
            UNCOVER MY PATTERN →
          </Button>
        </Card>
      </div>
    </div>
  );
};