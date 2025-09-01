import express from 'express';
import cors from 'cors'; // Importar el paquete cors
import { createClient } from '@supabase/supabase-js'; // Asumiendo que ya tienes esto
import jwt from 'jsonwebtoken'; // Para JWT
import bcrypt from 'bcryptjs'; // Para hashing de contraseñas

const app = express();

// --- Supabase Client Initialization (Hardcoded - NO RECOMENDADO para producción) ---
// En un entorno real, estas deberían ser variables de entorno de Vercel.
const supabaseUrl = 'https://hxtnofwbutoqhgqgqwzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dG5vZndidXRvcWhncWdxd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjI2MDIsImV4cCI6MjA3MTczODYwMn0.YosfWBP0CdM9f4IUp-nL42c41M_YWiLOH6xgpA1knWU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- JWT Secret (Hardcoded - NO RECOMENDADO para producción) ---
const JWT_SECRET = 'your_jwt_secret_key_very_strong_and_random'; // ¡CAMBIA ESTO!

// --- Middleware ---
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// --- Configuración de CORS ---
// Esto manejará las solicitudes preflight (OPTIONS) y agregará los headers necesarios.
app.use(cors({
  origin: 'https://fcp-two.vercel.app', // Solo permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true // Si necesitas enviar cookies o headers de autorización
}));

// --- Middleware de Autenticación ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user; // Adjunta la información del usuario a la solicitud
    next();
  });
};

// --- Simulación de Datos de Usuario (para login) ---
// En una aplicación real, esto vendría de una base de datos (ej. tabla de autenticación de Supabase)
const users = [
  { id: 1, email: 'test@example.com', passwordHash: bcrypt.hashSync('password123', 10) },
];

// --- Rutas de Ejemplo ---

// Ruta de Autenticación: /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Inicio de sesión exitoso', token });
});

// Rutas de Datos: /api/data/:tableName (Protegidas por autenticación)
app.get('/api/data/:tableName', authenticateToken, async (req, res) => {
  const { tableName } = req.params;
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error al obtener datos de ${tableName}:`, error.message);
    res.status(500).json({ error: 'Fallo al obtener datos', details: error.message });
  }
});

app.post('/api/data/:tableName', authenticateToken, async (req, res) => {
  const { tableName } = req.params;
  const newItem = req.body;
  try {
    const { data, error } = await supabase.from(tableName).insert([newItem]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error(`Error al insertar datos en ${tableName}:`, error.message);
    res.status(500).json({ error: 'Fallo al insertar datos', details: error.message });
  }
});

app.put('/api/data/:tableName/:id', authenticateToken, async (req, res) => {
  const { tableName, id } = req.params;
  const updatedItem = req.body;
  try {
    const { data, error } = await supabase.from(tableName).update(updatedItem).eq('id', id).select();
    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(200).json(data[0]);
  } catch (error) {
    console.error(`Error al actualizar datos en ${tableName}:`, error.message);
    res.status(500).json({ error: 'Fallo al actualizar datos', details: error.message });
  }
});

app.delete('/api/data/:tableName/:id', authenticateToken, async (req, res) => {
  const { tableName, id } = req.params;
  try {
    const { error, count } = await supabase.from(tableName).delete().eq('id', id);
    if (error) throw error;
    if (count === 0) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    console.error(`Error al eliminar datos de ${tableName}:`, error.message);
    res.status(500).json({ error: 'Fallo al eliminar datos', details: error.message });
  }
});

// --- Middleware de Manejo de Errores (siempre al final) ---
app.use((err, req, res, next) => {
  console.error('Error Global:', err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Ocurrió un error inesperado',
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// --- Exportar la Aplicación Express para Vercel ---
export default app;