import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { PatientForm } from "@/components/patients/PatientForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { patientService } from "@/lib/services/patientService";
import { CreatePatientDTO } from "@shared/api";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NewPatientPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreatePatientDTO) => {
    setIsLoading(true);
    try {
      const newPatient = await patientService.createPatient(data);
      navigate(`/patients/${newPatient.id}`);
    } catch (err) {
      console.error("Error creating patient:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/patients");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Nuevo Paciente
            </h1>
            <p className="text-gray-600 mt-1">
              Registra un nuevo paciente en el sistema
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>
              Completa todos los campos obligatorios marcados con *
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
