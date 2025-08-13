import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparkleEffect } from "./SparkleEffect";

interface Discovery {
  id: string;
  title: string;
  description: string;
  emoji: string;
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
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [discoveries, setDiscoveries] = useState<Discovery[]>([
    {
      id: "desire_revealed",
      title: "DESIRE REVEALED",
      description: "Your deepest manifestation desire uncovered",
      emoji: "🔮",
      unlocked: false
    },
    {
      id: "frequency_detected",
      title: "FREQUENCY DETECTED", 
      description: "Your unique pineal frequency discovered",
      emoji: "⚡",
      unlocked: false
    },
    {
      id: "blockage_identified",
      title: "BLOCKAGE IDENTIFIED",
      description: "Your manifestation block identified", 
      emoji: "🧠",
      unlocked: false
    },
    {
      id: "profile_unlocked",
      title: "PROFILE UNLOCKED",
      description: "Complete manifestation profile revealed",
      emoji: "👁️",
      unlocked: false
    },
    {
      id: "gift_earned",
      title: "$18 GIFT EARNED",
      description: "Mysterious gift unlocked for your journey",
      emoji: "🎁",
      unlocked: false
    }
  ]);

  const [giftProximity, setGiftProximity] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const newDiscoveries = [...discoveries];
    let newLevel = consciousnessLevel;
    let newProximity = giftProximity;

    // Check for new discoveries
    if (Object.keys(answers).length >= 1 && !discoveries[0].unlocked) {
      newDiscoveries[0].unlocked = true;
      newLevel = 25;
      newProximity = 20;
      onDiscoveryUnlock?.(newDiscoveries[0]);
    }

    if (Object.keys(answers).length >= 2 && !discoveries[1].unlocked) {
      newDiscoveries[1].unlocked = true;
      newLevel = 50;
      newProximity = 40;
      onDiscoveryUnlock?.(newDiscoveries[1]);
    }

    if (Object.keys(answers).length >= 3 && !discoveries[2].unlocked) {
      newDiscoveries[2].unlocked = true;
      newLevel = 75;
      newProximity = 60;
      onDiscoveryUnlock?.(newDiscoveries[2]);
    }

    if (currentScreen === 4 && !discoveries[3].unlocked) {
      newDiscoveries[3].unlocked = true;
      newLevel = 90;
      newProximity = 80;
      onDiscoveryUnlock?.(newDiscoveries[3]);
    }

    if (currentScreen === 5 && !discoveries[4].unlocked) {
      newDiscoveries[4].unlocked = true;
      newLevel = 100;
      newProximity = 100;
      setShowPulse(true);
      onDiscoveryUnlock?.(newDiscoveries[4]);
    }

    setDiscoveries(newDiscoveries);
    setConsciousnessLevel(newLevel);
    setGiftProximity(newProximity);
  }, [currentScreen, answers]);

  const unlockedDiscoveries = discoveries.filter(d => d.unlocked);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {/* Consciousness Level */}
      <Card className="p-4 bg-gradient-to-br from-primary/20 to-golden/20 border-primary animate-glow">
        <div className="text-center">
          <div className="text-sm font-bold text-golden mb-1">CONSCIOUSNESS</div>
          <div className="text-2xl font-bold text-primary">{consciousnessLevel}%</div>
          <div className="text-xs text-muted-foreground">AWAKENED</div>
          
          {/* Consciousness bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-primary to-golden h-2 rounded-full transition-all duration-1000 animate-pulse-glow"
              style={{ width: `${consciousnessLevel}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Gift Proximity */}
      {giftProximity > 0 && (
        <Card className={`p-3 bg-gradient-to-br from-energy-pink/20 to-golden/20 border-energy-pink ${
          showPulse ? 'animate-bounce' : 'animate-glow'
        }`}>
          <div className="text-center">
            <div className="text-lg mb-1">🎁</div>
            <div className="text-sm font-bold text-energy-pink">$18 GIFT</div>
            <div className="text-xs text-muted-foreground">{giftProximity}% Unlocked</div>
            
            {giftProximity === 100 && (
              <div className="text-xs text-golden font-bold mt-1 animate-pulse">
                ✨ EARNED! ✨
              </div>
            )}
          </div>
          {showPulse && <SparkleEffect />}
        </Card>
      )}

      {/* Latest Discovery */}
      {unlockedDiscoveries.length > 0 && (
        <Card className="p-3 bg-gradient-to-br from-golden/10 to-primary/10 border-golden max-w-[220px]">
          <div className="text-center">
            <div className="text-2xl mb-1">
              {unlockedDiscoveries[unlockedDiscoveries.length - 1].emoji}
            </div>
            <div className="text-xs font-bold text-golden mb-1">
              JUST DISCOVERED
            </div>
            <div className="text-xs text-primary font-semibold">
              {unlockedDiscoveries[unlockedDiscoveries.length - 1].title}
            </div>
          </div>
        </Card>
      )}

      {/* Discovery Progress */}
      <div className="flex flex-col gap-1">
        {discoveries.map((discovery, index) => (
          <Badge
            key={discovery.id}
            variant={discovery.unlocked ? "default" : "secondary"}
            className={`text-xs px-2 py-1 ${
              discovery.unlocked 
                ? "bg-gradient-to-r from-golden to-energy-pink text-primary-foreground animate-glow border-golden" 
                : "opacity-20 bg-muted"
            }`}
          >
            {discovery.emoji} {discovery.unlocked ? "✓" : "○"}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default GamificationElements;