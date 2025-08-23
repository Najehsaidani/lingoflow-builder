import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ProgressRing";
import { GameStats } from "@/components/GameStats";
import { 
  User, 
  Settings, 
  Calendar, 
  Trophy, 
  Target, 
  Flame, 
  Star,
  Heart,
  ArrowLeft,
  Edit,
  Share2,
  Crown,
  Zap
} from "lucide-react";

const Profile = () => {
  const [user] = useState({
    username: "LingoLearner123",
    email: "user@example.com",
    bio: "Passionate language learner exploring the world through words. Currently focusing on Spanish and French!",
    avatar: "",
    joinDate: "March 2024",
    totalXP: 15420,
    currentStreak: 28,
    longestStreak: 45,
    hearts: 4,
    dailyGoal: 50,
    dailyProgress: 35,
    completedLessons: 156,
    perfectDays: 23,
    badges: [
      { id: 1, name: "First Steps", description: "Complete your first lesson", icon: "🎯", earned: true },
      { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", icon: "⚡", earned: true },
      { id: 3, name: "Scholar", description: "Complete 50 lessons", icon: "📚", earned: true },
      { id: 4, name: "Perfectionist", description: "Get 10 perfect lessons", icon: "💎", earned: true },
      { id: 5, name: "Dedicated", description: "Learn for 30 days straight", icon: "🔥", earned: false },
      { id: 6, name: "Polyglot", description: "Study 3 different languages", icon: "🌍", earned: false },
    ]
  });

  const languages = [
    {
      name: "Spanish",
      level: "Intermediate",
      progress: 68,
      xp: 8450,
      lessonsCompleted: 89,
      flag: "🇪🇸"
    },
    {
      name: "French", 
      level: "Beginner",
      progress: 32,
      xp: 6970,
      lessonsCompleted: 67,
      flag: "🇫🇷"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            <Link to="/profile/settings">
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 shadow-medium">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-primary-soft text-primary">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="mb-2">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <p className="text-muted-foreground mb-4">{user.bio}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      <span>{user.totalXP.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">{user.currentStreak}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Flame className="h-3 w-3" />
                      Current Streak
                    </div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-secondary">{user.longestStreak}</div>
                    <div className="text-xs text-muted-foreground">Longest Streak</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-accent">{user.completedLessons}</div>
                    <div className="text-xs text-muted-foreground">Lessons Done</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-success">{user.perfectDays}</div>
                    <div className="text-xs text-muted-foreground">Perfect Days</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Stats */}
        <div className="mb-8">
          <GameStats
            xp={user.totalXP}
            hearts={user.hearts}
            streak={user.currentStreak}
            dailyGoal={user.dailyGoal}
            dailyProgress={user.dailyProgress}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="languages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Languages Tab */}
          <TabsContent value="languages" className="space-y-4">
            {languages.map((lang, index) => (
              <Card key={index} className="shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <CardTitle className="text-lg">{lang.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{lang.level}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{lang.xp.toLocaleString()} XP</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{lang.progress}%</span>
                    </div>
                    <Progress value={lang.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{lang.lessonsCompleted} lessons completed</span>
                      <span>{Math.round((100 - lang.progress) * lang.lessonsCompleted / lang.progress)} lessons remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {user.badges.map((badge) => (
                <Card key={badge.id} className={`shadow-soft ${badge.earned ? 'bg-card' : 'bg-muted/50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {badge.name}
                        </h3>
                        <p className={`text-sm ${badge.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                          {badge.description}
                        </p>
                        {badge.earned && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Study Time</span>
                    <span className="font-semibold">47h 23m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Session</span>
                    <span className="font-semibold">12m 15s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Best Day</span>
                    <span className="font-semibold">245 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy Rate</span>
                    <span className="font-semibold text-success">87%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Goals & Streaks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Goals Met This Week</span>
                    <span className="font-semibold">5/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Goals Met This Month</span>
                    <span className="font-semibold">18/23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Perfect Lessons</span>
                    <span className="font-semibold">{user.perfectDays}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Streak Freezes Used</span>
                    <span className="font-semibold">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;