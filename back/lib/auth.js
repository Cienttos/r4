import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

// Middleware de autenticación estándar para Express
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    // Adjunta el payload del token al objeto de solicitud para uso posterior
    req.user = user;
    next();
  });
};
