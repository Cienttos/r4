import { supabase } from './supabaseClient.js';

/**
 * Middleware para proteger rutas.
 * Verifica la presencia y validez de un token Bearer en el header Authorization
 * utilizando el cliente Supabase.
 * Si el token es válido, adjunta la información del usuario a req.user y pasa al siguiente middleware.
 * Si el token es inválido o no está presente, responde con un error 401.
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token usando Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error) {
        console.error('AuthMiddleware: Error de autenticación de Supabase:', error.message);
        return res.status(401).json({ error: 'No autorizado, token inválido o expirado' });
      }

      // Adjuntar usuario a la solicitud
      req.user = user;
      next();
    } catch (error) {
      console.error('AuthMiddleware: Error en el middleware de autenticación:', error.message);
      res.status(401).json({ error: 'No autorizado, token fallido' });
    }
  } else {
    res.status(401).json({ error: 'No autorizado, no se proporcionó token' });
  }
};

