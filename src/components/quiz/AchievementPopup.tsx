import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleEffect } from "./SparkleEffect";

interface Discovery {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

interface DiscoveryPopupProps {
  discovery: Discovery | null;
  onClose: () => void;
}

export const AchievementPopup = ({ discovery, onClose }: DiscoveryPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (discovery) {
      setIsVisible(true);
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [discovery]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!discovery) return null;

  const getDiscoveryMessage = () => {
    switch (discovery.id) {
      case "desire_revealed":
        return "Your deepest manifestation desire has been revealed! This is the first key to unlocking your hidden power...";
      case "frequency_detected":
        return "Your unique pineal frequency detected! Scientists say this frequency determines 73% of manifestation success...";
      case "blockage_identified":
        return "Major blockage identified! This discovery reveals what's been preventing your manifestations from working...";
      case "profile_unlocked":
        return "Complete profile unlocked! You now have access to your personalized manifestation blueprint...";
      case "gift_earned":
        return "🎁 CONGRATULATIONS! You've earned the mysterious $18 gift that will arrive in your email within minutes!";
      default:
        return discovery.description;
    }
  };

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
          <div className="text-6xl mb-4 animate-float">
            {discovery.emoji}
          </div>
          
          <h3 className="text-2xl font-bold text-golden mb-2 animate-pulse-glow">
            {discovery.id === "gift_earned" ? "GIFT UNLOCKED!" : "DISCOVERY MADE!"}
          </h3>
          
          <h4 className="text-xl font-bold text-primary mb-4">
            {discovery.title}
          </h4>
          
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            {getDiscoveryMessage()}
          </p>
          
          {discovery.id === "gift_earned" && (
            <div className="mb-6 p-4 bg-gradient-to-r from-energy-pink/20 to-golden/20 rounded-lg border border-golden">
              <div className="text-2xl font-bold text-energy-pink animate-pulse">
                $18 MYSTERIOUS GIFT
              </div>
              <div className="text-sm text-golden">
                ✨ Check your email in a few minutes ✨
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleClose}
            className="bg-gradient-to-r from-golden to-energy-pink text-primary-foreground font-bold px-6 py-2 animate-pulse-glow"
          >
            {discovery.id === "gift_earned" ? "CLAIM MY GIFT →" : "CONTINUE DISCOVERY →"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AchievementPopup;