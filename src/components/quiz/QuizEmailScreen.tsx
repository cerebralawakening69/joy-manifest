import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizProgressBar } from "./QuizProgressBar";
import { FloatingParticles } from "./FloatingParticles";

interface QuizEmailScreenProps {
  onSubmit: (email: string, name: string) => void;
  currentScreen: number;
}

export const QuizEmailScreen = ({ onSubmit, currentScreen }: QuizEmailScreenProps) => {
  const [showTerms, setShowTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onSubmit(email, name);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-4 sm:p-6 md:p-8 bg-card border-2 border-golden animate-glow text-center">
          <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 animate-float">🎁</div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-golden leading-tight">
            YOUR $18 GIFT IS READY!
          </h2>
          
          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground leading-relaxed px-2">
            Your complete manifestation diagnosis + our bestselling book 
            <span className="text-golden font-bold"> 'The Manifestation Code'</span> ($18 value) are waiting!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="text-left">
              <Label htmlFor="name" className="text-foreground text-sm sm:text-base">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 border-2 border-input focus:border-primary h-12 sm:h-14 text-base touch-manipulation"
                required
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="email" className="text-foreground text-sm sm:text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-2 border-input focus:border-primary h-12 sm:h-14 text-base touch-manipulation"
                required
              />
            </div>
            
            <Button 
              type="submit"
              size="xl"
              className="w-full animate-pulse-glow bg-golden text-primary-foreground hover:bg-golden/90"
              disabled={!email || !name}
            >
              CLAIM MY $18 GIFT →
            </Button>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed -mt-2">
  By submitting, you agree to receive your <span className="font-medium">diagnosis result</span> by email
  and accept our{" "}
  <button
    type="button"
    onClick={() => setShowTerms(true)}
    className="underline underline-offset-4 hover:text-golden"
  >
    Terms of Service
  </button>{" "}
  and{" "}
  <button
    type="button"
    onClick={() => setShowTerms(true)}
    className="underline underline-offset-4 hover:text-golden"
  >
    Privacy Policy
  </button>. You can unsubscribe at any time.
</p>
          </form>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-2">
            🔒 100% private. Unsubscribe anytime.
          </p>
          {/* Modal - Terms */}
{showTerms && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="w-full max-w-2xl rounded-2xl bg-background shadow-xl border border-border">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="text-lg sm:text-xl font-semibold">Terms of Service & Privacy Policy</h3>
        <button
          aria-label="Close"
          onClick={() => setShowTerms(false)}
          className="rounded-full px-3 py-1 text-sm hover:bg-muted"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4 text-sm leading-relaxed">
        <p>
          <strong>Email collection:</strong> we use your email to send your quiz diagnosis result,
          related communications, and supporting materials. You can unsubscribe at any time via the link in our emails.
        </p>
        <p>
          <strong>Legal basis:</strong> your consent. By submitting, you agree to the processing of your data
          for the purposes described here.
        </p>
        <p>
          <strong>Storage:</strong> your data may be processed by our email service and CRM providers, securely.
        </p>
        <p>
          <strong>Your rights:</strong> you can request access, correction, or deletion by replying to any of our emails.
        </p>
        <p>
          <strong>Contact:</strong> questions? Reach us at <a href="mailto:cerebralawakening69@gmail.com" className="underline">cerebralawakening69@gmail.com</a>.
        </p>
      </div>

      <div className="px-5 py-4 border-t flex justify-end gap-2">
        <button
          onClick={() => setShowTerms(false)}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
)}
        </Card>
      </div>
    </div>
  );
};
