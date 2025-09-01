import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();

// Configurar CORS para permitir tu frontend
app.use(cors({
  origin: 'https://fcp-two.vercel.app', // Cambiar al dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Middleware de errores
app.use(errorHandler);

// Exportar como Vercel Serverless Function
export default app;
