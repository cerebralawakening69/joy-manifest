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
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          97% of people <span className="text-destructive font-bold">NEVER</span> discover their true power...
        </p>
        
        <div className="mb-8 p-4 bg-gradient-to-r from-golden/10 to-energy-pink/10 border border-golden/30 rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-lg font-bold text-golden mb-2">🎁 MYSTERIOUS $18 GIFT AWAITS</div>
          <div className="text-sm text-muted-foreground">
            Complete your manifestation profile and receive a <span className="text-energy-pink font-semibold">secret $18 gift</span> in your email within minutes
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="text-xl px-12 py-6 animate-pulse-glow text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 mb-8"
        >
          UNLOCK MY POWER + CLAIM GIFT →
        </Button>
        
        <div className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
          🔒 Takes only 2 minutes • 100% Free • Instant Results + $18 Gift
        </div>
      </div>
    </div>
  );
};