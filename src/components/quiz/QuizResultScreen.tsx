import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { SparkleEffect } from "./SparkleEffect";
import { ManifestationProfile } from "@/types/quiz";

interface QuizResultScreenProps {
  profile: ManifestationProfile;
}

export const QuizResultScreen = ({ profile }: QuizResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-start p-4">
      <SparkleEffect />

      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={5} totalScreens={5} />

        <Card className="p-6 md:p-8 bg-card/95 backdrop-blur-sm border border-primary/20 shadow-2xl text-left">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-float">{profile.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              🔥 YOUR PROFILE REVEALED: {profile.title}!
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          {/* Profile summary (teaser only) */}
          <div className="grid gap-3 mb-8">
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Primary Focus:</span>
              <span className="text-golden font-bold">{profile.details.desire}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Energy Frequency:</span>
              <span className="text-purple-magic font-bold">{profile.details.frequency}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Main Block:</span>
              <span className="text-energy-pink font-bold">{profile.details.mainBlock}</span>
            </div>
          </div>

          {/* Email nudge */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
            <p className="text-center text-base font-medium">
              📧 Your complete analysis + personalized steps have been sent to your email.
              <br />
              <span className="text-muted-foreground text-sm">
                Check your inbox (and spam/promotions) in the next minutes.
              </span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
