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