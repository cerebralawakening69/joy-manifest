import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleEffect } from "./SparkleEffect";

interface Discovery {
  id: string;
  title: string;
  unlocked: boolean;
}

interface DiscoveryPopupProps {
  discovery: Discovery | null;
  onClose: () => void;
}

export const AchievementPopup = ({ discovery, onClose }: DiscoveryPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (discovery?.id === "gift_earned") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [discovery]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!discovery || discovery.id !== "gift_earned") return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <Card className={`p-8 bg-gradient-to-br from-golden/20 to-energy-pink/20 border-2 border-golden text-center max-w-md transform transition-all duration-500 ${
        isVisible ? 'scale-100' : 'scale-90'
      }`}>
        <SparkleEffect />
        
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-float">
            🎁
          </div>
          
          <h3 className="text-2xl font-bold text-golden mb-4">
            CONGRATULATIONS!
          </h3>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-energy-pink/20 to-golden/20 rounded-lg border border-golden">
            <div className="text-xl font-bold text-energy-pink mb-2">
              $18 MYSTERIOUS GIFT EARNED
            </div>
            <div className="text-sm text-muted-foreground">
              Check your email in the next few minutes for your exclusive gift
            </div>
          </div>
          
          <Button 
            onClick={handleClose}
            className="bg-gradient-to-r from-golden to-energy-pink text-primary-foreground font-bold px-6 py-2"
          >
            CONTINUE TO RESULTS →
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AchievementPopup;