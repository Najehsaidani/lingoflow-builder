import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageCard } from "@/components/LanguageCard";
import { Badge } from "@/components/ui/badge";
import { Globe, Star, Users, BookOpen, Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";
import spanishImage from "@/assets/spanish-flag.jpg";
import frenchImage from "@/assets/french-flag.jpg";
import Dashboard from "./Dashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const languages = [
    {
      language: "Spanish",
      nativeLanguage: "English",
      difficulty: "Beginner",
      learners: "2.5M+",
      lessons: 180,
      image: spanishImage
    },
    {
      language: "French", 
      nativeLanguage: "English",
      difficulty: "Beginner",
      learners: "1.8M+",
      lessons: 165,
      image: frenchImage
    }
  ];

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Star className="h-4 w-4 mr-2" />
                #1 Language Learning Platform
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Learn Languages the 
                  <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Smart Way
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  Master new languages with bite-sized lessons, gamification, and adaptive learning. 
                  Join millions of learners worldwide.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-strong"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">5M+ learners</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-5 w-5" />
                    <span className="text-sm">30+ languages</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Language learning illustration" 
                className="rounded-2xl shadow-strong w-full animate-slide-up"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Language Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your journey with interactive lessons designed by language experts. 
              Track progress and stay motivated with gamification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <div key={lang.language} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <LanguageCard
                  {...lang}
                  onStart={() => setShowDashboard(true)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why LingoFlow Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Science-backed methods that make learning effective and fun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Bite-sized Lessons",
                description: "Learn in just 5-15 minutes a day with lessons designed for busy schedules",
                color: "primary"
              },
              {
                icon: <Play className="h-8 w-8" />,
                title: "Gamified Learning", 
                description: "Earn XP, maintain streaks, and compete with friends to stay motivated",
                color: "secondary"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Adaptive System",
                description: "AI-powered spaced repetition ensures you remember what you learn",
                color: "accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`inline-flex p-4 rounded-lg mx-auto mb-4 ${
                    feature.color === 'primary' ? 'bg-primary-soft text-primary' :
                    feature.color === 'secondary' ? 'bg-secondary-soft text-secondary' :
                    'bg-accent-soft text-accent'
                  }`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join millions of learners and discover how fun learning a new language can be.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              onClick={() => setShowDashboard(true)}
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              View All Languages
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
