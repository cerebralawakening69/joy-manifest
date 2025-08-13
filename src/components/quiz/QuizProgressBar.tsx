import { Progress } from "@/components/ui/progress";

interface QuizProgressBarProps {
  currentScreen: number;
  totalScreens: number;
}

export const QuizProgressBar = ({ currentScreen, totalScreens }: QuizProgressBarProps) => {
  const progress = (currentScreen / totalScreens) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6 sm:mb-8">
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 sm:h-3 bg-muted border border-border animate-pulse-glow"
      />
    </div>
  );
};