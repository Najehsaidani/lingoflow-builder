import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, BookOpen } from "lucide-react";

interface LanguageCardProps {
  language: string;
  nativeLanguage: string;
  difficulty: string;
  learners: string;
  lessons: number;
  image: string;
  onStart: () => void;
}

export const LanguageCard = ({ 
  language, 
  nativeLanguage, 
  difficulty, 
  learners, 
  lessons, 
  image,
  onStart 
}: LanguageCardProps) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={image} 
              alt={`${language} course`}
              className="w-16 h-16 rounded-lg object-cover shadow-soft"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-accent text-white text-xs px-2 py-1 rounded-full font-medium">
              {difficulty}
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {language}
              </h3>
              <p className="text-sm text-muted-foreground">for {nativeLanguage} speakers</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {learners}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {lessons} lessons
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-secondary-soft text-secondary font-medium">
                <Trophy className="h-3 w-3 mr-1" />
                Popular
              </Badge>
              
              <Button 
                onClick={onStart}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Start Course
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};