import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Features Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Todo Lo Que Necesitas Para El Éxito</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nuestra plataforma integral apoya cada paso de tu jornada de desarrollo profesional.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Encuentra Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explora cientos de oportunidades de práctica de las mejores empresas y organizaciones.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Aplicaciones Fáciles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aplica a múltiples posiciones con formularios simplificados y rastrea tu progreso.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Rastrea el Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitorea el estado de las aplicaciones y gestiona tu cronograma de práctica efectivamente.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Documenta el Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mantén registros diarios detallados de tus actividades, aprendizajes y logros.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo Para Comenzar Tu Jornada?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que están construyendo sus carreras a través de experiencias de práctica significativas.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/practices">
                Explorar Prácticas
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">
                Ver Panel
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
