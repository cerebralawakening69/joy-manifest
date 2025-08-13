import { QuizQuestion, ManifestationProfile } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_desire",
    question: "💫 What is your DEEPEST DESIRE right now? What do you want to transform most in your life?",
    answers: [
      { id: "money", text: "💰 Financial abundance and true freedom", emoji: "💰", value: "money" },
      { id: "love", text: "❤️ Find or improve my soulmate connection", emoji: "❤️", value: "love" },
      { id: "health", text: "🌟 Radiant health and limitless energy", emoji: "🌟", value: "health" },
      { id: "purpose", text: "🎯 Discover my life purpose and live with passion", emoji: "🎯", value: "purpose" }
    ]
  },
  {
    id: "manifestation_frequency",
    question: "😔 What FRUSTRATES you most about your current reality?",
    answers: [
      { id: "stuck", text: "🔒 I feel trapped in the same patterns", emoji: "🔒", value: "stuck" },
      { id: "effort", text: "😤 I work hard but see no real results", emoji: "😤", value: "effort" },
      { id: "direction", text: "🌀 I'm confused about which path to take", emoji: "🌀", value: "direction" },
      { id: "doubt", text: "❓ I fear I'm not capable of achieving my dreams", emoji: "❓", value: "doubt" }
    ]
  },
  {
    id: "main_block",
    question: "🔮 What do you believe is BLOCKING your breakthrough?",
    answers: [
      { id: "beliefs", text: "🧠 Limiting beliefs about what's possible for me", emoji: "🧠", value: "beliefs" },
      { id: "knowledge", text: "📚 I don't know the right method or system", emoji: "📚", value: "knowledge" },
      { id: "fear", text: "😨 Fear of failure or being judged", emoji: "😨", value: "fear" },
      { id: "energy", text: "⚡ Lack of energy and motivation to persist", emoji: "⚡", value: "energy" }
    ]
  }
];

export const revelationTexts: Record<string, (value: string) => string> = {
  primary_desire: (value: string) => {
    const texts = {
      money: "💰 FASCINATING... You chose ABUNDANCE! This reveals you're operating on a prosperity frequency...",
      love: "❤️ INCREDIBLE... You chose LOVE! Your heart is calling for deeper connection, but something is blocking the flow...",
      health: "🌟 POWERFUL... You chose VITALITY! Your intuition is guiding you toward what matters most...",
      purpose: "🎯 REVEALING... You chose PURPOSE! Your soul is calling... but something is muffling your inner voice..."
    };
    return texts[value as keyof typeof texts] || texts.money;
  },
  manifestation_frequency: (value: string) => {
    const texts = {
      stuck: "🔒 I UNDERSTAND... Feeling trapped is more common than you think... but there IS a way out...",
      effort: "😤 I RECOGNIZE THIS... You're working hard, but there's something you haven't discovered yet...",
      direction: "🌀 I SEE... Clarity will come when you align with your true path...",
      doubt: "❓ THIS IS NORMAL... Fear is just a signal that something BIG is about to shift in your life..."
    };
    return texts[value as keyof typeof texts] || texts.stuck;
  }
};

export const getManifestationProfile = (answers: Record<string, string>): ManifestationProfile => {
  const { primary_desire, manifestation_frequency, main_block } = answers;
  
  // Calculate readiness score based on new answer values
  let readinessScore = 0;
  if (manifestation_frequency === "effort") readinessScore += 40;
  else if (manifestation_frequency === "stuck") readinessScore += 30;
  else if (manifestation_frequency === "direction") readinessScore += 25;
  else readinessScore += 20;
  
  if (main_block === "knowledge") readinessScore += 30;
  else if (main_block === "beliefs") readinessScore += 25;
  else if (main_block === "fear") readinessScore += 20;
  else readinessScore += 15;
  
  if (primary_desire === "money") readinessScore += 30;
  else readinessScore += 25;
  
  // Determine profile based on primary desire and frustration
  const profileKey = `${primary_desire}_${manifestation_frequency}`;
  
  const profiles: Record<string, ManifestationProfile> = {
    money_stuck: {
      title: "PROSPERITY ARCHITECT",
      description: "You have the blueprint for wealth but need the right activation sequence",
      emoji: "💰",
      details: {
        desire: "Abundance-Focused",
        frequency: "Pattern-Breaking",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    money_effort: {
      title: "WEALTH FREQUENCY SHIFTER",
      description: "You're working hard but need to align with the prosperity codes",
      emoji: "⚡",
      details: {
        desire: "Financial Freedom", 
        frequency: "High-Effort",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    love_direction: {
      title: "HEART CONNECTION NAVIGATOR",
      description: "Your heart knows the way, but your mind needs clarity",
      emoji: "❤️",
      details: {
        desire: "Soul Connection",
        frequency: "Seeking Direction", 
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    health_doubt: {
      title: "VITALITY BREAKTHROUGH SEEKER",
      description: "Your body is ready for transformation, but doubt clouds your power",
      emoji: "🌟",
      details: {
        desire: "Radiant Health",
        frequency: "Overcoming Doubt",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    },
    purpose_direction: {
      title: "SOUL PURPOSE DECODER",
      description: "Your purpose is calling, but the signals need fine-tuning",
      emoji: "🎯",
      details: {
        desire: "Life Purpose",
        frequency: "Seeking Clarity",
        mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
      }
    }
  };
  
  return profiles[profileKey] || {
    title: "REALITY ARCHITECT",
    description: "You have a rare combination that makes you a powerful creator",
    emoji: "🔮",
    details: {
      desire: primary_desire.charAt(0).toUpperCase() + primary_desire.slice(1),
      frequency: manifestation_frequency.charAt(0).toUpperCase() + manifestation_frequency.slice(1).replace('_', ' '),
      mainBlock: main_block.charAt(0).toUpperCase() + main_block.slice(1)
    }
  };
};

export const getPatternText = (answers: Record<string, string>): string => {
  const { primary_desire, manifestation_frequency } = answers;
  return `${primary_desire.toUpperCase()} + ${manifestation_frequency.toUpperCase()} FREQUENCY`;
};