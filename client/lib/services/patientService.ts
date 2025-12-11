import supabase from "../supabase";
import type { Patient, CreatePatientDTO, UpdatePatientDTO } from "@shared/api";

export const patientService = {
  async getAllPatients(): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw new Error(
          `Error al cargar pacientes: ${error.message || "Error desconocido"}`
        );
      }
      return data || [];
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },

  async getPatientById(id: string): Promise<Patient | null> {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
        });
        throw new Error(`Error al cargar paciente: ${error.message}`);
      }
      return data || null;
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },

  async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
    try {
      const { data, error } = await supabase
        .from("patients")
        .insert([patientData])
        .select()
        .single();

      if (error) {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw new Error(
          `Error al crear paciente: ${error.message || "Error desconocido"}`
        );
      }
      return data;
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },

  async updatePatient(id: string, patientData: UpdatePatientDTO): Promise<Patient> {
    try {
      const { data, error } = await supabase
        .from("patients")
        .update(patientData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
        });
        throw new Error(`Error al actualizar paciente: ${error.message}`);
      }
      return data;
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },

  async deletePatient(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("patients")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
        });
        throw new Error(`Error al eliminar paciente: ${error.message}`);
      }
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },

  async searchPatients(query: string): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .or(
          `nombre.ilike.%${query}%,apellido.ilike.%${query}%,email.ilike.%${query}%`
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error details:", {
          code: error.code,
          message: error.message,
        });
        throw new Error(`Error al buscar pacientes: ${error.message}`);
      }
      return data || [];
    } catch (err) {
      console.error("Patient service error:", err);
      throw err;
    }
  },
};
