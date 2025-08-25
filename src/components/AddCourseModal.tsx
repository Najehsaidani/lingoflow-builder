import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";

interface Course {
  language: string;
  nativeLanguage: string;
  difficulty: string;
  learners: string;
  lessons: number;
  image: string;
}

interface AddCourseModalProps {
  onAddCourse: (course: Course) => void;
}

export const AddCourseModal = ({ onAddCourse }: AddCourseModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    language: "",
    nativeLanguage: "English",
    difficulty: "Beginner",
    learners: "0",
    lessons: 0,
    image: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({
      ...formData,
      learners: formData.learners + "+",
      image: formData.image || "/placeholder.svg"
    });
    setOpen(false);
    setFormData({
      language: "",
      nativeLanguage: "English", 
      difficulty: "Beginner",
      learners: "0",
      lessons: 0,
      image: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Language Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                placeholder="e.g. German"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nativeLanguage">From Language</Label>
              <Select 
                value={formData.nativeLanguage}
                onValueChange={(value) => setFormData({...formData, nativeLanguage: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={formData.difficulty}
                onValueChange={(value) => setFormData({...formData, difficulty: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lessons">Number of Lessons</Label>
              <Input
                id="lessons"
                type="number"
                value={formData.lessons}
                onChange={(e) => setFormData({...formData, lessons: parseInt(e.target.value) || 0})}
                placeholder="180"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="learners">Estimated Learners (thousands)</Label>
            <Input
              id="learners"
              value={formData.learners}
              onChange={(e) => setFormData({...formData, learners: e.target.value})}
              placeholder="2500 (for 2.5M+)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Course Image URL (optional)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/flag.jpg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              Add Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};