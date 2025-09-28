import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PracticeCard from "@/components/PracticeCard";
import ApplicationForm from "@/components/ApplicationForm";
import Header from "@/components/Header";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPractices = [
  {
    id: "1",
    title: "Practicante de Desarrollo de Software",
    company: "TechCorp Solutions",
    location: "Nueva York, NY",
    duration: "3 meses",
    type: "Full-time" as const,
    description: "Únete a nuestro equipo dinámico de desarrollo y trabaja en aplicaciones web de vanguardia usando React, Node.js y tecnologías en la nube.",
    requirements: ["Ciencias de la Computación o campo relacionado", "Conocimientos básicos de JavaScript", "Habilidades sólidas de resolución de problemas", "Experiencia en colaboración en equipo"],
    deadline: "15 dic, 2024",
    spots: 3,
  },
  {
    id: "2",
    title: "Asistente de Marketing Digital",
    company: "Creative Agency Inc",
    location: "Remoto",
    duration: "4 meses",
    type: "Remote" as const,
    description: "Apoya a nuestro equipo de marketing en la creación de campañas digitales atractivas, análisis de métricas de rendimiento y gestión de presencia en redes sociales.",
    requirements: ["Especialización en Marketing o Comunicaciones", "Experiencia en redes sociales", "Mentalidad analítica", "Pensamiento creativo"],
    deadline: "10 ene, 2025",
    spots: 2,
  },
  {
    id: "3",
    title: "Analista de Negocios en Formación",
    company: "Finance Partners LLC",
    location: "Chicago, IL",
    duration: "6 meses",
    type: "Part-time" as const,
    description: "Aprende metodologías de análisis de negocios mientras apoyas varios proyectos de clientes y desarrollas reportes analíticos.",
    requirements: ["Formación en Administración de Empresas", "Competencia en Excel", "Habilidades de comunicación", "Atención al detalle"],
    deadline: "20 dic, 2024",
    spots: 1,
  },
  {
    id: "4",
    title: "Practicante de Diseño UX/UI",
    company: "DesignStudio Pro",
    location: "San Francisco, CA",
    duration: "4 meses",
    type: "Full-time" as const,
    description: "Trabaja junto a diseñadores experimentados para crear diseños centrados en el usuario para aplicaciones móviles y web.",
    requirements: ["Formación en Diseño o HCI", "Competencia en Figma", "Portafolio requerido", "Interés en investigación de usuarios"],
    deadline: "5 ene, 2025",
    spots: 2,
  },
  {
    id: "5",
    title: "Practicante de Ciencia de Datos",
    company: "Analytics Hub",
    location: "Remoto",
    duration: "5 meses",
    type: "Remote" as const,
    description: "Analiza grandes conjuntos de datos, construye modelos predictivos y crea visualizaciones de datos usando Python y herramientas de aprendizaje automático.",
    requirements: ["Especialización en Estadística o Ciencia de Datos", "Programación en Python", "Conocimiento de SQL", "Conceptos básicos de aprendizaje automático"],
    deadline: "25 dic, 2024",
    spots: 4,
  },
  {
    id: "6",
    title: "Redactor de Contenido en Formación",
    company: "Media Collective",
    location: "Los Ángeles, CA",
    duration: "3 meses",
    type: "Part-time" as const,
    description: "Crea contenido atractivo para varias plataformas digitales, colabora con editores y aprende estrategia de contenido.",
    requirements: ["Especialización en Inglés o Periodismo", "Portafolio de escritura", "Conocimiento de SEO", "Comprensión de redes sociales"],
    deadline: "15 ene, 2025",
    spots: 3,
  },
  {
    id: "7",
    title: "Practicante de Analista de Ciberseguridad",
    company: "SecureNet Systems",
    location: "Washington, DC",
    duration: "6 meses",
    type: "Full-time" as const,
    description: "Aprende sobre seguridad de redes, análisis de amenazas y respuesta a incidentes mientras apoyas nuestro equipo de operaciones de seguridad.",
    requirements: ["Especialización en Ciencias de la Computación o Ciberseguridad", "Fundamentos de redes", "Interés en seguridad", "Habilidades de resolución de problemas"],
    deadline: "30 dic, 2024",
    spots: 2,
  },
  {
    id: "8",
    title: "Asistente de Operaciones de RRHH",
    company: "People First Inc",
    location: "Remoto",
    duration: "4 meses",
    type: "Remote" as const,
    description: "Apoya procesos de RRHH incluyendo reclutamiento, incorporación, relaciones con empleados y desarrollo de políticas.",
    requirements: ["Formación en RRHH o Psicología", "Habilidades de comunicación", "Capacidades organizacionales", "Conciencia de confidencialidad"],
    deadline: "20 ene, 2025",
    spots: 1,
  },
  {
    id: "9",
    title: "Practicante de Desarrollador de Apps Móviles",
    company: "AppCraft Studios",
    location: "Austin, TX",
    duration: "4 meses",
    type: "Full-time" as const,
    description: "Desarrolla aplicaciones móviles para plataformas iOS y Android usando React Native y herramientas de desarrollo nativo.",
    requirements: ["Experiencia en desarrollo móvil", "React Native o Swift/Kotlin", "Despliegue en app store", "Integración de APIs"],
    deadline: "18 dic, 2024",
    spots: 2,
  },
  {
    id: "10",
    title: "Analista Financiero en Formación",
    company: "Investment Group LLC",
    location: "Boston, MA",
    duration: "5 meses",
    type: "Part-time" as const,
    description: "Asiste con modelado financiero, investigación de mercado y análisis de inversiones mientras aprendes de analistas senior.",
    requirements: ["Especialización en Finanzas o Economía", "Habilidades avanzadas en Excel", "Conceptos básicos de modelado financiero", "Pensamiento analítico"],
    deadline: "8 ene, 2025",
    spots: 1,
  },
  {
    id: "11",
    title: "Practicante de Infraestructura en la Nube",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    duration: "6 meses",
    type: "Full-time" as const,
    description: "Trabaja con AWS, Azure y GCP para construir y mantener infraestructura en la nube para aplicaciones empresariales.",
    requirements: ["Formación en Ciencias de la Computación", "Conocimiento de plataformas en la nube", "Familiaridad con Linux", "Habilidades de scripting"],
    deadline: "22 dic, 2024",
    spots: 3,
  },
  {
    id: "12",
    title: "Gerente de Producto en Formación",
    company: "Innovation Labs",
    location: "Remoto",
    duration: "4 meses",
    type: "Remote" as const,
    description: "Aprende el ciclo de vida de desarrollo de productos, realiza investigación de usuarios y colabora con equipos de ingeniería en características de productos.",
    requirements: ["Formación en Negocios o Ingeniería", "Habilidades analíticas", "Capacidades de comunicación", "Conocimientos tecnológicos"],
    deadline: "12 ene, 2025",
    spots: 2,
  },
];

const Practices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedPractice, setSelectedPractice] = useState<typeof mockPractices[0] | null>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const { toast } = useToast();

  const filteredPractices = mockPractices.filter((practice) => {
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || practice.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleApply = (id: string) => {
    const practice = mockPractices.find(p => p.id === id);
    if (practice) {
      setSelectedPractice(practice);
      setIsApplicationFormOpen(true);
    }
  };

  const handleCloseApplicationForm = () => {
    setIsApplicationFormOpen(false);
    setSelectedPractice(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Prácticas Disponibles</h1>
          <p className="text-muted-foreground">Descubre y aplica a oportunidades de práctica que coincidan con tus intereses y habilidades.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar prácticas o empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="Full-time">Tiempo Completo</SelectItem>
                <SelectItem value="Part-time">Medio Tiempo</SelectItem>
                <SelectItem value="Remote">Remoto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Mostrando {filteredPractices.length} de {mockPractices.length} prácticas
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
            <p className="text-muted-foreground">No se encontraron prácticas que coincidan con tus criterios.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
              }}
              className="mt-4"
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </main>

      {/* Application Form Modal */}
      <ApplicationForm
        practice={selectedPractice}
        isOpen={isApplicationFormOpen}
        onClose={handleCloseApplicationForm}
      />
    </div>
  );
};

export default Practices;