import { QuizQuestion, ManifestationProfile } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_desire",
    question: "🚨 SHOCKING TRUTH: 99% of people DON'T know their BIGGEST energetic blockage... Which area of your life do you MOST desire to transform RIGHT NOW?",
    answers: [
      { id: "money", text: "💰 Abundant money flowing naturally", emoji: "💰", value: "money" },
      { id: "love", text: "❤️ Dream relationship magnetizing", emoji: "❤️", value: "love" },
      { id: "health", text: "🌟 Vibrant health & unlimited energy", emoji: "🌟", value: "health" },
      { id: "purpose", text: "🎯 Crystal-clear life purpose & power", emoji: "🎯", value: "purpose" }
    ]
  },
  {
    id: "manifestation_frequency",
    question: "⚡ REVELATION: There's a specific FREQUENCY that activates your pineal gland... How often do you feel 'connected' to your inner power?",
    answers: [
      { id: "daily", text: "🔄 Every day (high energy)", emoji: "🔄", value: "daily" },
      { id: "weekly", text: "📅 A few times per week", emoji: "📅", value: "weekly" },
      { id: "rarely", text: "⚡ Rarely (but when it happens it's INTENSE)", emoji: "⚡", value: "rarely" },
      { id: "never", text: "🚫 Almost never... I feel blocked", emoji: "🚫", value: "never" }
    ]
  },
  {
    id: "main_block",
    question: "🔥 FINAL TEST: Scientists discovered that 1 SUBSTANCE is calcifying your pineal gland and BLOCKING 90% of your potential... What do you feel PREVENTS you most from manifesting?",
    answers: [
      { id: "beliefs", text: "🧠 Deep limiting beliefs", emoji: "🧠", value: "beliefs" },
      { id: "knowledge", text: "📚 Lack of the right method", emoji: "📚", value: "knowledge" },
      { id: "fear", text: "😨 Fear of my own power", emoji: "😨", value: "fear" },
      { id: "toxins", text: "☠️ Toxins blocking my pineal", emoji: "☠️", value: "toxins" }
    ]
  }
];

export const revelationTexts: Record<string, (value: string) => string> = {
  primary_desire: (value: string) => {
    const texts = {
      money: "💰 INTERESTING... You chose MONEY! This reveals your pineal is EXACTLY on the abundance frequency... BUT something is BLOCKING it...",
      love: "❤️ FASCINATING... You chose LOVE! Your heart energy is ACTIVE, but your pineal needs CLEANSING to magnetize...",
      health: "🌟 INCREDIBLE... You chose HEALTH! Your intuition is guiding you to what matters most... your pineal KNOWS the secret...",
      purpose: "🎯 POWERFUL... You chose PURPOSE! Your soul is calling... but calcifications are SILENCING your inner voice..."
    };
    return texts[value as keyof typeof texts] || texts.money;
  },
  manifestation_frequency: (value: string) => {
    const texts = {
      daily: "🔄 IMPRESSIVE! Daily energy means your pineal is ALMOST unblocked... just 1 STEP missing...",
      weekly: "📅 REVEALING! Your fluctuations show you HAVE the power... but something is INTERFERING with the connection...",
      rarely: "⚡ SHOCKING! These intense moments prove your pineal is WORKING... but it's 90% BLOCKED...",
      never: "🚫 CRUCIAL! Feeling blocked is the FIRST sign of severe calcification... but this HAS a solution..."
    };
    return texts[value as keyof typeof texts] || texts.daily;
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