import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PatientList } from "@/components/patients/PatientList";
import { patientService } from "@/lib/services/patientService";
import { Patient } from "@shared/api";
import { useNavigate } from "react-router-dom";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar los pacientes"
      );
      console.error("Error loading patients:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPatient = () => {
    navigate("/patients/new");
  };

  const handleEditPatient = (id: string) => {
    navigate(`/patients/${id}/edit`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600 mt-1">
            Gestiona y visualiza todos los pacientes registrados
          </p>
        </div>

        <PatientList
          patients={patients}
          isLoading={isLoading}
          error={error}
          onRefresh={loadPatients}
          onNewPatient={handleNewPatient}
          onEditPatient={handleEditPatient}
        />
      </div>
    </MainLayout>
  );
}
