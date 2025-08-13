import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { FloatingParticles } from "./FloatingParticles";

interface QuizPreEmailScreenProps {
  onContinue: () => void;
  currentScreen: number;
}

export const QuizPreEmailScreen = ({ onContinue, currentScreen }: QuizPreEmailScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      <FloatingParticles />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        <QuizProgressBar currentScreen={currentScreen} totalScreens={5} />
        
        <Card className="p-6 sm:p-8 md:p-10 bg-card border-2 border-golden animate-glow text-center">
          <div className="text-6xl sm:text-7xl mb-6 animate-bounce">
            🎯
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-golden leading-tight">
            VOCÊ ESTÁ A 1 PASSO
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-primary leading-tight">
            DO SEU PRESENTE DE R$97!
          </h1>
          
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-semibold text-primary mb-2">
                ✨ Seu Perfil de Manifestação Personalizado
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Descobriremos exatamente como você pode manifestar mais rapidamente
              </p>
            </div>
            
            <div className="bg-golden/10 border border-golden/20 rounded-lg p-4 sm:p-5">
              <p className="text-lg sm:text-xl font-semibold text-golden mb-2">
                🎁 Material Secreto + Presente Especial
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Conteúdo exclusivo que não está disponível em lugar nenhum
              </p>
            </div>
          </div>
          
          <div className="bg-accent/20 border border-accent rounded-lg p-4 sm:p-5 mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-foreground">
              📧 <strong>Precisamos do seu email para enviar:</strong>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Seu perfil personalizado + material secreto de manifestação
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            size="xl"
            className="w-full font-bold text-base sm:text-lg"
          >
            RECEBER MEU PRESENTE AGORA 🎁
          </Button>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-4">
            ⏰ Oferta por tempo limitado
          </p>
        </Card>
      </div>
    </div>
  );
};