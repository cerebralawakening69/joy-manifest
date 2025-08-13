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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onSubmit(email, name);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-8 bg-card border-2 border-golden animate-glow text-center">
          <div className="text-4xl mb-6 animate-float">🎁</div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-golden">
            YOUR $18 GIFT IS READY!
          </h2>
          
          <p className="text-lg mb-8 text-muted-foreground">
            Your complete manifestation diagnosis + our bestselling book 
            <span className="text-golden font-bold"> 'The Manifestation Code'</span> ($18 value) are waiting!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <Label htmlFor="name" className="text-foreground">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 border-2 border-input focus:border-primary"
                required
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-2 border-input focus:border-primary"
                required
              />
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full text-xl py-4 animate-pulse-glow bg-golden text-primary-foreground hover:bg-golden/90"
              disabled={!email || !name}
            >
              CLAIM MY $18 GIFT →
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-6">
            🔒 100% private. Unsubscribe anytime.
          </p>
        </Card>
      </div>
    </div>
  );
};