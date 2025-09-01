import { supabase } from '../../lib/config.js';
import { authenticate } from '../../lib/auth.js';
import { applyCors } from '../../lib/cors.js';

/**
 * Manejador para obtener (GET) y crear (POST) recursos en una tabla dinámica.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  // 1. Aplica CORS y maneja la solicitud OPTIONS
  if (applyCors(req, res)) return;

  // 2. Autentica el token JWT
  const user = authenticate(req);
  if (!user) {
    return res.status(401).json({ error: 'Token inválido o no proporcionado' });
  }

  // El nombre de la tabla viene del nombre del archivo: /api/data/projects -> req.query.tableName = 'projects'
  const { tableName } = req.query;

  // 3. Enruta según el método HTTP
  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) throw error;
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: `Fallo al obtener datos de '${tableName}'`, details: error.message });
      }

    case 'POST':
      try {
        const { data, error } = await supabase.from(tableName).insert([req.body]).select();
        if (error) throw error;
        return res.status(201).json(data[0]);
      } catch (error) {
        return res.status(500).json({ error: `Fallo al insertar datos en '${tableName}'`, details: error.message });
      }

    default:
      // Si no es GET o POST, devuelve error 405
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}