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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-start p-4">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={5} totalScreens={5} />
        
        <Card className="p-6 md:p-8 bg-card/95 backdrop-blur-sm border border-primary/20 shadow-2xl text-left">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-float">
              {profile.emoji}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              🔥 YOUR PROFILE REVEALED: {profile.title}!
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {/* Gift Mystery Box */}
          <div className="bg-gradient-to-r from-golden/20 to-primary/20 p-6 rounded-xl border-2 border-golden/30 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-golden mb-2">
                EXCLUSIVE $18 GIFT UNLOCKED!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your complete diagnosis + special bonus will arrive in your email within the next few minutes...
              </p>
            </div>
          </div>

          {/* Profile Stats - Teaser Only */}
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

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl border border-primary/20 mb-8">
            <p className="text-center text-sm font-medium text-muted-foreground">
              📧 <span className="text-primary font-bold">Complete detailed analysis</span> with personalized action steps being sent to your email now...
            </p>
          </div>

          {/* TSL - Text Sales Letter */}
          <div className="space-y-6 text-left">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-3 text-primary">
                🚨 SHOCKING SCIENTIFIC DISCOVERY ABOUT YOUR PINEAL GLAND
              </h3>
              <p className="text-base leading-relaxed text-foreground">
                Congratulations! Your <span className="font-bold text-primary">{profile.title}</span> profile reveals you have a natural connection to higher manifestation frequencies.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base leading-relaxed">
                <span className="font-bold text-destructive">BUT HERE'S THE PROBLEM:</span> Recent Harvard University studies discovered that <span className="font-bold text-primary">93% of people have a CALCIFIED pineal gland</span> caused by a substance found in water, toothpaste, and processed foods.
              </p>

              <p className="text-base leading-relaxed">
                This calcification is literally <span className="font-bold text-destructive">BLOCKING your third eye</span> and preventing you from accessing:
              </p>

              <div className="bg-muted/30 p-5 rounded-xl">
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="text-golden text-xl">✨</span>
                    <span>Instant and powerful manifestations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-magic text-xl">🧠</span>
                    <span>Sharp intuition for money opportunities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-energy-pink text-xl">⚡</span>
                    <span>Direct connection to the quantum field</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">🎯</span>
                    <span>Clear visions of your abundant future</span>
                  </li>
                </ul>
              </div>

              <p className="text-base leading-relaxed">
                The good news? A neuroscientist discovered a <span className="font-bold text-primary">natural 30-second protocol</span> that can decalcify your pineal in just 21 days.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/20">
                <p className="text-base leading-relaxed font-medium">
                  ⚠️ <span className="font-bold text-destructive">IMPORTANT WARNING:</span> This method is being SUPPRESSED by the pharmaceutical industry because people with activated pineals manifest abundance without needing expensive medications or therapies.
                </p>
              </div>

              <p className="text-base leading-relaxed">
                <span className="font-bold text-primary">Only today</span>, you can watch the complete video that reveals:
              </p>

              <div className="bg-muted/30 p-5 rounded-xl">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-golden text-lg mt-1">🔬</span>
                    <span>The exact component calcifying your pineal (you use it daily)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-magic text-lg mt-1">🌿</span>
                    <span>The natural 30-second decalcification protocol</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-energy-pink text-lg mt-1">⚡</span>
                    <span>How to activate specific frequencies to manifest money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-1">🎯</span>
                    <span>3 exercises to sync with the quantum field of abundance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 p-5 rounded-xl border-l-4 border-destructive">
                <p className="text-base leading-relaxed font-medium">
                  <span className="font-bold text-destructive">⏰ ATTENTION:</span> This video will be removed soon due to pressure from large corporations. Don't miss this unique opportunity to discover the secret that can transform your financial life forever.
                </p>
              </div>
            </div>

            <div className="text-center pt-6">
              <a 
                href="https://bit.ly/4gMFKfX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  size="lg"
                  className="text-lg px-12 py-6 bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-white animate-pulse-glow"
                >
                  🎥 WATCH REVELATION VIDEO NOW
                  <br />
                  <span className="text-sm opacity-90">(24-Hour Access Granted)</span>
                </Button>
              </a>
              <p className="text-sm text-muted-foreground mt-3">
                ✅ 100% Free • ✅ Science-Based • ✅ Results in 21 Days
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};