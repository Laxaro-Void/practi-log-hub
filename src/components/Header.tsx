import { Button } from "@/components/ui/button";
import { Briefcase, User, FileText, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PracticePortal</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/practices"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/practices") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Practices
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/dashboard") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/logs"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/logs") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            Daily Logs
          </Link>
        </nav>

        <Button variant="outline" size="sm">
          <User className="h-4 w-4" />
          Profile
        </Button>
      </div>
    </header>
  );
};

export default Header;