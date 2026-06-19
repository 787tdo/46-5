import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xklgxuxcadzkxwcdhxhu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbGd4dXhjYWR6a3h3Y2RoeGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MzE4ODUsImV4cCI6MjA5NzQwNzg4NX0.kjpHUD98_7vVomIxYMmEIfMYW4s5Cu9RmL1m4aT9pmY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Denuncia = {
  id?: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  municipio: string;
  autoridad: string;
  anonimo: boolean;
  nombre: string;
  contacto: string;
  folio: string;
  imagenes: string[];
  created_at?: string;
};
