import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Patient } from "@shared/api";
import { User, Mail, Phone, CalendarDays } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
  onEdit?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function PatientCard({ patient, onEdit, onClick }: PatientCardProps) {
  const age = patient.fecha_nacimiento
    ? new Date().getFullYear() - new Date(patient.fecha_nacimiento).getFullYear()
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="flex-1"
            onClick={() => onClick?.(patient.id)}
          >
            <CardTitle className="text-lg">
              {patient.nombre} {patient.apellido}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              ID: {patient.id.substring(0, 8)}...
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {age} años
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Contact Information */}
        <div className="space-y-2 text-sm">
          {patient.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-primary-600" />
              <span>{patient.email}</span>
            </div>
          )}
          {patient.telefono && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-primary-600" />
              <span>{patient.telefono}</span>
            </div>
          )}
          {patient.genero && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4 text-primary-600" />
              <span className="capitalize">{patient.genero}</span>
            </div>
          )}
        </div>

        {/* Medical Information */}
        {(patient.alergias || patient.historial_medico) && (
          <div className="pt-2 border-t border-gray-200 space-y-2 text-xs">
            {patient.alergias && (
              <div>
                <span className="font-semibold text-gray-700">Alergias: </span>
                <span className="text-gray-600 line-clamp-2">
                  {patient.alergias}
                </span>
              </div>
            )}
            {patient.historial_medico && (
              <div>
                <span className="font-semibold text-gray-700">Historial: </span>
                <span className="text-gray-600 line-clamp-2">
                  {patient.historial_medico}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Updated timestamp */}
        <div className="pt-2 border-t border-gray-200 flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="h-3 w-3" />
          Actualizado{" "}
          {formatDistanceToNow(new Date(patient.updated_at), {
            addSuffix: true,
            locale: es,
          })}
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2">
          <Link to={`/patients/${patient.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              Ver Detalles
            </Button>
          </Link>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(patient.id);
              }}
            >
              Editar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
