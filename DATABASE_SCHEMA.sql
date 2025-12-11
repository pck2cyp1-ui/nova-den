-- DermaClinic Database Schema for Supabase
-- Run these queries in your Supabase SQL editor

-- 1. Create Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero VARCHAR(20) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(255),
  direccion TEXT,
  historial_medico TEXT,
  alergias TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  diagnostico TEXT NOT NULL,
  tratamiento TEXT NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  url VARCHAR(500),
  lesion_type VARCHAR(50) NOT NULL,
  body_location VARCHAR(100) NOT NULL,
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better query performance
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_photos_patient_id ON photos(patient_id);
CREATE INDEX idx_photos_consultation_id ON photos(consultation_id);

-- 5. Enable Row Level Security (RLS) for security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies (allow all operations for now - adjust for your auth setup)
CREATE POLICY "Allow public access to patients" ON patients
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Allow public access to consultations" ON consultations
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Allow public access to photos" ON photos
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- 7. Create storage bucket for dermatological photos
-- Note: Run this in Supabase dashboard -> Storage -> Create new bucket
-- Bucket name: derma-photos
-- Make it public: Yes

-- Optional: Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
