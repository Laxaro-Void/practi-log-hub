import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Users, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/contexts/ApplicationContext";

interface Practice {
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
}

interface ApplicationFormProps {
  practice: Practice | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  gpa: string;
  experience: string;
  motivation: string;
  skills: string;
  availability: string;
  portfolioUrl: string;
  linkedinUrl: string;
}

const ApplicationForm = ({ practice, isOpen, onClose }: ApplicationFormProps) => {
  const { toast } = useToast();
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    graduationYear: "",
    gpa: "",
    experience: "",
    motivation: "",
    skills: "",
    availability: "",
    portfolioUrl: "",
    linkedinUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.fullName || !formData.email || !formData.phone || !formData.motivation) {
      toast({
        title: "Error de Validación",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      // Agregar aplicación al contexto
      if (practice) {
        addApplication({
          title: practice.title,
          company: practice.company,
          location: practice.location,
        });
      }

      toast({
        title: "¡Aplicación Enviada!",
        description: `Tu aplicación para ${practice?.title} ha sido enviada exitosamente. Te contactaremos pronto.`,
      });
      setIsSubmitting(false);
      onClose();
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        university: "",
        major: "",
        graduationYear: "",
        gpa: "",
        experience: "",
        motivation: "",
        skills: "",
        availability: "",
        portfolioUrl: "",
        linkedinUrl: "",
      });
    }, 2000);
  };

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

  if (!practice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aplicar a Práctica</DialogTitle>
          <DialogDescription>
            Completa el formulario para aplicar a esta oportunidad de práctica.
          </DialogDescription>
        </DialogHeader>

        {/* Practice Summary */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{practice.title}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{practice.company}</span>
                </div>
              </div>
              <Badge className={getTypeColor(practice.type)}>{getTypeLabel(practice.type)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{practice.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{practice.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{practice.spots} plazas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/tuperfil"
                />
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Académica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">Universidad</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                  placeholder="Nombre de tu universidad"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Carrera</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => handleInputChange("major", e.target.value)}
                  placeholder="Tu carrera o especialización"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Año de Graduación</Label>
                <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange("graduationYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA/Promedio</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  placeholder="3.5 / 4.0"
                />
              </div>
            </div>
          </div>

          {/* Experiencia y Habilidades */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experiencia y Habilidades</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experiencia Previa</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="Describe tu experiencia laboral, proyectos o prácticas previas..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades Técnicas</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="Lista tus habilidades técnicas relevantes para esta práctica..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio/GitHub</Label>
                <Input
                  id="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                  placeholder="https://tuportfolio.com o https://github.com/tuusuario"
                />
              </div>
            </div>
          </div>

          {/* Motivación y Disponibilidad */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Motivación y Disponibilidad</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motivation">¿Por qué quieres esta práctica? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange("motivation", e.target.value)}
                  placeholder="Explica por qué te interesa esta práctica y qué esperas aprender..."
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Disponibilidad</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Cuándo puedes empezar?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inmediato">Inmediatamente</SelectItem>
                    <SelectItem value="1semana">En 1 semana</SelectItem>
                    <SelectItem value="2semanas">En 2 semanas</SelectItem>
                    <SelectItem value="1mes">En 1 mes</SelectItem>
                    <SelectItem value="2meses">En 2 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* CV Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documentos</h3>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Arrastra tu CV aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos aceptados: PDF, DOC, DOCX (máx. 5MB)
              </p>
              <Button type="button" variant="outline" className="mt-4">
                Seleccionar Archivo
              </Button>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Aplicación"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;