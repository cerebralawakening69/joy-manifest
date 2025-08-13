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
                🔮 WHAT IF EVERYTHING YOU KNEW ABOUT REALITY WAS WRONG?
              </h3>
              <p className="text-base leading-relaxed text-foreground">
                Imagine a tiny, pinecone-shaped gland hidden deep in your brain – no bigger than a pea – that holds the key to unlocking infinite wealth, profound healing, and even psychic abilities. This isn't science fiction. <span className="font-bold text-primary">This is the suppressed truth about your pineal gland</span>… the "third eye" revered by ancient civilizations and hidden in plain sight across sacred sites worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 p-5 rounded-xl border-l-4 border-destructive">
                <p className="text-base leading-relaxed font-medium">
                  <span className="font-bold text-destructive">But here's the shocking part:</span> For decades, this gland has been deliberately calcified and suppressed. Why? Because when activated, it grants you the power to manifest your deepest desires by connecting directly with the universe.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/20">
                <p className="text-base leading-relaxed font-medium">
                  🎯 <span className="font-bold text-primary">The CIA knew this.</span> In a top-secret program called "Project Stargate," government scientists discovered a 30-second method to activate this gland – turning ordinary people into "psychic spies" capable of remote viewing, healing, and bending reality itself. But when they realized how dangerous this knowledge was to the status quo… they buried it.
                </p>
              </div>

              <p className="text-lg font-bold text-center text-primary">
                Now, for the first time, this secret is being revealed.
              </p>

              <div className="bg-muted/30 p-5 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-golden">What You'll Discover in This Groundbreaking Presentation:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-golden text-lg mt-1">⚡</span>
                    <span><span className="font-bold text-purple-magic">The 30-Second Activation:</span> A simple, scientifically-backed method to "switch on" your pineal gland and open your third eye.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive text-lg mt-1">🔍</span>
                    <span><span className="font-bold text-energy-pink">The Hidden Conspiracy:</span> How fluoride, toxins, and government programs have kept your pineal gland dormant – and why they don't want you to know.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-1">🔬</span>
                    <span><span className="font-bold text-golden">Ancient Wisdom Meets Quantum Physics:</span> Why Tesla, the Egyptians, and even the Vatican revered this gland… and how modern science confirms it's a "transceiver" for manifesting reality.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-magic text-lg mt-1">✨</span>
                    <span><span className="font-bold text-primary">Real-Life Transformations:</span> Stories of ordinary people who activated their pineal gland and manifested wealth, soulmates, and miraculous healings.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-golden/20 to-primary/20 p-6 rounded-xl border-2 border-golden/30">
                <p className="text-lg font-bold text-center mb-4 text-golden">
                  This isn't just about abundance. It's about awakening.
                </p>
                <p className="text-base text-center mb-4">When your pineal gland is activated, you'll:</p>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-golden">✅</span>
                    <span>Effortlessly attract wealth and opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-magic">✅</span>
                    <span>Experience profound spiritual clarity and intuition</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-energy-pink">✅</span>
                    <span>Heal your body and mind at a cellular level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary">✅</span>
                    <span>Tap into dimensions where your "ideal life" already exists</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 p-5 rounded-xl border-l-4 border-destructive">
                <p className="text-base leading-relaxed font-medium">
                  <span className="font-bold text-destructive">⏰ But time is running out.</span> The forces that suppressed this knowledge are working harder than ever to keep it hidden. This presentation could be taken down at any moment.
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold mb-2 text-primary">Are You Ready to Unlock Your True Power?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your reality is about to shift. The question is: Will you step into the power you were born with?
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