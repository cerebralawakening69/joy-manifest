import { QuizQuestion, ManifestationProfile } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_desire",
    question: "If you could change ONE thing instantly, what would it be?",
    answers: [
      { id: "money", text: "Bank account", emoji: "💰", value: "money" },
      { id: "love", text: "True love", emoji: "❤️", value: "love" },
      { id: "health", text: "Perfect health", emoji: "🌟", value: "health" },
      { id: "purpose", text: "Life purpose", emoji: "🎯", value: "purpose" }
    ]
  },
  {
    id: "manifestation_frequency",
    question: "How often do you try to manifest?",
    answers: [
      { id: "daily", text: "Daily", emoji: "🔄", value: "daily" },
      { id: "weekly", text: "Weekly", emoji: "📅", value: "weekly" },
      { id: "rarely", text: "Rarely", emoji: "⚡", value: "rarely" },
      { id: "never", text: "Never", emoji: "🚫", value: "never" }
    ]
  },
  {
    id: "main_block",
    question: "What's STOPPING your manifestation most?",
    answers: [
      { id: "beliefs", text: "Limiting beliefs", emoji: "🧠", value: "beliefs" },
      { id: "knowledge", text: "Lack of knowledge", emoji: "📚", value: "knowledge" },
      { id: "fear", text: "Fear", emoji: "😨", value: "fear" },
      { id: "all", text: "All of the above", emoji: "⚡", value: "all" }
    ]
  }
];

export const revelationTexts: Record<string, (value: string) => string> = {
  primary_desire: (value: string) => {
    const texts = {
      money: "💰 INTERESTING... You chose MONEY! This reveals something DEEP about your soul...",
      love: "❤️ FASCINATING... You chose LOVE! This reveals something POWERFUL about your heart...",
      health: "🌟 AMAZING... You chose HEALTH! This reveals something VITAL about your energy...",
      purpose: "🎯 INCREDIBLE... You chose PURPOSE! This reveals something SACRED about your mission..."
    };
    return texts[value as keyof typeof texts] || texts.money;
  }
};

export const getManifestationProfile = (answers: Record<string, string>): ManifestationProfile => {
  const { primary_desire, manifestation_frequency, main_block } = answers;
  
  // Calculate readiness score
  let readinessScore = 0;
  if (manifestation_frequency === "daily") readinessScore += 40;
  else if (manifestation_frequency === "weekly") readinessScore += 30;
  else if (manifestation_frequency === "rarely") readinessScore += 20;
  else readinessScore += 10;
  
  if (main_block === "knowledge") readinessScore += 30;
  else if (main_block === "beliefs") readinessScore += 25;
  else if (main_block === "fear") readinessScore += 20;
  else readinessScore += 15;
  
  if (primary_desire === "money") readinessScore += 30;
  else readinessScore += 25;
  
  // Determine profile based on primary desire and frequency
  const profileKey = `${primary_desire}_${manifestation_frequency}`;
  
  const profiles: Record<string, ManifestationProfile> = {
    money_daily: {
      title: "ABUNDANCE MAGNET",
      description: "You have strong financial manifestation energy with consistent practice",
      emoji: "💰",
      details: {
        desire: "Strong",
        frequency: "Daily",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    money_rarely: {
      title: "WEALTH AWAKENER",
      description: "You have dormant financial power waiting to be unleashed",
      emoji: "⚡",
      details: {
        desire: "Strong", 
        frequency: "Rare",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    love_daily: {
      title: "LOVE CREATOR",
      description: "You consistently work on manifesting heart-centered desires",
      emoji: "❤️",
      details: {
        desire: "Love-Focused",
        frequency: "Daily", 
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    health_weekly: {
      title: "VITALITY BUILDER",
      description: "You regularly focus on manifesting optimal health and energy",
      emoji: "🌟",
      details: {
        desire: "Health-Focused",
        frequency: "Weekly",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    }
  };
  
  return profiles[profileKey] || {
    title: "MANIFESTATION PIONEER",
    description: "You have unique manifestation patterns that set you apart",
    emoji: "🔮",
    details: {
      desire: primary_desire.charAt(0).toUpperCase() + primary_desire.slice(1),
      frequency: manifestation_frequency.charAt(0).toUpperCase() + manifestation_frequency.slice(1),
      mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
    }
  };
};

export const getPatternText = (answers: Record<string, string>): string => {
  const { primary_desire, manifestation_frequency } = answers;
  return `${primary_desire.toUpperCase()} + ${manifestation_frequency.toUpperCase()}`;
};