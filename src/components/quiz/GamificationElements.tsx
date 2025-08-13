import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparkleEffect } from "./SparkleEffect";

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

interface GamificationElementsProps {
  currentScreen: number;
  answers: Record<string, string>;
  onAchievementUnlock?: (achievement: Achievement) => void;
}

export const GamificationElements = ({ 
  currentScreen, 
  answers, 
  onAchievementUnlock 
}: GamificationElementsProps) => {
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_choice",
      title: "AWAKENING BEGINS",
      description: "Made your first conscious choice",
      emoji: "⚡",
      unlocked: false
    },
    {
      id: "pattern_detected",
      title: "PATTERN MASTER",
      description: "Revealed your unique frequency pattern",
      emoji: "🌀",
      unlocked: false
    },
    {
      id: "truth_seeker",
      title: "TRUTH SEEKER",
      description: "Discovered your primary manifestation block",
      emoji: "🔍",
      unlocked: false
    },
    {
      id: "email_warrior",
      title: "COMMITMENT WARRIOR",
      description: "Committed to your transformation journey",
      emoji: "⚔️",
      unlocked: false
    },
    {
      id: "manifestor_revealed",
      title: "MANIFESTOR REVEALED",
      description: "Unlocked your complete manifestation profile",
      emoji: "👑",
      unlocked: false
    }
  ]);

  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    const newAchievements = [...achievements];
    let newPoints = points;
    let comboBonus = 0;

    // Check for new achievements
    if (Object.keys(answers).length >= 1 && !achievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      newPoints += 100;
      comboBonus += 1;
      onAchievementUnlock?.(newAchievements[0]);
    }

    if (Object.keys(answers).length >= 2 && !achievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      newPoints += 200;
      comboBonus += 1;
      onAchievementUnlock?.(newAchievements[1]);
    }

    if (Object.keys(answers).length >= 3 && !achievements[2].unlocked) {
      newAchievements[2].unlocked = true;
      newPoints += 300;
      comboBonus += 1;
      onAchievementUnlock?.(newAchievements[2]);
    }

    if (currentScreen === 4 && !achievements[3].unlocked) {
      newAchievements[3].unlocked = true;
      newPoints += 500;
      comboBonus += 1;
      onAchievementUnlock?.(newAchievements[3]);
    }

    if (currentScreen === 5 && !achievements[4].unlocked) {
      newAchievements[4].unlocked = true;
      newPoints += 1000;
      comboBonus += 1;
      onAchievementUnlock?.(newAchievements[4]);
    }

    // Combo system
    if (comboBonus > 0) {
      const newCombo = combo + comboBonus;
      setCombo(newCombo);
      setShowCombo(true);
      
      // Combo bonus points
      if (newCombo >= 3) newPoints += newCombo * 50;
      
      setTimeout(() => setShowCombo(false), 3000);
    }

    setAchievements(newAchievements);
    setPoints(newPoints);
  }, [currentScreen, answers]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const completionPercentage = (unlockedAchievements.length / achievements.length) * 100;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* Points Display */}
      <Card className="p-3 bg-gradient-to-r from-golden/20 to-energy-pink/20 border-golden animate-pulse-glow">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-golden">⚡</span>
          <div>
            <div className="text-sm font-bold text-golden">{points.toLocaleString()} POWER</div>
            <div className="text-xs text-muted-foreground">{Math.round(completionPercentage)}% Unlocked</div>
          </div>
        </div>
      </Card>

      {/* Combo Display */}
      {showCombo && combo > 1 && (
        <Card className="p-2 bg-gradient-to-r from-energy-pink to-primary border-energy-pink animate-bounce">
          <div className="text-center">
            <div className="text-lg font-bold text-white">COMBO x{combo}!</div>
            <div className="text-xs text-white/80">+{combo * 50} Bonus Points!</div>
          </div>
          <SparkleEffect />
        </Card>
      )}

      {/* Recent Achievement */}
      {unlockedAchievements.length > 0 && (
        <Card className="p-2 bg-gradient-to-r from-primary/20 to-golden/20 border-primary max-w-[200px]">
          <div className="text-center">
            <div className="text-lg">{unlockedAchievements[unlockedAchievements.length - 1].emoji}</div>
            <div className="text-xs font-bold text-primary">
              {unlockedAchievements[unlockedAchievements.length - 1].title}
            </div>
          </div>
        </Card>
      )}

      {/* Achievement Badges */}
      <div className="flex flex-wrap gap-1 max-w-[200px]">
        {achievements.map((achievement) => (
          <Badge
            key={achievement.id}
            variant={achievement.unlocked ? "default" : "secondary"}
            className={`text-xs ${
              achievement.unlocked 
                ? "bg-golden text-primary-foreground animate-glow" 
                : "opacity-30"
            }`}
          >
            {achievement.emoji}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default GamificationElements;