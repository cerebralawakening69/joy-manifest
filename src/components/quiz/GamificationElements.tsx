import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Discovery {
  id: string;
  title: string;
  unlocked: boolean;
}

interface GamificationElementsProps {
  currentScreen: number;
  answers: Record<string, string>;
  onDiscoveryUnlock?: (discovery: Discovery) => void;
}

export const GamificationElements = ({ 
  currentScreen, 
  answers, 
  onDiscoveryUnlock 
}: GamificationElementsProps) => {
  const [giftProgress, setGiftProgress] = useState(0);
  const [showGiftEarned, setShowGiftEarned] = useState(false);

  useEffect(() => {
    let newProgress = 0;
    
    // Simple progress tracking
    if (Object.keys(answers).length >= 1) newProgress = 25;
    if (Object.keys(answers).length >= 2) newProgress = 50;
    if (Object.keys(answers).length >= 3) newProgress = 75;
    if (currentScreen === 4) newProgress = 85;
    if (currentScreen === 5) {
      newProgress = 100;
      if (!showGiftEarned) {
        setShowGiftEarned(true);
        onDiscoveryUnlock?.({
          id: "gift_earned",
          title: "$18 GIFT EARNED",
          unlocked: true
        });
      }
    }

    setGiftProgress(newProgress);
  }, [currentScreen, answers, showGiftEarned, onDiscoveryUnlock]);

  // Only show if there's progress and not yet complete
  if (giftProgress === 0 || giftProgress === 100) return null;

  return (
    <div className="fixed top-4 right-2 sm:top-6 sm:right-6 z-40">
      <Card className="p-2 sm:p-3 bg-background/80 backdrop-blur-sm border border-golden/30 shadow-lg max-w-[140px] sm:max-w-none">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-base sm:text-lg">🎁</div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Gift Progress</div>
            <div className="text-xs sm:text-sm font-semibold text-golden">{giftProgress}%</div>
          </div>
        </div>
        
        {/* Subtle progress bar */}
        <div className="w-full bg-muted/50 rounded-full h-1 mt-2">
          <div 
            className="bg-gradient-to-r from-golden to-energy-pink h-1 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${giftProgress}%` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default GamificationElements;