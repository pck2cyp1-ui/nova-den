import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galería</h1>
          <p className="text-gray-600 mt-1">
            Visualiza todas las fotografías dermatológicas registradas
          </p>
        </div>

        <Card>
          <CardContent className="pt-12 text-center">
            <Images className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Próximamente
            </h3>
            <p className="text-gray-600 mb-6">
              Esta sección está en desarrollo. Continúa iterando para completarla.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/patients")}
              >
                Ver Pacientes
              </Button>
              <Button
                className="bg-primary-600 hover:bg-primary-700"
                disabled
              >
                Filtrar Fotos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
