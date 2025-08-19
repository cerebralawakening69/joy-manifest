import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { FloatingParticles } from "./FloatingParticles";

interface QuizPreEmailScreenProps {
  onContinue: () => void;
  currentScreen: number;
}

export const QuizPreEmailScreen = ({ onContinue, currentScreen }: QuizPreEmailScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      <FloatingParticles />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-6 sm:p-8 md:p-10 bg-card border-2 border-golden animate-glow text-center">
          <div className="text-6xl sm:text-7xl mb-6 animate-bounce">
            🎯
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-golden leading-tight">
            YOU'RE JUST 1 STEP AWAY
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-primary leading-tight">
            FROM YOUR MYSTERIOUS GIFT!
          </h1>
          
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-semibold text-primary mb-2">
                ✨ Your Personal Manifestation Blueprint
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover exactly how YOU can manifest faster than 97% of people
              </p>
            </div>
            
            <div className="bg-golden/10 border border-golden/20 rounded-lg p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-semibold text-golden mb-2">
                🎁 Secret Material + Mysterious $18 Gift
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Exclusive content that's never been shared publicly before
              </p>
            </div>
          </div>
          
          <div className="bg-accent/20 border border-accent rounded-lg p-4 sm:p-5 mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-foreground">
              📧 <strong>We need your email to unlock:</strong>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Your personalized profile + secret $18 manifestation gift that others pay hundreds for
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            size="xl"
            className="w-full font-bold text-base sm:text-lg"
          >
            UNLOCK MY $18 GIFT NOW 🎁
          </Button>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-4">
            ⏰ Limited time offer - thousands have claimed theirs
          </p>
        </Card>
      </div>
    </div>
  );
};
