import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Users, Upload, X, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/contexts/ApplicationContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  major: string;
  graduationYear: string;
  experience: string;
  motivation: string;
  skills: string;
  availability: Date | undefined;
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
    major: "",
    graduationYear: "",
    experience: "",
    motivation: "",
    skills: "",
    availability: undefined,
    portfolioUrl: "",
    linkedinUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
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

    // Mostrar resumen
    setShowSummary(true);
  };

  const handleConfirmSubmit = async () => {
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
      setShowSummary(false);
      onClose();
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        major: "",
        graduationYear: "",
        experience: "",
        motivation: "",
        skills: "",
        availability: undefined,
        portfolioUrl: "",
        linkedinUrl: "",
      });
    }, 2000);
  };

  const handleEditForm = () => {
    setShowSummary(false);
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
          <DialogTitle>{showSummary ? "Resumen de tu Aplicación" : "Aplicar a Práctica"}</DialogTitle>
          <DialogDescription>
            {showSummary 
              ? "Revisa tu información antes de enviar la aplicación." 
              : "Completa el formulario para aplicar a esta oportunidad de práctica."}
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

        {showSummary ? (
          /* Application Summary */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre Completo</p>
                    <p className="font-medium">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  {formData.linkedinUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium truncate">{formData.linkedinUrl}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {(formData.major || formData.graduationYear) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Información Académica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    {formData.major && (
                      <div>
                        <p className="text-sm text-muted-foreground">Carrera</p>
                        <p className="font-medium">{formData.major}</p>
                      </div>
                    )}
                    {formData.graduationYear && (
                      <div>
                        <p className="text-sm text-muted-foreground">Año de Graduación</p>
                        <p className="font-medium">{formData.graduationYear}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {(formData.experience || formData.skills || formData.portfolioUrl) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Experiencia y Habilidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.experience && (
                    <div>
                      <p className="text-sm text-muted-foreground">Experiencia Previa</p>
                      <p className="font-medium whitespace-pre-wrap">{formData.experience}</p>
                    </div>
                  )}
                  {formData.skills && (
                    <div>
                      <p className="text-sm text-muted-foreground">Habilidades Técnicas</p>
                      <p className="font-medium whitespace-pre-wrap">{formData.skills}</p>
                    </div>
                  )}
                  {formData.portfolioUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground">Portfolio/GitHub</p>
                      <p className="font-medium truncate">{formData.portfolioUrl}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Motivación y Disponibilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Motivación</p>
                  <p className="font-medium whitespace-pre-wrap">{formData.motivation}</p>
                </div>
                {formData.availability && (
                  <div>
                    <p className="text-sm text-muted-foreground">Disponibilidad</p>
                    <p className="font-medium">{format(formData.availability, "PPP")}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={handleEditForm}>
                Editar Formulario
              </Button>
              <Button type="button" onClick={handleConfirmSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Confirmar Envío"}
              </Button>
            </div>
          </div>
        ) : (
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
                <Label htmlFor="availability">¿Cuándo puedes empezar?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.availability && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.availability ? format(formData.availability, "PPP") : <span>Selecciona una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.availability}
                      onSelect={(date) => handleInputChange("availability", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
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
              <Button type="submit">
                Revisar Aplicación
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;