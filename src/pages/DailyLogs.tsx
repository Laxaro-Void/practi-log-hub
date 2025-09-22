import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, FileText, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockLogs = [
  {
    id: "1",
    date: "2024-11-20",
    practice: "Software Development Intern - TechCorp Solutions",
    hours: 8,
    activities: "Worked on React components for the user dashboard, participated in daily standup, reviewed code from senior developers.",
    learnings: "Learned about React hooks best practices and how to optimize component rendering.",
    challenges: "Understanding the existing codebase architecture took more time than expected.",
    mood: "productive",
  },
  {
    id: "2", 
    date: "2024-11-19",
    practice: "Software Development Intern - TechCorp Solutions",
    hours: 7.5,
    activities: "Debugging API integration issues, attending team retrospective meeting, setting up development environment.",
    learnings: "Gained experience with REST API debugging and learned about team collaboration tools.",
    challenges: "Environment setup had some compatibility issues that required IT support.",
    mood: "challenging",
  },
];

const DailyLogs = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    practice: "",
    hours: "",
    activities: "",
    learnings: "",
    challenges: "",
    mood: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Daily Log Saved",
      description: "Your daily log has been successfully recorded.",
    });
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      practice: "",
      hours: "",
      activities: "",
      learnings: "",
      challenges: "",
      mood: "",
    });
  };

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case "productive":
        return <Badge className="bg-success text-success-foreground">Productive</Badge>;
      case "challenging":
        return <Badge className="bg-warning text-warning-foreground">Challenging</Badge>;
      case "excellent":
        return <Badge className="bg-primary text-primary-foreground">Excellent</Badge>;
      default:
        return <Badge variant="secondary">{mood}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Daily Logs</h1>
            <p className="text-muted-foreground">Track your daily activities, learnings, and progress during your practice.</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Log Entry
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create Daily Log Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practice">Practice</Label>
                    <Select value={formData.practice} onValueChange={(value) => setFormData({ ...formData, practice: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your practice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techcorp">Software Development Intern - TechCorp Solutions</SelectItem>
                        <SelectItem value="creative">Digital Marketing Assistant - Creative Agency Inc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours Worked</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood">Overall Mood</Label>
                    <Select value={formData.mood} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How was your day?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="productive">Productive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="challenging">Challenging</SelectItem>
                        <SelectItem value="difficult">Difficult</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities">Activities & Tasks</Label>
                  <Textarea
                    id="activities"
                    value={formData.activities}
                    onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                    placeholder="Describe what you worked on today..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learnings">Key Learnings</Label>
                  <Textarea
                    id="learnings"
                    value={formData.learnings}
                    onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
                    placeholder="What did you learn today?"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges & Solutions</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    placeholder="Any challenges you faced and how you addressed them?"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Save Log Entry</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Logs List */}
        <div className="space-y-6">
          {mockLogs.map((log) => (
            <Card key={log.id} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{new Date(log.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{log.hours} hours</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.practice}</p>
                  </div>
                  {getMoodBadge(log.mood)}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Activities & Tasks</h4>
                    <p className="text-sm">{log.activities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Key Learnings</h4>
                    <p className="text-sm">{log.learnings}</p>
                  </div>
                  
                  {log.challenges && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Challenges & Solutions</h4>
                      <p className="text-sm">{log.challenges}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockLogs.length === 0 && !showForm && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No daily logs recorded yet.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Log Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DailyLogs;