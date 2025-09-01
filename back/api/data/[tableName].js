import express from 'express';
import cors from 'cors';
import { supabase, corsOptions } from '../../lib/config.js';
import { authenticateToken } from '../../lib/auth.js';

const app = express();

// Aplica middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticateToken); // Protege todos los métodos en este archivo

// Manejador para GET /api/data/:tableName
app.get('/api/data/:tableName', async (req, res) => {
    const { tableName } = req.params;
    try {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener datos', details: error.message });
    }
});

// Manejador para POST /api/data/:tableName
app.post('/api/data/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const newItem = req.body;
    try {
        const { data, error } = await supabase.from(tableName).insert([newItem]).select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al insertar datos', details: error.message });
    }
});

// Captura métodos no permitidos
app.all('/api/data/:tableName', (req, res) => {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Método ${req.method} no permitido` });
});

export default app;
