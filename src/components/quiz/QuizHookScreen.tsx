import { Button } from "@/components/ui/button";
import { QuizProgressBar } from "./QuizProgressBar";
import { FloatingParticles } from "./FloatingParticles";

interface QuizHookScreenProps {
  onStart: () => void;
}

export const QuizHookScreen = ({ onStart }: QuizHookScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <FloatingParticles />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={0} totalScreens={5} />
        
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-golden animate-glow">
            🔥 DISCOVER YOUR HIDDEN
          </h1>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-primary animate-glow">
            MANIFESTATION POWER
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          97% of people <span className="text-destructive font-bold">NEVER</span> discover their true power...
        </p>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="text-xl px-12 py-6 animate-pulse-glow text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
        >
          UNLOCK MY POWER →
        </Button>
        
        <div className="mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
          🔒 Takes only 2 minutes • 100% Free • Instant Results
        </div>
      </div>
    </div>
  );
};