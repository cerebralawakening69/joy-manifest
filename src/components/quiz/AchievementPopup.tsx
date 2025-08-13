import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleEffect } from "./SparkleEffect";

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!achievement) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <Card className={`p-8 bg-gradient-to-br from-golden/20 to-energy-pink/20 border-2 border-golden text-center max-w-md transform transition-all duration-300 ${
        isVisible ? 'scale-100 animate-glow' : 'scale-75'
      }`}>
        <SparkleEffect />
        
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce">
            {achievement.emoji}
          </div>
          
          <h3 className="text-2xl font-bold text-golden mb-2 animate-pulse-glow">
            ACHIEVEMENT UNLOCKED!
          </h3>
          
          <h4 className="text-xl font-bold text-primary mb-3">
            {achievement.title}
          </h4>
          
          <p className="text-muted-foreground mb-6">
            {achievement.description}
          </p>
          
          <div className="mb-6">
            <div className="text-3xl font-bold text-energy-pink animate-pulse">
              +{achievement.id === 'manifestor_revealed' ? '1000' : 
                 achievement.id === 'email_warrior' ? '500' :
                 achievement.id === 'truth_seeker' ? '300' :
                 achievement.id === 'pattern_detected' ? '200' : '100'} POWER!
            </div>
            <div className="text-sm text-golden">
              ⚡ Energy Level Increased ⚡
            </div>
          </div>
          
          <Button 
            onClick={handleClose}
            className="bg-gradient-to-r from-golden to-energy-pink text-primary-foreground font-bold px-6 py-2 animate-pulse-glow"
          >
            CONTINUE THE JOURNEY →
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AchievementPopup;