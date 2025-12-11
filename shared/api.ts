/**
 * Shared types between client and server
 * DermaClinic - Dermatological clinical management system
 */

export interface DemoResponse {
  message: string;
}

/* ============= PATIENT TYPES ============= */

export type Gender = "masculino" | "femenino" | "otro";

export interface Patient {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: Gender;
  telefono?: string;
  email?: string;
  direccion?: string;
  historial_medico?: string;
  alergias?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientDTO {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: Gender;
  telefono?: string;
  email?: string;
  direccion?: string;
  historial_medico?: string;
  alergias?: string;
}

export interface UpdatePatientDTO extends Partial<CreatePatientDTO> {}

/* ============= CONSULTATION TYPES ============= */

export interface Consultation {
  id: string;
  patient_id: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateConsultationDTO {
  patient_id: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  notas?: string;
}

export interface UpdateConsultationDTO extends Partial<CreateConsultationDTO> {}

/* ============= PHOTO TYPES ============= */

export type LesionType =
  | "melanoma"
  | "nevus"
  | "psoriasis"
  | "eczema"
  | "acne"
  | "dermatitis"
  | "verrugas"
  | "otro";

export type BodyLocation =
  | "cabeza"
  | "cuello"
  | "torax"
  | "espalda"
  | "abdomen"
  | "brazo_izquierdo"
  | "brazo_derecho"
  | "antebrazo_izquierdo"
  | "antebrazo_derecho"
  | "mano_izquierda"
  | "mano_derecha"
  | "pierna_izquierda"
  | "pierna_derecha"
  | "muslo_izquierdo"
  | "muslo_derecho"
  | "pantorrilla_izquierda"
  | "pantorrilla_derecha"
  | "pie_izquierdo"
  | "pie_derecho"
  | "otro";

export interface Photo {
  id: string;
  consultation_id: string;
  patient_id: string;
  url: string;
  lesion_type: LesionType;
  body_location: BodyLocation;
  description?: string;
  file_path: string;
  created_at: string;
}

export interface CreatePhotoDTO {
  consultation_id: string;
  patient_id: string;
  lesion_type: LesionType;
  body_location: BodyLocation;
  description?: string;
}

/* ============= CONSTANTS ============= */

export const LESION_TYPE_OPTIONS = [
  { value: "melanoma", label: "Melanoma" },
  { value: "nevus", label: "Nevus/Lunar" },
  { value: "psoriasis", label: "Psoriasis" },
  { value: "eczema", label: "Eczema" },
  { value: "acne", label: "Acné" },
  { value: "dermatitis", label: "Dermatitis" },
  { value: "verrugas", label: "Verrugas" },
  { value: "otro", label: "Otro" },
];

export const BODY_LOCATION_OPTIONS = [
  { value: "cabeza", label: "Cabeza" },
  { value: "cuello", label: "Cuello" },
  { value: "torax", label: "Tórax" },
  { value: "espalda", label: "Espalda" },
  { value: "abdomen", label: "Abdomen" },
  { value: "brazo_izquierdo", label: "Brazo Izquierdo" },
  { value: "brazo_derecho", label: "Brazo Derecho" },
  { value: "antebrazo_izquierdo", label: "Antebrazo Izquierdo" },
  { value: "antebrazo_derecho", label: "Antebrazo Derecho" },
  { value: "mano_izquierda", label: "Mano Izquierda" },
  { value: "mano_derecha", label: "Mano Derecha" },
  { value: "pierna_izquierda", label: "Pierna Izquierda" },
  { value: "pierna_derecha", label: "Pierna Derecha" },
  { value: "muslo_izquierdo", label: "Muslo Izquierdo" },
  { value: "muslo_derecho", label: "Muslo Derecho" },
  { value: "pantorrilla_izquierda", label: "Pantorrilla Izquierda" },
  { value: "pantorrilla_derecha", label: "Pantorrilla Derecha" },
  { value: "pie_izquierdo", label: "Pie Izquierdo" },
  { value: "pie_derecho", label: "Pie Derecho" },
  { value: "otro", label: "Otro" },
];

export const GENDER_OPTIONS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro" },
];
