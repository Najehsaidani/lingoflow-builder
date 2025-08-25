import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayfulButton } from "@/components/PlayfulButton";
import { Users, BookOpen, Play, Sparkles } from "lucide-react";

interface LanguageCardProps {
  language: string;
  nativeLanguage: string;
  difficulty: string;
  learners: string;
  lessons: number;
  image: string;
  onStart: () => void;
}

export const LanguageCard = ({ language, nativeLanguage, difficulty, learners, lessons, image, onStart }: LanguageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover-lift cursor-pointer group bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 hover:border-primary/20 shadow-soft rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onStart}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={`${language} course`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-white/95 text-primary font-bold border border-primary/20 rounded-full px-3 py-1"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          {difficulty}
        </Badge>
        
        {/* Floating elements for playfulness */}
        <div className="absolute top-6 left-6 w-3 h-3 bg-accent rounded-full animate-float opacity-80" style={{ animationDelay: '0s' }} />
        <div className="absolute top-10 left-10 w-2 h-2 bg-secondary rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
      </div>
      
      <CardHeader className="pb-3 pt-6">
        <CardTitle className="text-2xl font-bold font-fredoka text-gray-800">
          Learn {language}
        </CardTitle>
        <p className="text-base text-muted-foreground font-medium">
          From {nativeLanguage}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-5 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-gray-700">{learners}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-gray-700">{lessons} lessons</span>
          </div>
        </div>
        
        <PlayfulButton 
          variant="primary"
          size="lg"
          icon={Play}
          className="w-full font-fredoka text-lg"
          onClick={() => onStart()}
        >
          Start Course
        </PlayfulButton>
      </CardContent>
    </Card>
  );
};