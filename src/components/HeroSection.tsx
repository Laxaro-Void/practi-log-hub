import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-office.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24">
      <div className="absolute inset-0 bg-black/20" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Launch Your Professional Journey
          </h1>
          <p className="mb-8 text-xl text-white/90">
            Discover meaningful practice opportunities, track your applications, and document your learning journey with our comprehensive portal.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="lg" className="text-lg" asChild>
              <Link to="/practices">
                Browse Practices
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white/10" asChild>
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container relative z-10 mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center text-white">
            <div className="mb-2 flex justify-center">
              <Search className="h-8 w-8" />
            </div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-white/80">Practice Opportunities</div>
          </div>
          <div className="text-center text-white">
            <div className="mb-2 flex justify-center">
              <Users className="h-8 w-8" />
            </div>
            <div className="text-2xl font-bold">1,200+</div>
            <div className="text-white/80">Active Students</div>
          </div>
          <div className="text-center text-white">
            <div className="mb-2 flex justify-center">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-white/80">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;