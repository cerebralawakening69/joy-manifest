export interface QuizAnswer {
  id: string;
  text: string;
  emoji: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  revelationText?: (answer: QuizAnswer) => string;
}

export interface QuizState {
  currentScreen: number;
  answers: Record<string, string>;
  email: string;
  name: string;
  manifestationProfile: string;
  readinessScore: number;
  quizId?: string;
}

export interface ManifestationProfile {
  title: string;
  description: string;
  emoji: string;
  details: {
    desire: string;
    frequency: string;
    mainBlock: string;
  };
}