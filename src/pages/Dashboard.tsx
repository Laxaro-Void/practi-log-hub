import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Building,
  MapPin
} from "lucide-react";

const mockApplications = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    location: "New York, NY",
    appliedDate: "Nov 15, 2024",
    status: "under_review",
    progress: 60,
  },
  {
    id: "2",
    title: "Digital Marketing Assistant", 
    company: "Creative Agency Inc",
    location: "Remote",
    appliedDate: "Nov 10, 2024",
    status: "accepted",
    progress: 100,
  },
  {
    id: "3",
    title: "Business Analyst Trainee",
    company: "Finance Partners LLC", 
    location: "Chicago, IL",
    appliedDate: "Nov 8, 2024",
    status: "rejected",
    progress: 100,
  },
];

const Dashboard = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "under_review":
        return <Badge className="bg-warning text-warning-foreground"><AlertCircle className="h-3 w-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const acceptedApplications = mockApplications.filter(app => app.status === "accepted");
  const underReviewCount = mockApplications.filter(app => app.status === "under_review").length;
  const totalApplications = mockApplications.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your applications and manage your practice journey.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{totalApplications}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                  <p className="text-2xl font-bold">{underReviewCount}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-bold">{acceptedApplications.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Practices</p>
                  <p className="text-2xl font-bold">{acceptedApplications.length}</p>
                </div>
                <Building className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{application.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {application.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {application.appliedDate}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                  
                  {application.status === "under_review" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>
                  )}
                  
                  {application.status === "accepted" && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Start Daily Logs</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;