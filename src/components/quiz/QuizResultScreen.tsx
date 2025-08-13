import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { SparkleEffect } from "./SparkleEffect";
import { ManifestationProfile } from "@/types/quiz";

interface QuizResultScreenProps {
  profile: ManifestationProfile;
  onContinue: () => void;
}

export const QuizResultScreen = ({ profile, onContinue }: QuizResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-start p-4">
      <SparkleEffect />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={5} totalScreens={5} />
        
        <Card className="p-6 md:p-8 bg-card/95 backdrop-blur-sm border border-primary/20 shadow-2xl text-left">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-float">
              {profile.emoji}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              🔥 SEU PERFIL REVELADO: {profile.title}!
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {/* Profile Stats */}
          <div className="grid gap-3 mb-8">
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Seu Foco Principal:</span>
              <span className="text-golden font-bold">{profile.details.desire}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Sua Frequência:</span>
              <span className="text-purple-magic font-bold">{profile.details.frequency}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-primary/10">
              <span className="font-medium text-muted-foreground">Seu Principal Bloqueio:</span>
              <span className="text-energy-pink font-bold">{profile.details.mainBlock}</span>
            </div>
          </div>

          {/* TSL - Text Sales Letter */}
          <div className="space-y-6 text-left">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-3 text-primary">
                🚨 DESCOBERTA CIENTÍFICA CHOCANTE SOBRE SUA GLÂNDULA PINEAL
              </h3>
              <p className="text-base leading-relaxed text-foreground">
                Parabéns! Seu perfil <span className="font-bold text-primary">{profile.title}</span> revela que você possui uma conexão natural com frequências superiores de manifestação.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base leading-relaxed">
                <span className="font-bold text-destructive">MAS AQUI ESTÁ O PROBLEMA:</span> Recentes estudos da Universidade de Harvard descobriram que <span className="font-bold text-primary">93% das pessoas têm a glândula pineal CALCIFICADA</span> por uma substância encontrada na água, pasta de dente e alimentos processados.
              </p>

              <p className="text-base leading-relaxed">
                Essa calcificação está literalmente <span className="font-bold text-destructive">BLOQUEANDO seu terceiro olho</span> e impedindo que você acesse:
              </p>

              <div className="bg-muted/30 p-5 rounded-xl">
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="text-golden text-xl">✨</span>
                    <span>Manifestações instantâneas e poderosas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-magic text-xl">🧠</span>
                    <span>Intuição aguçada para oportunidades de dinheiro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-energy-pink text-xl">⚡</span>
                    <span>Conexão direta com o campo quântico</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">🎯</span>
                    <span>Visões claras do seu futuro abundante</span>
                  </li>
                </ul>
              </div>

              <p className="text-base leading-relaxed">
                A boa notícia? Um neurocientista descobriu um <span className="font-bold text-primary">protocolo natural de 30 segundos</span> que pode descalcificar sua pineal em apenas 21 dias.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/20">
                <p className="text-base leading-relaxed font-medium">
                  ⚠️ <span className="font-bold text-destructive">AVISO IMPORTANTE:</span> Este método está sendo SUPRIMIDO pela indústria farmacêutica porque pessoas com a pineal ativada manifestam abundância sem precisar de medicamentos ou terapias caras.
                </p>
              </div>

              <p className="text-base leading-relaxed">
                <span className="font-bold text-primary">Apenas hoje</span>, você pode assistir ao vídeo completo que revela:
              </p>

              <div className="bg-muted/30 p-5 rounded-xl">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-golden text-lg mt-1">🔬</span>
                    <span>O componente exato que está calcificando sua pineal (você usa todo dia)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-magic text-lg mt-1">🌿</span>
                    <span>O protocolo natural de descalcificação de 30 segundos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-energy-pink text-lg mt-1">⚡</span>
                    <span>Como ativar frequências específicas para manifestar dinheiro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-1">🎯</span>
                    <span>3 exercícios para sincronizar com o campo quântico da abundância</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 p-5 rounded-xl border-l-4 border-destructive">
                <p className="text-base leading-relaxed font-medium">
                  <span className="font-bold text-destructive">⏰ ATENÇÃO:</span> Este vídeo será removido em breve devido à pressão de grandes corporações. Não perca esta oportunidade única de descobrir o segredo que pode transformar sua vida financeira para sempre.
                </p>
              </div>
            </div>

            <div className="text-center pt-6">
              <Button 
                onClick={onContinue}
                size="lg"
                className="text-lg px-12 py-6 bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-white animate-pulse-glow"
              >
                🎥 ASSISTIR VÍDEO REVELAÇÃO AGORA
                <br />
                <span className="text-sm opacity-90">(Acesso Liberado por 24h)</span>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                ✅ 100% Gratuito • ✅ Baseado em Ciência • ✅ Resultados em 21 Dias
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};