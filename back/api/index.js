import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

// --- Supabase Client Initialization ---
const supabaseUrl = 'https://hxtnofwbutoqhgqgqwzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dG5vZndidXRvcWhncWdxd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjI2MDIsImV4cCI6MjA3MTczODYwMn0.YosfWBP0CdM9f4IUp-nL42c41M_YWiLOH6xgpA1knWU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Middleware ---
app.use(cors()); // Permite todas las solicitudes de todos los orígenes
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// --- Rutas ---

// Ruta de Autenticación: /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json(data);
});

// Rutas de Datos: /api/data/:tableName (sin protección, para simplificar)
app.get('/api/data/:tableName', async (req, res) => {
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

app.post('/api/data/:tableName', async (req, res) => {
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

app.put('/api/data/:tableName/:id', async (req, res) => {
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

app.delete('/api/data/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  try {
    const { error, count } = await supabase.from(tableName).delete().eq('id', id);
    if (error) throw error;
    if (count === 0) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(`Error al eliminar datos de ${tableName}:`, error.message);
    res.status(500).json({ error: 'Fallo al eliminar datos', details: error.message });
  }
});

// --- Middleware de Manejo de Errores ---
app.use((err, req, res, next) => {
  console.error('Error Global:', err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Ocurrió un error inesperado',
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// --- Exportar la Aplicación Express para Vercel ---
export default app;