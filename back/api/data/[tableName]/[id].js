import { supabase } from '../../../lib/config.js';
import { authenticate } from '../../../lib/auth.js';
import { applyCors } from '../../../lib/cors.js';

/**
 * Manejador para actualizar (PUT) y eliminar (DELETE) un recurso específico por su ID.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  // 1. Aplica CORS y maneja la solicitud OPTIONS
  if (applyCors(req, res)) return;

  // 2. Autentica el token JWT
  const user = await authenticate(req);
  if (!user) {
    return res.status(401).json({ error: 'Token inválido o no proporcionado' });
  }

  // Los parámetros dinámicos vienen de la estructura de carpetas
  const { tableName, id } = req.query;

  // 3. Enruta según el método HTTP
  switch (req.method) {
    case 'PUT':
      try {
        const { data, error } = await supabase.from(tableName).update(req.body).eq('id', id).select();
        if (error) throw error;
        if (!data || data.length === 0) {
          return res.status(404).json({ error: 'Elemento no encontrado' });
        }
        return res.status(200).json(data[0]);
      } catch (error) {
        return res.status(500).json({ error: `Fallo al actualizar el elemento con id '${id}'`, details: error.message });
      }

    case 'DELETE':
      try {
        const { error, count } = await supabase.from(tableName).delete({ count: 'exact' }).eq('id', id);
        if (error) throw error;
        if (count === 0) {
          return res.status(404).json({ error: 'Elemento no encontrado' });
        }
        return res.status(204).end(); // No Content
      } catch (error) {
        return res.status(500).json({ error: `Fallo al eliminar el elemento con id '${id}'`, details: error.message });
      }

    default:
      // Si no es PUT o DELETE, devuelve error 405
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}