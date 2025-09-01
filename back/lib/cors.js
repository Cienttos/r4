const allowedOrigins = ['https://fcp-two.vercel.app', 'http://localhost:5173', 'http://localhost:3000'];

/**
 * Aplica las cabeceras CORS a la respuesta y maneja las solicitudes OPTIONS.
 * @param {import('http').IncomingMessage} req - El objeto de solicitud.
 * @param {import('http').ServerResponse} res - El objeto de respuesta.
 * @returns {boolean} - Devuelve `true` si la solicitud fue una petición OPTIONS (y ya se manejó), o `false` si se debe continuar con el procesamiento.
 */
export function applyCors(req, res) {
  const origin = req.headers.origin;

  // Solo añade la cabecera si el origen está en la lista blanca.
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Si es una solicitud preflight (OPTIONS), termina la ejecución aquí.
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // Indica que la solicitud ya fue manejada.
  }

  return false; // La solicitud debe seguir procesándose.
}
