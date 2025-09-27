import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Users } from "lucide-react";

interface PracticeCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: "Full-time" | "Part-time" | "Remote";
  description: string;
  requirements: string[];
  deadline: string;
  spots: number;
  onApply: (id: string) => void;
}

const PracticeCard = ({
  id,
  title,
  company,
  location,
  duration,
  type,
  description,
  requirements,
  deadline,
  spots,
  onApply,
}: PracticeCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-primary text-primary-foreground";
      case "Part-time":
        return "bg-accent text-accent-foreground";
      case "Remote":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "Full-time":
        return "Tiempo Completo";
      case "Part-time":
        return "Medio Tiempo";
      case "Remote":
        return "Remoto";
      default:
        return type;
    }
  };

  return (
    <Card className="h-full shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{company}</span>
            </div>
          </div>
          <Badge className={getTypeColor(type)}>{getTypeLabel(type)}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Requisitos Clave:</h4>
          <ul className="text-sm text-muted-foreground">
            {requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{spots} plazas disponibles</span>
          </div>
          <span className="text-muted-foreground">Fecha límite: {deadline}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onApply(id)} className="w-full">
          Aplicar Ahora
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeCard;