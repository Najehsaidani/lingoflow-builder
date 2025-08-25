import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameStats } from "@/components/GameStats";
import { ProgressRing } from "@/components/ProgressRing";
import { LessonPlayer } from "@/components/LessonPlayer";
import { PlayfulButton } from "@/components/PlayfulButton";
import { 
  BookOpen, 
  Play, 
  Lock, 
  Trophy, 
  Clock, 
  Target,
  CheckCircle2,
  Star
} from "lucide-react";
import achievementImage from "@/assets/achievement-badge.jpg";

const sampleTasks = [
  {
    id: "1",
    type: "multiple-choice" as const,
    question: "How do you say 'Hello' in Spanish?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    correctAnswer: "Hola",
    hint: "This is a common greeting"
  },
  {
    id: "2",
    type: "translate" as const,
    question: "Translate: 'Good morning'",
    correctAnswer: "Buenos días",
    hint: "Think about the time of day"
  },
  {
    id: "3",
    type: "listen" as const,
    question: "Listen and type what you hear:",
    correctAnswer: "Me llamo María",
    hint: "Someone is introducing themselves"
  }
];

export const Dashboard = () => {
  const [showLesson, setShowLesson] = useState(false);
  const [userStats] = useState({
    xp: 2450,
    hearts: 4,
    streak: 7,
    dailyGoal: 50,
    dailyProgress: 35
  });

  const units = [
    {
      id: 1,
      title: "Basic Phrases",
      description: "Essential greetings and common expressions",
      progress: 100,
      lessons: 5,
      completedLessons: 5,
      isUnlocked: true,
      xpReward: 50
    },
    {
      id: 2,
      title: "Family & People",
      description: "Learn about family members and describing people",
      progress: 60,
      lessons: 8,
      completedLessons: 3,
      isUnlocked: true,
      xpReward: 80
    },
    {
      id: 3,
      title: "Food & Dining",
      description: "Order food and talk about meals",
      progress: 0,
      lessons: 6,
      completedLessons: 0,
      isUnlocked: false,
      xpReward: 60
    }
  ];

  if (showLesson) {
    return (
      <LessonPlayer
        lessonTitle="Basic Greetings - Lesson 1"
        tasks={sampleTasks}
        onComplete={(score) => {
          console.log("Lesson completed with score:", score);
          setShowLesson(false);
        }}
        onExit={() => setShowLesson(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-secondary/3">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft border-b-2 border-primary/10">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-fredoka font-bold bg-gradient-primary bg-clip-text text-transparent">
                LingoFlow
              </h1>
              <p className="text-muted-foreground font-medium">Continue your Spanish journey</p>
            </div>
            <GameStats {...userStats} />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Challenge */}
            <Card className="bg-gradient-hero text-white shadow-strong rounded-3xl overflow-hidden relative">
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-6 left-6 w-4 h-4 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-fredoka font-bold mb-3">Daily Challenge</h3>
                    <p className="opacity-90 text-lg">Complete 3 lessons to earn bonus XP!</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing 
                      progress={66} 
                      size={90} 
                      color="white"
                      backgroundColor="rgba(255,255,255,0.2)"
                    >
                      <div className="text-center">
                        <div className="font-bold text-xl">2/3</div>
                        <div className="text-sm opacity-80">lessons</div>
                      </div>
                    </ProgressRing>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Units */}
            <div className="space-y-6">
              <h2 className="text-2xl font-fredoka font-bold text-gray-800">Your Learning Path</h2>
              
              {units.map((unit, index) => (
                <Card 
                  key={unit.id}
                  className={`transition-all duration-300 hover-lift rounded-3xl border-2 bg-white/90 backdrop-blur-sm ${
                    !unit.isUnlocked ? 'opacity-60' : 'border-gray-100 hover:border-primary/20 shadow-medium hover:shadow-strong'
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      {/* Unit Number */}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold relative ${
                        unit.progress === 100 
                          ? 'bg-gradient-success text-white shadow-medium' 
                          : unit.isUnlocked 
                            ? 'bg-gradient-primary text-white shadow-medium'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {unit.progress === 100 ? (
                          <CheckCircle2 className="h-10 w-10 animate-bounce-in" />
                        ) : unit.isUnlocked ? (
                          <span className="font-fredoka">{unit.id}</span>
                        ) : (
                          <Lock className="h-8 w-8" />
                        )}
                        {unit.isUnlocked && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full animate-float" style={{ animationDelay: `${index * 0.5}s` }} />
                        )}
                      </div>

                      {/* Unit Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-fredoka font-bold text-2xl text-gray-800">{unit.title}</h3>
                          {unit.progress === 100 && (
                            <Badge className="bg-gradient-success border-0 text-white font-bold animate-pulse-glow">
                              <Trophy className="h-4 w-4 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-base mb-4 font-medium">{unit.description}</p>
                        
                        <div className="flex items-center gap-6 text-base">
                          <div className="flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-3 py-1">
                            <BookOpen className="h-4 w-4" />
                            <span className="font-semibold">{unit.completedLessons}/{unit.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-2 bg-accent/10 text-accent rounded-full px-3 py-1">
                            <Star className="h-4 w-4" />
                            <span className="font-semibold">{unit.xpReward} XP</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress & Action */}
                      <div className="text-right space-y-4">
                        <ProgressRing 
                          progress={unit.progress} 
                          size={70}
                          color={unit.progress === 100 ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
                        >
                          <span className="text-base font-bold">
                            {unit.progress}%
                          </span>
                        </ProgressRing>
                        
                        <PlayfulButton 
                          variant={unit.progress === 100 ? "secondary" : "primary"}
                          size="lg"
                          disabled={!unit.isUnlocked}
                          icon={Play}
                          onClick={() => unit.isUnlocked && setShowLesson(true)}
                          className="font-fredoka"
                        >
                          {unit.progress === 100 ? 'Review' : 'Continue'}
                        </PlayfulButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement */}
            <Card className="shadow-medium rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-fredoka text-lg">
                  <Trophy className="h-6 w-6 text-accent animate-wiggle" />
                  Recent Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <img 
                  src={achievementImage} 
                  alt="Achievement" 
                  className="w-20 h-20 mx-auto rounded-xl shadow-medium hover-grow"
                />
                <div>
                  <h4 className="font-fredoka font-bold text-lg text-gray-800">Week Warrior</h4>
                  <p className="text-muted-foreground font-medium">
                    Completed 7 days in a row!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-fredoka text-lg">
                  <Target className="h-6 w-6 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground font-medium">Lessons completed</span>
                  <span className="font-bold text-lg">12</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground font-medium">XP earned</span>
                  <span className="font-bold text-lg text-accent">450 XP</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-muted-foreground font-medium">Time studied</span>
                  <span className="font-bold text-lg">2h 30m</span>
                </div>
              </CardContent>
            </Card>

            {/* Study Reminder */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-3xl">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3 animate-float" />
                <p className="font-fredoka font-bold text-lg text-gray-800">Don't break your streak!</p>
                <p className="text-muted-foreground font-medium mt-2">
                  Study for 5 minutes to keep your 7-day streak
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;