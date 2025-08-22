import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameStats } from "@/components/GameStats";
import { ProgressRing } from "@/components/ProgressRing";
import { LessonPlayer } from "@/components/LessonPlayer";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                LingoFlow
              </h1>
              <p className="text-muted-foreground">Continue your Spanish journey</p>
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
            <Card className="bg-gradient-hero text-white shadow-strong">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Daily Challenge</h3>
                    <p className="opacity-90">Complete 3 lessons to earn bonus XP!</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing 
                      progress={66} 
                      size={80} 
                      color="white"
                      backgroundColor="rgba(255,255,255,0.2)"
                    >
                      <div className="text-center">
                        <div className="font-bold">2/3</div>
                        <div className="text-xs opacity-80">lessons</div>
                      </div>
                    </ProgressRing>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Units */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Learning Path</h2>
              
              {units.map((unit, index) => (
                <Card 
                  key={unit.id}
                  className={`transition-all duration-300 hover:shadow-medium ${
                    !unit.isUnlocked ? 'opacity-60' : 'hover:-translate-y-1'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Unit Number */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                        unit.progress === 100 
                          ? 'bg-gradient-success text-white' 
                          : unit.isUnlocked 
                            ? 'bg-gradient-primary text-white'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {unit.progress === 100 ? (
                          <CheckCircle2 className="h-8 w-8" />
                        ) : unit.isUnlocked ? (
                          unit.id
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>

                      {/* Unit Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{unit.title}</h3>
                          {unit.progress === 100 && (
                            <Badge className="bg-gradient-success">
                              <Trophy className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{unit.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            {unit.completedLessons}/{unit.lessons} lessons
                          </div>
                          <div className="flex items-center gap-1 text-accent">
                            <Star className="h-4 w-4" />
                            {unit.xpReward} XP
                          </div>
                        </div>
                      </div>

                      {/* Progress & Action */}
                      <div className="text-right space-y-3">
                        <ProgressRing 
                          progress={unit.progress} 
                          size={60}
                          color={unit.progress === 100 ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
                        >
                          <span className="text-sm font-semibold">
                            {unit.progress}%
                          </span>
                        </ProgressRing>
                        
                        <Button 
                          disabled={!unit.isUnlocked}
                          onClick={() => unit.isUnlocked && setShowLesson(true)}
                          className="bg-gradient-primary"
                        >
                          {unit.progress === 100 ? 'Review' : 'Continue'}
                          <Play className="ml-2 h-4 w-4" />
                        </Button>
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
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Recent Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <img 
                  src={achievementImage} 
                  alt="Achievement" 
                  className="w-16 h-16 mx-auto rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">Week Warrior</h4>
                  <p className="text-sm text-muted-foreground">
                    Completed 7 days in a row!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">XP earned</span>
                  <span className="font-semibold text-accent">450 XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time studied</span>
                  <span className="font-semibold">2h 30m</span>
                </div>
              </CardContent>
            </Card>

            {/* Study Reminder */}
            <Card className="bg-primary-soft border-primary/20">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Don't break your streak!</p>
                <p className="text-xs text-muted-foreground mt-1">
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