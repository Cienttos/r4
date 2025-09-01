import express from 'express';
import cors from 'cors';
import { supabase, corsOptions } from '../../../lib/config.js'; // La ruta a lib/ es más profunda
import { authenticateToken } from '../../../lib/auth.js';

const app = express();

// Aplica middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticateToken); // Protege todos los métodos en este archivo

// Manejador para PUT /api/data/:tableName/:id
app.put('/api/data/:tableName/:id', async (req, res) => {
    const { tableName, id } = req.params;
    const updatedItem = req.body;
    try {
        const { data, error } = await supabase.from(tableName).update(updatedItem).eq('id', id).select();
        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al actualizar datos', details: error.message });
    }
});

// Manejador para DELETE /api/data/:tableName/:id
app.delete('/api/data/:tableName/:id', async (req, res) => {
    const { tableName, id } = req.params;
    try {
        // .delete() con { count: 'exact' } para saber si se borró algo
        const { error, count } = await supabase.from(tableName).delete({ count: 'exact' }).eq('id', id);
        if (error) throw error;
        if (count === 0) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }
        res.status(204).send(); // 204 No Content es la respuesta estándar para un DELETE exitoso
    } catch (error) {
        res.status(500).json({ error: 'Fallo al eliminar datos', details: error.message });
    }
});

// Captura métodos no permitidos
app.all('/api/data/:tableName/:id', (req, res) => {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).json({ error: `Método ${req.method} no permitido` });
});

export default app;
