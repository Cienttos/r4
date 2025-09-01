/**
 * Middleware de manejo de errores centralizado para Express.
 * Captura errores que ocurren en la aplicación y envía una respuesta JSON apropiada.
 * Debe ser el último middleware agregado a la aplicación Express.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error Global Capturado:', err.stack); // Log completo del error para depuración

  // Determinar el código de estado HTTP
  const statusCode = err.statusCode || 500;

  // Enviar respuesta JSON
  res.status(statusCode).json({
    error: err.message || 'Ocurrió un error inesperado en el servidor',
    // Incluir detalles del stack solo en entornos que no sean de producción
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

export default errorHandler;
