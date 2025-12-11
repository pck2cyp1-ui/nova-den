import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientCard } from "@/components/patients/PatientCard";
import { patientService } from "@/lib/services/patientService";
import { Patient } from "@shared/api";
import {
  Users,
  FileText,
  Images,
  TrendingUp,
  Plus,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const recentPatients = patients.slice(0, 3);

  const stats = [
    {
      title: "Total Pacientes",
      value: patients.length,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Consultas Totales",
      value: 0, // Would be calculated from consultations table
      icon: FileText,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Fotografías",
      value: 0, // Would be calculated from photos table
      icon: Images,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Tasa de Crecimiento",
      value: "18%",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Bienvenido a DermaClinic - Sistema de Gestión Clínica
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/patients/new">
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Paciente
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-600" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Atajos para las tareas más comunes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/patients/new">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-4 flex flex-col items-start hover:bg-primary-50 hover:border-primary-300"
                >
                  <Plus className="h-5 w-5 text-primary-600 mb-2" />
                  <span className="font-semibold text-gray-900">
                    Nuevo Paciente
                  </span>
                  <span className="text-xs text-gray-600">
                    Registrar paciente nuevo
                  </span>
                </Button>
              </Link>

              <Link to="/patients">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-4 flex flex-col items-start hover:bg-primary-50 hover:border-primary-300"
                >
                  <Users className="h-5 w-5 text-primary-600 mb-2" />
                  <span className="font-semibold text-gray-900">
                    Ver Pacientes
                  </span>
                  <span className="text-xs text-gray-600">
                    Lista completa de pacientes
                  </span>
                </Button>
              </Link>

              <Button
                variant="outline"
                disabled
                className="w-full justify-start h-auto py-4 px-4 flex flex-col items-start opacity-50"
              >
                <FileText className="h-5 w-5 text-gray-400 mb-2" />
                <span className="font-semibold text-gray-900">
                  Nueva Consulta
                </span>
                <span className="text-xs text-gray-600">
                  Crear consulta médica
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pacientes Recientes</h2>
            <p className="text-gray-600 text-sm mt-1">
              Últimos pacientes registrados
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
                <p className="mt-4 text-gray-600">Cargando pacientes...</p>
              </div>
            </div>
          ) : recentPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sin Pacientes
                </h3>
                <p className="text-gray-600 mb-6">
                  Comienza creando tu primer paciente
                </p>
                <Link to="/patients/new">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Paciente
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {patients.length > 3 && (
            <div className="mt-4 text-center">
              <Link to="/patients">
                <Button variant="outline">
                  Ver Todos los Pacientes ({patients.length})
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
