import express from 'express';
import cors from 'cors';
import { supabase } from '../utils/supabaseClient.js'; // Importar el cliente Supabase
import { protect } from '../utils/authMiddleware.js'; // Importar el middleware de autenticación

const app = express();

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// --- Configuración de CORS para esta función serverless específica ---
// Permite solicitudes desde 'https://fcp-two.vercel.app'
// Permite métodos GET, POST, PUT, DELETE, OPTIONS
// Incluye los headers Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers
app.use(cors({
  origin: 'https://fcp-two.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Manejar solicitudes OPTIONS (preflight) explícitamente
// Responde correctamente a solicitudes preflight OPTIONS con status 200.
app.options('*', cors());

// --- Rutas de Datos: /api/data/:tableName ---
// Todas estas rutas están protegidas por el middleware de autenticación.

/**
 * @route GET /api/data/:tableName
 * @description Obtener todos los elementos de una tabla específica.
 * @access Private (requiere autenticación)
 */
app.get('/:tableName', protect, async (req, res) => {
  const { tableName } = req.params;
  console.log(`Data: Solicitud GET para ${tableName} recibida`);
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
      console.error(`Data: Error al obtener datos de ${tableName}:`, error.message);
      return res.status(500).json({ error: 'Fallo al obtener datos', details: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(`Data: Error inesperado al obtener datos de ${tableName}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/**
 * @route GET /api/data/:tableName/:id
 * @description Obtener un elemento específico de una tabla por ID.
 * @access Private (requiere autenticación)
 */
app.get('/:tableName/:id', protect, async (req, res) => {
  const { tableName, id } = req.params;
  console.log(`Data: Solicitud GET para ${tableName} con ID ${id} recibida`);
  try {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
    if (error) {
      console.error(`Data: Error al obtener elemento de ${tableName} con ID ${id}:`, error.message);
      if (error.code === 'PGRST116') { // Supabase error code for no rows found
        return res.status(404).json({ error: 'Elemento no encontrado' });
      }
      return res.status(500).json({ error: 'Fallo al obtener elemento', details: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(`Data: Error inesperado al obtener elemento de ${tableName} con ID ${id}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/**
 * @route POST /api/data/:tableName
 * @description Crear un nuevo elemento en una tabla específica.
 * @access Private (requiere autenticación)
 */
app.post('/:tableName', protect, async (req, res) => {
  const { tableName } = req.params;
  const newItem = req.body;
  console.log(`Data: Solicitud POST para ${tableName} recibida con`, newItem);
  try {
    const { data, error } = await supabase.from(tableName).insert([newItem]).select();
    if (error) {
      console.error(`Data: Error al insertar datos en ${tableName}:`, error.message);
      return res.status(500).json({ error: 'Fallo al insertar datos', details: error.message });
    }
    res.status(201).json(data[0]); // Retorna el elemento creado
  } catch (error) {
    console.error(`Data: Error inesperado al insertar datos en ${tableName}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/**
 * @route PUT /api/data/:tableName/:id
 * @description Actualizar un elemento existente en una tabla por ID.
 * @access Private (requiere autenticación)
 */
app.put('/:tableName/:id', protect, async (req, res) => {
  const { tableName, id } = req.params;
  const updatedItem = req.body;
  console.log(`Data: Solicitud PUT para ${tableName} (ID: ${id}) recibida con`, updatedItem);
  try {
    const { data, error } = await supabase.from(tableName).update(updatedItem).eq('id', id).select();
    if (error) {
      console.error(`Data: Error al actualizar datos en ${tableName}:`, error.message);
      return res.status(500).json({ error: 'Fallo al actualizar datos', details: error.message });
    }
    if (data.length === 0) {
      console.log(`Data: Elemento con ID ${id} no encontrado en ${tableName}`);
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(200).json(data[0]); // Retorna el elemento actualizado
  } catch (error) {
    console.error(`Data: Error inesperado al actualizar datos en ${tableName}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/**
 * @route DELETE /api/data/:tableName/:id
 * @description Eliminar un elemento de una tabla por ID.
 * @access Private (requiere autenticación)
 */
app.delete('/:tableName/:id', protect, async (req, res) => {
  const { tableName, id } = req.params;
  console.log(`Data: Solicitud DELETE para ${tableName} (ID: ${id}) recibida`);
  try {
    const { error, count } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
      console.error(`Data: Error al eliminar datos de ${tableName}:`, error.message);
      return res.status(500).json({ error: 'Fallo al eliminar datos', details: error.message });
    }
    if (count === 0) {
      console.log(`Data: Elemento con ID ${id} no encontrado en ${tableName}`);
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    console.error(`Data: Error inesperado al eliminar datos de ${tableName}:`, error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Exportar la aplicación Express para Vercel
// Vercel detectará esta exportación y la usará como la función serverless para /api/data
export default app;