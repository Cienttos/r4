import { createClient } from '@supabase/supabase-js';

// 1. Configuración de Supabase
const supabaseUrl = 'https://hxtnofwbutoqhgqgqwzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dG5vZndidXRvcWhncWdxd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjI2MDIsImV4cCI6MjA3MTczODYwMn0.YosfWBP0CdM9f4IUp-nL42c41M_YWiLOH6xgpA1knWU';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Secreto para JWT
export const JWT_SECRET = '19d8f6196dd78d942e8f2eedf779bce87e5b1d16752b307e5fe8d47c27cf3eff5d8f28dd057520176393d265eb33432592b4051b560113827645f3731b912408';

// 3. Configuración de CORS
const allowedOrigins = ['https://fcp-two.vercel.app', 'http://localhost:5173', 'http://localhost:3000'];
export const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes sin 'origin' (como las de Postman o apps móviles) y las de la lista blanca.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
