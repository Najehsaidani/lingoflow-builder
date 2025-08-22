import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "./ProgressRing";
import { Heart, Flame, Trophy } from "lucide-react";

interface GameStatsProps {
  xp: number;
  hearts: number;
  streak: number;
  dailyGoal?: number;
  dailyProgress?: number;
}

export const GameStats = ({
  xp,
  hearts,
  streak,
  dailyGoal = 50,
  dailyProgress = 0
}: GameStatsProps) => {
  const dailyPercentage = Math.min((dailyProgress / dailyGoal) * 100, 100);

  return (
    <div className="flex items-center gap-6">
      {/* Daily Goal Progress */}
      <div className="flex flex-col items-center">
        <ProgressRing 
          progress={dailyPercentage} 
          size={60} 
          strokeWidth={6}
          color="hsl(var(--secondary))"
        >
          <div className="text-xs font-semibold text-center">
            <div className="text-secondary">{dailyProgress}</div>
            <div className="text-muted-foreground text-[10px]">/{dailyGoal}</div>
          </div>
        </ProgressRing>
        <span className="text-xs text-muted-foreground mt-1">Daily Goal</span>
      </div>

      {/* Hearts */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`h-5 w-5 ${
                i < hearts 
                  ? "text-hearts fill-hearts" 
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Badge variant="outline" className="text-xs font-semibold">
          {hearts}/5
        </Badge>
      </div>

      {/* XP */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-accent-soft rounded-lg">
          <Trophy className="h-5 w-5 text-accent" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">{xp.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Total XP</span>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-accent rounded-lg shadow-soft">
          <Flame className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">{streak}</span>
          <span className="text-xs text-muted-foreground">Day streak</span>
        </div>
      </div>
    </div>
  );
};