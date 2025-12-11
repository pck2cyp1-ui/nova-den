import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">
            Gestiona la configuración de tu cuenta y clínica
          </p>
        </div>

        <Card>
          <CardContent className="pt-12 text-center">
            <SettingsIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Próximamente
            </h3>
            <p className="text-gray-600 mb-6">
              Esta sección está en desarrollo. Continúa iterando para completarla.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Volver al Dashboard
              </Button>
              <Button
                className="bg-primary-600 hover:bg-primary-700"
                disabled
              >
                Configurar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
