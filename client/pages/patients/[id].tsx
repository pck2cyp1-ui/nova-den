import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { PatientDetail } from "@/components/patients/PatientDetail";
import { patientService } from "@/lib/services/patientService";
import { Patient } from "@shared/api";
import { AlertCircle } from "lucide-react";

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    if (!id) {
      setError("ID de paciente inválido");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatientById(id);
      if (!data) {
        setError("Paciente no encontrado");
      } else {
        setPatient(data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar el paciente"
      );
      console.error("Error loading patient:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/patients/${id}/edit`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Cargando paciente...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !patient) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {error || "Paciente no encontrado"}
            </h2>
            <p className="text-gray-600 mb-6">
              El paciente que buscas no existe o ha sido eliminado.
            </p>
            <button
              onClick={() => navigate("/patients")}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Volver a Pacientes
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PatientDetail
        patient={patient}
        onEdit={handleEdit}
        consultationsCount={0}
        photosCount={0}
      />
    </MainLayout>
  );
}
