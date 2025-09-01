import { supabase } from './config.js';

/**
 * Verifica el token JWT de la cabecera de autorización usando Supabase.
 * @param {import('@vercel/node').VercelRequest} req - El objeto de solicitud.
 * @returns {Promise<object|null>} - El payload del usuario si el token es válido, o null si no lo es.
 */
export async function authenticate(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return null;
  }

  return data.user;
}
