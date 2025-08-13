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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-8 bg-card border-2 border-energy-pink animate-glow text-center">
          <div className="text-4xl mb-6 animate-float">🌀</div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-energy-pink">
            ALARMING PATTERN DETECTED!
          </h2>
          
          <p className="text-xl mb-8 text-foreground">
            {pattern} = <span className="text-golden font-bold">RARE COMBINATION!</span>
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Only <span className="text-energy-pink font-bold">11%</span> have this pattern...
          </p>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className="text-xl px-8 py-4 animate-pulse-glow bg-energy-pink text-primary-foreground hover:bg-energy-pink/90"
          >
            UNCOVER MY PATTERN →
          </Button>
        </Card>
      </div>
    </div>
  );
};