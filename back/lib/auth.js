import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

/**
 * Verifica el token JWT de la cabecera de autorización.
 * @param {import('http').IncomingMessage} req - El objeto de solicitud.
 * @returns {object|null} - El payload del usuario si el token es válido, o null si no lo es.
 */
export function authenticate(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return null;
    }

    // Verifica el token y devuelve el payload decodificado
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Si hay un error en la verificación (token expirado, inválido, etc.)
    return null;
  }
}