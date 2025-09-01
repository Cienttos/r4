import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../lib/config.js';
import { applyCors } from '../../lib/cors.js';

// Datos de usuario en memoria (solo para demostración)
const users = [
  { id: 1, email: 'test@example.com', passwordHash: bcrypt.hashSync('password123', 10) },
];

/**
 * Manejador para la autenticación de usuarios.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default function handler(req, res) {
  // 1. Aplica CORS y maneja la solicitud OPTIONS
  if (applyCors(req, res)) return;

  // 2. Verifica que el método sea POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // 3. Procesa el login
  // Vercel ya parsea el body por nosotros si el Content-Type es application/json
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  // 4. Genera y devuelve el token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
}