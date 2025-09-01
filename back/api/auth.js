import express from 'express';
import cors from 'cors';
import { supabase } from '../utils/supabaseClient.js'; // Importar el cliente Supabase

const app = express();

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// --- Configuración de CORS para esta función serverless específica ---
// Permite solicitudes desde 'https://fcp-two.vercel.app'
// Permite métodos GET, POST, PUT, DELETE, OPTIONS
// Incluye los headers Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers
app.use(cors({
  origin: 'https://fcp-two.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Manejar solicitudes OPTIONS (preflight) explícitamente
// Responde correctamente a solicitudes preflight OPTIONS con status 200.
app.options('*', cors());

/**
 * @route POST /api/auth/login
 * @description Inicia sesión de un usuario con email y contraseña.
 * @access Public
 */
app.post('/login', async (req, res) => {
  console.log('Auth: Solicitud de login recibida');
  const { email, password } = req.body;

  try {
    // Usar el método de Supabase para iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Auth: Error en el login de Supabase:', error.message);
      // Manejar errores específicos de Supabase
      if (error.message.includes('Invalid login credentials')) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }
      return res.status(500).json({ error: 'Fallo en el inicio de sesión', details: error.message });
    }

    console.log('Auth: Login exitoso para', data.user.email);
    // Retornar el token de sesión y la información del usuario
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: data.user, session: data.session });
  } catch (error) {
    console.error('Auth: Error inesperado en el login:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/**
 * @route POST /api/auth/signup
 * @description Registra un nuevo usuario con email y contraseña.
 * @access Public
 */
app.post('/signup', async (req, res) => {
  console.log('Auth: Solicitud de registro recibida');
  const { email, password } = req.body;

  try {
    // Usar el método de Supabase para registrar un nuevo usuario
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Auth: Error en el registro de Supabase:', error.message);
      // Manejar errores específicos de Supabase, por ejemplo, usuario ya existe
      if (error.message.includes('User already registered')) {
        return res.status(409).json({ error: 'El usuario ya está registrado' });
      }
      return res.status(500).json({ error: 'Fallo en el registro', details: error.message });
    }

    console.log('Auth: Registro exitoso para', data.user.email);
    // Retornar la información del usuario y la sesión (si se inicia sesión automáticamente)
    res.status(201).json({ message: 'Registro exitoso', user: data.user, session: data.session });
  } catch (error) {
    console.error('Auth: Error inesperado en el registro:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Exportar la aplicación Express para Vercel
// Vercel detectará esta exportación y la usará como la función serverless para /api/auth
export default app;