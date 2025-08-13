import { QuizQuestion, ManifestationProfile } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_desire",
    question: "💭 Qual é o seu MAIOR SONHO neste momento? O que você mais deseja transformar na sua vida?",
    answers: [
      { id: "money", text: "💰 Ter abundância financeira e liberdade", emoji: "💰", value: "money" },
      { id: "love", text: "❤️ Encontrar ou melhorar meu relacionamento", emoji: "❤️", value: "love" },
      { id: "health", text: "🌟 Ter mais saúde e energia", emoji: "🌟", value: "health" },
      { id: "purpose", text: "🎯 Descobrir meu propósito e viver com paixão", emoji: "🎯", value: "purpose" }
    ]
  },
  {
    id: "manifestation_frequency",
    question: "😔 Qual é a sua MAIOR DOR ou frustração atualmente?",
    answers: [
      { id: "stuck", text: "🔒 Me sinto preso(a) na mesma situação", emoji: "🔒", value: "stuck" },
      { id: "effort", text: "😤 Trabalho muito mas não vejo resultados", emoji: "😤", value: "effort" },
      { id: "direction", text: "🌀 Não sei que direção seguir", emoji: "🌀", value: "direction" },
      { id: "doubt", text: "❓ Tenho medo de não conseguir", emoji: "❓", value: "doubt" }
    ]
  },
  {
    id: "main_block",
    question: "🔥 O que você acredita que mais te IMPEDE de alcançar seus objetivos?",
    answers: [
      { id: "beliefs", text: "🧠 Crenças limitantes sobre mim mesmo", emoji: "🧠", value: "beliefs" },
      { id: "knowledge", text: "📚 Não sei o método certo", emoji: "📚", value: "knowledge" },
      { id: "fear", text: "😨 Medo de fracassar ou de julgar", emoji: "😨", value: "fear" },
      { id: "energy", text: "⚡ Falta de energia e motivação", emoji: "⚡", value: "energy" }
    ]
  }
];

export const revelationTexts: Record<string, (value: string) => string> = {
  primary_desire: (value: string) => {
    const texts = {
      money: "💰 INCRÍVEL... Você escolheu ABUNDÂNCIA! Isso revela que sua energia está EXATAMENTE na frequência da prosperidade...",
      love: "❤️ FASCINANTE... Você escolheu AMOR! Sua energia do coração está ATIVA, mas algo está interferindo...",
      health: "🌟 PODEROSO... Você escolheu SAÚDE! Sua intuição está te guiando para o que mais importa...",
      purpose: "🎯 REVELADOR... Você escolheu PROPÓSITO! Sua alma está chamando... mas algo está bloqueando sua voz interior..."
    };
    return texts[value as keyof typeof texts] || texts.money;
  },
  manifestation_frequency: (value: string) => {
    const texts = {
      stuck: "🔒 EU ENTENDO... Sentir-se preso é mais comum do que você imagina... Há uma saída...",
      effort: "😤 RECONHEÇO ISSO... Você está se esforçando, mas há algo que você ainda não descobriu...",
      direction: "🌀 COMPREENDO... A clareza virá quando você alinhar sua energia interior...",
      doubt: "❓ NORMAL... O medo é só um sinal de que algo GRANDE está para acontecer na sua vida..."
    };
    return texts[value as keyof typeof texts] || texts.stuck;
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