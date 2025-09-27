import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PracticeCard from "@/components/PracticeCard";
import Header from "@/components/Header";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPractices = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    location: "New York, NY",
    duration: "3 months",
    type: "Full-time" as const,
    description: "Join our dynamic development team and work on cutting-edge web applications using React, Node.js, and cloud technologies.",
    requirements: ["Computer Science or related field", "Basic knowledge of JavaScript", "Strong problem-solving skills", "Team collaboration experience"],
    deadline: "Dec 15, 2024",
    spots: 3,
  },
  {
    id: "2",
    title: "Digital Marketing Assistant",
    company: "Creative Agency Inc",
    location: "Remote",
    duration: "4 months",
    type: "Remote" as const,
    description: "Support our marketing team in creating compelling digital campaigns, analyzing performance metrics, and managing social media presence.",
    requirements: ["Marketing or Communications major", "Social media experience", "Analytical mindset", "Creative thinking"],
    deadline: "Jan 10, 2025",
    spots: 2,
  },
  {
    id: "3",
    title: "Business Analyst Trainee",
    company: "Finance Partners LLC",
    location: "Chicago, IL",
    duration: "6 months",
    type: "Part-time" as const,
    description: "Learn business analysis methodologies while supporting various client projects and developing analytical reports.",
    requirements: ["Business Administration background", "Excel proficiency", "Communication skills", "Attention to detail"],
    deadline: "Dec 20, 2024",
    spots: 1,
  },
  {
    id: "4",
    title: "UX/UI Design Intern",
    company: "DesignStudio Pro",
    location: "San Francisco, CA",
    duration: "4 months",
    type: "Full-time" as const,
    description: "Work alongside experienced designers to create user-centered designs for mobile and web applications.",
    requirements: ["Design or HCI background", "Figma proficiency", "Portfolio required", "User research interest"],
    deadline: "Jan 5, 2025",
    spots: 2,
  },
  {
    id: "5",
    title: "Data Science Intern",
    company: "Analytics Hub",
    location: "Remote",
    duration: "5 months",
    type: "Remote" as const,
    description: "Analyze large datasets, build predictive models, and create data visualizations using Python and machine learning tools.",
    requirements: ["Statistics or Data Science major", "Python programming", "SQL knowledge", "Machine learning basics"],
    deadline: "Dec 25, 2024",
    spots: 4,
  },
  {
    id: "6",
    title: "Content Writer Trainee",
    company: "Media Collective",
    location: "Los Angeles, CA",
    duration: "3 months",
    type: "Part-time" as const,
    description: "Create engaging content for various digital platforms, collaborate with editors, and learn content strategy.",
    requirements: ["English or Journalism major", "Writing portfolio", "SEO knowledge", "Social media understanding"],
    deadline: "Jan 15, 2025",
    spots: 3,
  },
  {
    id: "7",
    title: "Cybersecurity Analyst Intern",
    company: "SecureNet Systems",
    location: "Washington, DC",
    duration: "6 months",
    type: "Full-time" as const,
    description: "Learn about network security, threat analysis, and incident response while supporting our security operations team.",
    requirements: ["Computer Science or Cybersecurity major", "Network fundamentals", "Security interest", "Problem-solving skills"],
    deadline: "Dec 30, 2024",
    spots: 2,
  },
  {
    id: "8",
    title: "HR Operations Assistant",
    company: "People First Inc",
    location: "Remote",
    duration: "4 months",
    type: "Remote" as const,
    description: "Support HR processes including recruitment, onboarding, employee relations, and policy development.",
    requirements: ["HR or Psychology background", "Communication skills", "Organizational abilities", "Confidentiality awareness"],
    deadline: "Jan 20, 2025",
    spots: 1,
  },
  {
    id: "9",
    title: "Mobile App Developer Intern",
    company: "AppCraft Studios",
    location: "Austin, TX",
    duration: "4 months",
    type: "Full-time" as const,
    description: "Develop mobile applications for iOS and Android platforms using React Native and native development tools.",
    requirements: ["Mobile development experience", "React Native or Swift/Kotlin", "App store deployment", "API integration"],
    deadline: "Dec 18, 2024",
    spots: 2,
  },
  {
    id: "10",
    title: "Financial Analyst Trainee",
    company: "Investment Group LLC",
    location: "Boston, MA",
    duration: "5 months",
    type: "Part-time" as const,
    description: "Assist with financial modeling, market research, and investment analysis while learning from senior analysts.",
    requirements: ["Finance or Economics major", "Excel advanced skills", "Financial modeling basics", "Analytical thinking"],
    deadline: "Jan 8, 2025",
    spots: 1,
  },
  {
    id: "11",
    title: "Cloud Infrastructure Intern",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    duration: "6 months",
    type: "Full-time" as const,
    description: "Work with AWS, Azure, and GCP to build and maintain cloud infrastructure for enterprise applications.",
    requirements: ["Computer Science background", "Cloud platforms knowledge", "Linux familiarity", "Scripting skills"],
    deadline: "Dec 22, 2024",
    spots: 3,
  },
  {
    id: "12",
    title: "Product Management Trainee",
    company: "Innovation Labs",
    location: "Remote",
    duration: "4 months",
    type: "Remote" as const,
    description: "Learn product development lifecycle, conduct user research, and collaborate with engineering teams on product features.",
    requirements: ["Business or Engineering background", "Analytical skills", "Communication abilities", "Tech-savvy"],
    deadline: "Jan 12, 2025",
    spots: 2,
  },
];

const Practices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredPractices = mockPractices.filter((practice) => {
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || practice.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleApply = (id: string) => {
    const practice = mockPractices.find(p => p.id === id);
    toast({
      title: "Application Started",
      description: `Redirecting to application form for ${practice?.title}`,
    });
    // Here you would navigate to application form
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Practices</h1>
          <p className="text-muted-foreground">Discover and apply to practice opportunities that match your interests and skills.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search practices or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredPractices.length} of {mockPractices.length} practices
        </div>

        {/* Practice Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPractices.map((practice) => (
            <PracticeCard
              key={practice.id}
              {...practice}
              onApply={handleApply}
            />
          ))}
        </div>

        {filteredPractices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No practices found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Practices;