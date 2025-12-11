import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreatePatientDTO,
  GENDER_OPTIONS,
  type Patient,
} from "@shared/api";
import { useState } from "react";

interface PatientFormProps {
  onSubmit: (data: CreatePatientDTO) => Promise<void>;
  initialData?: Patient;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function PatientForm({
  onSubmit,
  initialData,
  isLoading = false,
  onCancel,
}: PatientFormProps) {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePatientDTO>({
    defaultValues: initialData
      ? {
          nombre: initialData.nombre,
          apellido: initialData.apellido,
          fecha_nacimiento: initialData.fecha_nacimiento,
          genero: initialData.genero,
          telefono: initialData.telefono,
          email: initialData.email,
          direccion: initialData.direccion,
          historial_medico: initialData.historial_medico,
          alergias: initialData.alergias,
        }
      : undefined,
  });

  const genero = watch("genero");

  const handleFormSubmit = async (data: CreatePatientDTO) => {
    setError(null);
    try {
      await onSubmit(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al guardar el paciente"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Información Personal</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              placeholder="Juan"
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
              className={errors.nombre ? "border-red-500" : ""}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido *</Label>
            <Input
              id="apellido"
              placeholder="Pérez"
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
              className={errors.apellido ? "border-red-500" : ""}
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm">{errors.apellido.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento *</Label>
            <Input
              id="fecha_nacimiento"
              type="date"
              {...register("fecha_nacimiento", {
                required: "La fecha de nacimiento es obligatoria",
              })}
              className={errors.fecha_nacimiento ? "border-red-500" : ""}
            />
            {errors.fecha_nacimiento && (
              <p className="text-red-500 text-sm">
                {errors.fecha_nacimiento.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="genero">Género *</Label>
            <Select
              value={genero}
              onValueChange={(value) =>
                setValue("genero", value as CreatePatientDTO["genero"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genero && (
              <p className="text-red-500 text-sm">{errors.genero.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Información de Contacto</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="paciente@example.com"
              {...register("email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              placeholder="+34 600 000 000"
              {...register("telefono")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            placeholder="Calle Principal, 123"
            {...register("direccion")}
          />
        </div>
      </div>

      {/* Medical Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Información Médica</h3>

        <div className="space-y-2">
          <Label htmlFor="alergias">Alergias</Label>
          <Textarea
            id="alergias"
            placeholder="Descripción de alergias conocidas..."
            rows={3}
            {...register("alergias")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="historial_medico">Historial Médico</Label>
          <Textarea
            id="historial_medico"
            placeholder="Antecedentes médicos relevantes..."
            rows={4}
            {...register("historial_medico")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary-600 hover:bg-primary-700"
        >
          {isLoading
            ? "Guardando..."
            : initialData
              ? "Actualizar Paciente"
              : "Crear Paciente"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
