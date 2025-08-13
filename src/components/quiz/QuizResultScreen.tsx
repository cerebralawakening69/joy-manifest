import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { SparkleEffect } from "./SparkleEffect";
import { ManifestationProfile } from "@/types/quiz";

interface QuizResultScreenProps {
  profile: ManifestationProfile;
  onContinue: () => void;
}

export const QuizResultScreen = ({ profile, onContinue }: QuizResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={5} totalScreens={5} />
        
        <Card className="p-8 bg-card border-2 border-primary animate-glow text-center">
          <div className="text-6xl mb-6 animate-float">
            {profile.emoji}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            🔥 YOUR TRUE POWER: {profile.title}!
          </h2>
          
          <div className="grid gap-4 mb-8 text-left">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Your Money Desire:</span>
              <span className="text-golden font-bold">{profile.details.desire}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Your Manifestation Frequency:</span>
              <span className="text-purple-magic font-bold">{profile.details.frequency}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Your Main Block:</span>
              <span className="text-energy-pink font-bold">{profile.details.mainBlock}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-golden">THE SHOCKING TRUTH ABOUT YOUR POWER:</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Your {profile.title} pattern is <span className="text-primary font-bold">EXACTLY</span> what creates your power... 
              BUT it's also what creates your specific block!
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className="text-xl px-8 py-4 animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90"
          >
            DISCOVER THE 30-SECOND METHOD →
          </Button>
        </Card>
      </div>
    </div>
  );
};