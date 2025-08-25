import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Volume2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { GameStats } from "./GameStats";

interface Task {
  id: string;
  type: 'multiple-choice' | 'translate' | 'listen';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  audioUrl?: string; // Add audio URL for listen tasks
}

interface LessonPlayerProps {
  lessonTitle: string;
  tasks: Task[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const LessonPlayer = ({ lessonTitle, tasks, onComplete, onExit }: LessonPlayerProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [audioRef] = useState<HTMLAudioElement | null>(() => 
    typeof window !== 'undefined' ? new Audio() : null
  );

  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  const checkAnswer = () => {
    const answer = currentTask.type === 'multiple-choice' ? selectedOption : userAnswer;
    const isCorrect = answer.toLowerCase().trim() === currentTask.correctAnswer.toLowerCase().trim();
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }

    // Auto advance after showing feedback
    setTimeout(() => {
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setUserAnswer("");
        setSelectedOption("");
        setFeedback(null);
      } else {
        onComplete(score);
      }
    }, 2000);
  };

  const playAudio = () => {
    if (currentTask.type === 'listen' && audioRef) {
      // For demo, we'll use text-to-speech if no audioUrl is provided
      if (currentTask.audioUrl) {
        audioRef.src = currentTask.audioUrl;
        audioRef.play().catch(console.error);
      } else {
        // Fallback to Web Speech API for demo
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(currentTask.correctAnswer);
          utterance.lang = 'es-ES'; // Spanish for demo
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
      }
    }
  };

  const isAnswered = currentTask.type === 'multiple-choice' ? selectedOption : userAnswer.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md shadow-soft border-b-2 border-primary/10 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={onExit}
              className="rounded-full border-2 border-gray-200 hover:border-primary font-semibold"
            >
              Exit
            </Button>
            <h1 className="font-fredoka font-bold text-xl text-gray-800">{lessonTitle}</h1>
            <div className="flex items-center gap-1">
              {[...Array(hearts)].map((_, i) => (
                <Heart key={i} className="h-6 w-6 text-hearts fill-hearts drop-shadow-sm" />
              ))}
            </div>
          </div>
          <Progress value={progress} className="h-4 bg-gray-100 rounded-full overflow-hidden" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <Card className="shadow-strong border-0 rounded-3xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-10">
            <div className="space-y-8">
              {/* Task Header */}
              <div className="text-center">
                <Badge 
                  variant="secondary" 
                  className="mb-6 bg-secondary/10 text-secondary border-2 border-secondary/20 rounded-full px-4 py-2 font-bold text-sm"
                >
                  {currentTaskIndex + 1} of {tasks.length}
                </Badge>
                <h2 className="text-3xl font-fredoka font-bold mb-4 text-gray-800">{currentTask.question}</h2>
                {currentTask.hint && (
                  <p className="text-muted-foreground font-medium text-lg">{currentTask.hint}</p>
                )}
              </div>

              {/* Task Content */}
              <div className="space-y-5">
                {currentTask.type === 'multiple-choice' && (
                  <div className="space-y-4">
                    {currentTask.options?.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedOption === option ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto p-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                          selectedOption === option 
                            ? "bg-gradient-primary text-white border-transparent shadow-medium scale-105" 
                            : "border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 hover:scale-102"
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {currentTask.type === 'translate' && (
                  <div>
                    <Input
                      placeholder="Type your translation..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="text-xl p-6 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50/50"
                      onKeyPress={(e) => e.key === 'Enter' && isAnswered && checkAnswer()}
                    />
                  </div>
                )}

                {currentTask.type === 'listen' && (
                  <div className="text-center space-y-4">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-24 w-24 rounded-full hover:bg-secondary/10 border-4 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-110 shadow-medium hover:shadow-strong"
                      onClick={playAudio}
                    >
                      <Volume2 className="h-10 w-10 text-secondary" />
                    </Button>
                    <p className="text-sm text-muted-foreground font-medium">Click to listen</p>
                    <Input
                      placeholder="Type what you heard..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="text-xl p-6 rounded-2xl border-2 border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-gray-50/50"
                      onKeyPress={(e) => e.key === 'Enter' && isAnswered && checkAnswer()}
                    />
                  </div>
                )}
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`p-4 rounded-lg border-2 animate-bounce-in ${
                  feedback === 'correct' 
                    ? 'bg-secondary-soft border-secondary text-secondary' 
                    : 'bg-destructive-soft border-destructive text-destructive'
                }`}>
                  <div className="flex items-center gap-2">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <XCircle className="h-6 w-6" />
                    )}
                    <span className="font-semibold">
                      {feedback === 'correct' ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  {feedback === 'incorrect' && (
                    <p className="mt-1 text-sm">
                      The correct answer is: <strong>{currentTask.correctAnswer}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              {!feedback && (
                <Button
                  onClick={checkAnswer}
                  disabled={!isAnswered}
                  className="w-full bg-gradient-primary text-xl py-8 rounded-2xl font-bold shadow-medium hover:shadow-strong transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Check Answer
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};