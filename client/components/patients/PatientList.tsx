import { useState, useEffect } from "react";
import { PatientCard } from "./PatientCard";
import { Patient } from "@shared/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PatientListProps {
  patients: Patient[];
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onNewPatient?: () => void;
  onEditPatient?: (id: string) => void;
}

export function PatientList({
  patients: initialPatients,
  isLoading = false,
  error = null,
  onRefresh,
  onNewPatient,
  onEditPatient,
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(initialPatients);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = initialPatients.filter(
      (patient) =>
        patient.nombre.toLowerCase().includes(query) ||
        patient.apellido.toLowerCase().includes(query) ||
        patient.email?.toLowerCase().includes(query) ||
        patient.id.includes(query)
    );
    setFilteredPatients(filtered);
  }, [searchQuery, initialPatients]);

  if (isLoading && initialPatients.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Cargando pacientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar pacientes: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (initialPatients.length === 0 && !searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-3 bg-primary-50 rounded-full mb-4">
          <Plus className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sin Pacientes
        </h3>
        <p className="text-gray-600 mb-6">
          Comienza creando tu primer paciente
        </p>
        {onNewPatient && (
          <Button
            onClick={onNewPatient}
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Paciente
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar paciente por nombre, email o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {onRefresh && (
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={isLoading}
            >
              Actualizar
            </Button>
          )}
          {onNewPatient && (
            <Button
              onClick={onNewPatient}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Paciente
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredPatients.length} de {initialPatients.length} paciente
        {initialPatients.length !== 1 ? "s" : ""}
        {searchQuery && ` (filtrados)`}
      </div>

      {/* Patient Grid */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={onEditPatient}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Sin resultados
          </h3>
          <p className="text-gray-600">
            No se encontraron pacientes con "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
