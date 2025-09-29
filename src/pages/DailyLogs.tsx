import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, FileText, Clock, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/contexts/ApplicationContext";

const mockPractices = [
  { id: "1", title: "Practicante de Desarrollo de Software", company: "TechCorp Solutions" },
  { id: "2", title: "Asistente de Marketing Digital", company: "Creative Agency Inc" },
  { id: "3", title: "Analista de Negocios en Formación", company: "Finance Partners LLC" },
  { id: "4", title: "Practicante de Diseño UX/UI", company: "DesignStudio Pro" },
  { id: "5", title: "Practicante de Ciencia de Datos", company: "Analytics Hub" },
];

const mockLogs = [
  {
    id: "1",
    date: "2024-11-20",
    practiceId: "1",
    practice: "Practicante de Desarrollo de Software - TechCorp Solutions",
    hours: 8,
    activities: "Trabajé en componentes React para el panel de usuario, participé en reunión diaria, revisé código de desarrolladores senior.",
    learnings: "Aprendí sobre mejores prácticas de React hooks y cómo optimizar la renderización de componentes.",
    challenges: "Entender la arquitectura del código existente tomó más tiempo de lo esperado.",
    mood: "productive",
  },
  {
    id: "2", 
    date: "2024-11-19",
    practiceId: "1",
    practice: "Practicante de Desarrollo de Software - TechCorp Solutions",
    hours: 7.5,
    activities: "Depuración de problemas de integración de API, asistí a reunión retrospectiva del equipo, configuré entorno de desarrollo.",
    learnings: "Gané experiencia en depuración de APIs REST y aprendí sobre herramientas de colaboración en equipo.",
    challenges: "La configuración del entorno tuvo algunos problemas de compatibilidad que requirieron soporte de IT.",
    mood: "challenging",
  },
  {
    id: "3",
    date: "2024-11-21",
    practiceId: "2",
    practice: "Asistente de Marketing Digital - Creative Agency Inc",
    hours: 6,
    activities: "Creé calendario de contenido para redes sociales, analicé métricas de rendimiento de campañas, asistí a presentación con cliente.",
    learnings: "Comprensión de analíticas de redes sociales y cómo interpretar datos de engagement.",
    challenges: "Los comentarios del cliente requirieron cambios importantes en la estrategia de campaña.",
    mood: "productive",
  },
  {
    id: "4",
    date: "2024-11-18",
    practiceId: "2",
    practice: "Asistente de Marketing Digital - Creative Agency Inc",
    hours: 7,
    activities: "Investigué demografía de audiencia objetivo, redacté contenido para blog, coordiné con equipo de diseño.",
    learnings: "Aprendí sobre segmentación de audiencia y planificación de estrategia de contenido.",
    challenges: "Equilibrar visión creativa con requerimientos del cliente.",
    mood: "excellent",
  },
];

const DailyLogs = () => {
  const { applications } = useApplications();
  const [selectedPractice, setSelectedPractice] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: "",
    activities: "",
    learnings: "",
    challenges: "",
    mood: "",
  });
  const { toast } = useToast();

  // Load selected practice from localStorage on mount
  useEffect(() => {
    const savedPractice = localStorage.getItem('selectedPractice');
    if (savedPractice) {
      const practiceData = JSON.parse(savedPractice);
      setSelectedPractice(practiceData.id);
      localStorage.removeItem('selectedPractice'); // Clear after use
    }
  }, []);

  // Get accepted applications for practice selection
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  
  const selectedPracticeInfo = acceptedApplications.find(p => p.id === selectedPractice);
  const filteredLogs = mockLogs.filter(log => log.practiceId === selectedPractice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registro Diario Guardado",
      description: "Tu registro diario ha sido grabado exitosamente.",
    });
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
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
        return <Badge className="bg-success text-success-foreground">Productivo</Badge>;
      case "challenging":
        return <Badge className="bg-warning text-warning-foreground">Desafiante</Badge>;
      case "excellent":
        return <Badge className="bg-primary text-primary-foreground">Excelente</Badge>;
      default:
        return <Badge variant="secondary">{mood}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Registros Diarios</h1>
          <p className="text-muted-foreground">Rastrea tus actividades diarias, aprendizajes y progreso durante tu práctica.</p>
        </div>

        {/* Practice Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Seleccionar Práctica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPractice} onValueChange={setSelectedPractice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elige la práctica para ver y agregar registros..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                {acceptedApplications.map((practice) => (
                  <SelectItem key={practice.id} value={practice.id}>
                    {practice.title} - {practice.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedPractice && (
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {selectedPracticeInfo?.title}
              </h2>
              <p className="text-muted-foreground">{selectedPracticeInfo?.company}</p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Entrada de Registro
            </Button>
          </div>
        )}

        {showForm && selectedPractice && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Crear Entrada de Registro Diario</CardTitle>
              <p className="text-sm text-muted-foreground">
                Agregando registro para: {selectedPracticeInfo?.title} - {selectedPracticeInfo?.company}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horas Trabajadas</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Estado de Ánimo General</Label>
                  <Select value={formData.mood} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cómo estuvo tu día?" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="excellent">Excelente</SelectItem>
                      <SelectItem value="productive">Productivo</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="challenging">Desafiante</SelectItem>
                      <SelectItem value="difficult">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities">Actividades y Tareas</Label>
                  <Textarea
                    id="activities"
                    value={formData.activities}
                    onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                    placeholder="Describe en qué trabajaste hoy..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learnings">Aprendizajes Clave</Label>
                  <Textarea
                    id="learnings"
                    value={formData.learnings}
                    onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
                    placeholder="¿Qué aprendiste hoy?"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Desafíos y Soluciones</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    placeholder="¿Algún desafío que enfrentaste y cómo lo abordaste?"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Guardar Entrada de Registro</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Logs List */}
        {selectedPractice && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Historial de Registros</h3>
              <span className="text-sm text-muted-foreground">
                {filteredLogs.length} {filteredLogs.length === 1 ? 'entrada' : 'entradas'}
              </span>
            </div>
            
            {filteredLogs.map((log) => (
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
                        <span className="text-sm text-muted-foreground">{log.hours} horas</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.practice}</p>
                  </div>
                  {getMoodBadge(log.mood)}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Actividades y Tareas</h4>
                    <p className="text-sm">{log.activities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Aprendizajes Clave</h4>
                    <p className="text-sm">{log.learnings}</p>
                  </div>
                  
                  {log.challenges && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Desafíos y Soluciones</h4>
                      <p className="text-sm">{log.challenges}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            ))}
            
            {filteredLogs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No hay registros diarios grabados para esta práctica aún.</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Tu Primera Entrada de Registro
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!selectedPractice && (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Por favor selecciona una práctica arriba para ver y gestionar tus registros diarios.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DailyLogs;