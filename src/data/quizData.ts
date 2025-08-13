import { QuizQuestion, ManifestationProfile } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_desire",
    question: "🚨 VERDADE CHOCANTE: 99% das pessoas NÃO sabem qual é o seu MAIOR BLOQUEIO energético... Qual dessas áreas da sua vida você mais DESEJA transformar AGORA?",
    answers: [
      { id: "money", text: "💰 Dinheiro abundante fluindo naturalmente", emoji: "💰", value: "money" },
      { id: "love", text: "❤️ Relacionamento dos sonhos magnetizando", emoji: "❤️", value: "love" },
      { id: "health", text: "🌟 Saúde vibrante e energia ilimitada", emoji: "🌟", value: "health" },
      { id: "purpose", text: "🎯 Propósito de vida cristalino e poderoso", emoji: "🎯", value: "purpose" }
    ]
  },
  {
    id: "manifestation_frequency",
    question: "⚡ REVELAÇÃO: Existe uma FREQUÊNCIA específica que ativa sua glândula pineal... Com que frequência você sente que está 'conectado' com seu poder interior?",
    answers: [
      { id: "daily", text: "🔄 Todos os dias (energia alta)", emoji: "🔄", value: "daily" },
      { id: "weekly", text: "📅 Algumas vezes por semana", emoji: "📅", value: "weekly" },
      { id: "rarely", text: "⚡ Raramente (mas quando acontece é INTENSO)", emoji: "⚡", value: "rarely" },
      { id: "never", text: "🚫 Quase nunca... sinto bloqueado", emoji: "🚫", value: "never" }
    ]
  },
  {
    id: "main_block",
    question: "🔥 ÚLTIMO TESTE: Cientistas descobriram que 1 SUBSTÂNCIA está calcificando sua glândula pineal e BLOQUEANDO 90% do seu potencial... O que você sente que mais te IMPEDE de manifestar?",
    answers: [
      { id: "beliefs", text: "🧠 Crenças limitantes profundas", emoji: "🧠", value: "beliefs" },
      { id: "knowledge", text: "📚 Falta do método correto", emoji: "📚", value: "knowledge" },
      { id: "fear", text: "😨 Medo do próprio poder", emoji: "😨", value: "fear" },
      { id: "toxins", text: "☠️ Toxinas bloqueando minha pineal", emoji: "☠️", value: "toxins" }
    ]
  }
];

export const revelationTexts: Record<string, (value: string) => string> = {
  primary_desire: (value: string) => {
    const texts = {
      money: "💰 INTERESSANTE... Você escolheu DINHEIRO! Isso revela que sua pineal está EXATAMENTE na frequência da abundância... MAS há algo BLOQUEANDO...",
      love: "❤️ FASCINANTE... Você escolheu AMOR! Sua energia do coração está ATIVA, mas sua pineal precisa de LIMPEZA para magnetizar...",
      health: "🌟 INCRÍVEL... Você escolheu SAÚDE! Sua intuição está te guiando para o que mais importa... sua pineal SABE o segredo...",
      purpose: "🎯 PODEROSO... Você escolheu PROPÓSITO! Sua alma está chamando... mas calcificações estão SILENCIANDO sua voz interior..."
    };
    return texts[value as keyof typeof texts] || texts.money;
  },
  manifestation_frequency: (value: string) => {
    const texts = {
      daily: "🔄 IMPRESSIONANTE! Energia diária significa que sua pineal está QUASE desbloqueada... falta apenas 1 PASSO...",
      weekly: "📅 REVELADOR! Suas oscilações mostram que você TEM o poder... mas algo está INTERFERINDO na conexão...",
      rarely: "⚡ CHOCANTE! Esses momentos intensos provam que sua pineal está FUNCIONANDO... mas está 90% BLOQUEADA...",
      never: "🚫 CRUCIAL! Sentir-se bloqueado é o PRIMEIRO sinal de calcificação severa... mas isso TEM solução..."
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