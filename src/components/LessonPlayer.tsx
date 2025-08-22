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

  const isAnswered = currentTask.type === 'multiple-choice' ? selectedOption : userAnswer.trim();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card shadow-soft p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onExit}>
              Exit
            </Button>
            <h1 className="font-semibold text-lg">{lessonTitle}</h1>
            <div className="flex items-center gap-2">
              {[...Array(hearts)].map((_, i) => (
                <Heart key={i} className="h-5 w-5 text-hearts fill-hearts" />
              ))}
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <Card className="shadow-medium border-2">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Task Header */}
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  {currentTaskIndex + 1} of {tasks.length}
                </Badge>
                <h2 className="text-2xl font-semibold mb-2">{currentTask.question}</h2>
                {currentTask.hint && (
                  <p className="text-muted-foreground">{currentTask.hint}</p>
                )}
              </div>

              {/* Task Content */}
              <div className="space-y-4">
                {currentTask.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentTask.options?.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedOption === option ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4"
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
                      className="text-lg p-4"
                      onKeyPress={(e) => e.key === 'Enter' && isAnswered && checkAnswer()}
                    />
                  </div>
                )}

                {currentTask.type === 'listen' && (
                  <div className="text-center space-y-4">
                    <Button size="lg" variant="outline" className="h-20 w-20 rounded-full">
                      <Volume2 className="h-8 w-8" />
                    </Button>
                    <Input
                      placeholder="Type what you heard..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="text-lg p-4"
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
                  className="w-full bg-gradient-primary text-lg py-6"
                >
                  Check Answer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};