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
export default async function handler(req, res) {
  // 1. Aplica CORS y maneja la solicitud OPTIONS
  if (applyCors(req, res)) return;

  // 2. Verifica que el método sea POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // --- INICIO DE DEBUGGING ---
  // Vamos a registrar la información que llega para depurar el error 400.
  // Por favor, revisa los logs de tu función en el dashboard de Vercel.
  console.log('--- INICIO DE PETICIÓN DE LOGIN ---');
  console.log('Cabeceras recibidas:', JSON.stringify(req.headers, null, 2));
  console.log('Body (parseado por Vercel):', JSON.stringify(req.body, null, 2));
  // --- FIN DE DEBUGGING ---

  // 3. Procesa el login usando el body parseado por Vercel
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Error: Email o contraseña no encontrados en el body.');
    return res.status(400).json({ error: 'Email y contraseña son requeridos en el cuerpo de la solicitud' });
  }

  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    console.log(`Intento de login fallido para el email: ${email}`);
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  // 4. Genera y devuelve el token
  console.log(`Login exitoso para el email: ${email}`);
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
}