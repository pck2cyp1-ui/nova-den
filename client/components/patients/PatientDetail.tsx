import { Patient } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, AlertCircle, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";

interface PatientDetailProps {
  patient: Patient;
  onEdit?: () => void;
  consultationsCount?: number;
  photosCount?: number;
}

export function PatientDetail({
  patient,
  onEdit,
  consultationsCount = 0,
  photosCount = 0,
}: PatientDetailProps) {
  const age = patient.fecha_nacimiento
    ? new Date().getFullYear() - new Date(patient.fecha_nacimiento).getFullYear()
    : 0;

  const birthDate = patient.fecha_nacimiento
    ? format(new Date(patient.fecha_nacimiento), "d 'de' MMMM 'de' yyyy", {
        locale: es,
      })
    : "No especificado";

  const genderLabel = {
    masculino: "Masculino",
    femenino: "Femenino",
    otro: "Otro",
  }[patient.genero as keyof typeof genderLabel] || patient.genero;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {patient.nombre} {patient.apellido}
            </h1>
            <p className="text-gray-600 mt-1">
              {age} años • {genderLabel}
            </p>
          </div>
        </div>
        {onEdit && (
          <Button
            onClick={onEdit}
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Fecha de Nacimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-gray-900">{birthDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-primary-600">
              {consultationsCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Fotografías
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-primary-600">
              {photosCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="informacion" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="consultas">
            Consultas ({consultationsCount})
          </TabsTrigger>
          <TabsTrigger value="historial">Historial Médico</TabsTrigger>
        </TabsList>

        {/* Tab 1: Information */}
        <TabsContent value="informacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nombre Completo</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {patient.nombre} {patient.apellido}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Género</p>
                  <Badge variant="secondary">{genderLabel}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a
                      href={`mailto:${patient.email}`}
                      className="text-lg font-semibold text-primary-600 hover:underline"
                    >
                      {patient.email}
                    </a>
                  </div>
                </div>
              )}
              {patient.telefono && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a
                      href={`tel:${patient.telefono}`}
                      className="text-lg font-semibold text-primary-600 hover:underline"
                    >
                      {patient.telefono}
                    </a>
                  </div>
                </div>
              )}
              {patient.direccion && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {patient.direccion}
                    </p>
                  </div>
                </div>
              )}
              {!patient.email && !patient.telefono && !patient.direccion && (
                <p className="text-gray-600 text-sm">
                  Sin información de contacto
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Consultations */}
        <TabsContent value="consultas">
          <Card>
            <CardHeader>
              <CardTitle>Consultas Registradas</CardTitle>
              <CardDescription>
                Historial de todas las consultas de este paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {consultationsCount > 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p className="mb-4">
                    {consultationsCount} consulta
                    {consultationsCount !== 1 ? "s" : ""} registrada
                    {consultationsCount !== 1 ? "s" : ""}
                  </p>
                  <Link to={`/consultations/new/${patient.id}`}>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Nueva Consulta
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    No hay consultas registradas aún
                  </p>
                  <Link to={`/consultations/new/${patient.id}`}>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Crear Primera Consulta
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Medical History */}
        <TabsContent value="historial" className="space-y-4">
          {patient.alergias && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <CardTitle>Alergias</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 whitespace-pre-line">
                  {patient.alergias}
                </p>
              </CardContent>
            </Card>
          )}

          {patient.historial_medico && (
            <Card>
              <CardHeader>
                <CardTitle>Historial Médico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 whitespace-pre-line">
                  {patient.historial_medico}
                </p>
              </CardContent>
            </Card>
          )}

          {!patient.alergias && !patient.historial_medico && (
            <Card>
              <CardContent className="pt-6 text-center text-gray-600">
                Sin información médica registrada
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-600">
            Creado{" "}
            {formatDistanceToNow(new Date(patient.created_at), {
              addSuffix: true,
              locale: es,
            })}
            {" • "}
            Actualizado{" "}
            {formatDistanceToNow(new Date(patient.updated_at), {
              addSuffix: true,
              locale: es,
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
