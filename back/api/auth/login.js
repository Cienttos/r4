import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, corsOptions } from '../../lib/config.js';

const app = express();

// Aplica la configuración de CORS y el parser de JSON
app.use(cors(corsOptions));
app.use(express.json());

// Simulación de base de datos de usuarios para el login
const users = [
  { id: 1, email: 'test@example.com', passwordHash: bcrypt.hashSync('password123', 10) },
];

// Ruta específica para el método POST
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

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

// Middleware para capturar cualquier otra solicitud a esta ruta y responder con un error 404.
// Vercel enrutará a este archivo solo para /api/auth/login, por lo que esto previene métodos no deseados.
app.all('/api/auth/login', (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
  // Si es POST pero no coincidió con la ruta de arriba (improbable), devuelve 404.
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Exporta la app de Express para que Vercel la maneje.
export default app;
