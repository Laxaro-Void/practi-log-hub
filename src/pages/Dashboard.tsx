import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Building,
  MapPin,
  ArrowUpDown,
  Briefcase,
  Users
} from "lucide-react";
import { useApplications } from "@/contexts/ApplicationContext";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { practices } from "@/pages/Practices/data.json";

const Dashboard = () => {
  const { applications } = useApplications();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("date");
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);

  const sortedApplications = useMemo(() => {
    const sorted = [...applications];
    
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "date":
        return sorted.sort((a, b) => {
          const dateA = new Date(a.appliedDate);
          const dateB = new Date(b.appliedDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "status":
        const statusOrder = { accepted: 0, under_review: 1, rejected: 2 };
        return sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      default:
        return sorted;
    }
  }, [applications, sortBy]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Aceptado</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rechazado</Badge>;
      case "under_review":
        return <Badge className="bg-warning text-warning-foreground"><AlertCircle className="h-3 w-3 mr-1" />En Revisión</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const underReviewCount = applications.filter(app => app.status === "under_review").length;
  const totalApplications = applications.length;

  const handleViewDetails = (applicationId: string) => {
    setSelectedApplication(applicationId);
    setShowDetailsDialog(true);
  };

  const handleCancelApplication = (applicationId: string) => {
    // TODO: Implementar lógica para cancelar aplicación
    console.log("Cancelar aplicación:", applicationId);
  };

  const selectedPracticeDetails = useMemo(() => {
    if (!selectedApplication) return null;
    const app = applications.find(a => a.id === selectedApplication);
    if (!app) return null;
    return practices.find(p => p.id === app.id);
  }, [selectedApplication, applications]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
          <p className="text-muted-foreground">Rastrea tus aplicaciones y gestiona tu jornada de práctica.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aplicaciones Totales</p>
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
                  <p className="text-sm font-medium text-muted-foreground">En Revisión</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Aceptadas</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Prácticas Activas</p>
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
            <div className="flex items-center justify-between">
              <CardTitle>Tus Aplicaciones</CardTitle>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="date">Fecha de Aplicación</SelectItem>
                    <SelectItem value="status">Estado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedApplications.map((application) => (
                <div 
                  key={application.id} 
                  className="border rounded-lg p-4 hover:shadow-card transition-shadow cursor-pointer"
                  onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                >
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
                          Aplicado {application.appliedDate}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                  
                  {application.status === "under_review" && expandedApplication !== application.id && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progreso de Aplicación</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>
                  )}

                  {expandedApplication === application.id && (
                    <>
                      {application.status === "under_review" && (
                        <>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progreso de Aplicación</span>
                              <span>{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" onClick={() => handleViewDetails(application.id)}>
                              Ver Detalles
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelApplication(application.id)}
                            >
                              Cancelar Aplicación
                            </Button>
                          </div>
                        </>
                      )}
                      
                      {application.status === "accepted" && (
                        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" onClick={() => handleViewDetails(application.id)}>
                            Ver Detalles
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              localStorage.setItem('selectedPractice', JSON.stringify({
                                id: application.id,
                                title: application.title,
                                company: application.company
                              }));
                              navigate("/logs");
                            }}
                          >
                            Iniciar Registros Diarios
                          </Button>
                        </div>
                      )}

                      {application.status === "rejected" && (
                        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(application.id)}>
                            Ver Detalles
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de la Práctica</DialogTitle>
              <DialogDescription>
                Información completa sobre esta oportunidad de práctica
              </DialogDescription>
            </DialogHeader>
            {selectedPracticeDetails && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedPracticeDetails.title}</h3>
                  <p className="text-muted-foreground">{selectedPracticeDetails.company}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Ubicación</p>
                      <p className="text-sm text-muted-foreground">{selectedPracticeDetails.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Empresa</p>
                      <p className="text-sm text-muted-foreground">{selectedPracticeDetails.company}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Duración</p>
                      <p className="text-sm text-muted-foreground">{selectedPracticeDetails.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tipo</p>
                      <p className="text-sm text-muted-foreground">{selectedPracticeDetails.type}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Descripción</p>
                  <p className="text-sm text-muted-foreground">{selectedPracticeDetails.description}</p>
                </div>

                <div>
                  <p className="font-medium mb-2">Requisitos</p>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedPracticeDetails.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Fecha límite: {selectedPracticeDetails.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedPracticeDetails.spots} plazas disponibles
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;