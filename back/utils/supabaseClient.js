import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Initialization (Hardcoded - NO RECOMENDADO para producción) ---
// En un entorno real, estas deberían ser variables de entorno de Vercel.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
