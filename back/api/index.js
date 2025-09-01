import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import dataRoutes from '../routes/dataRoutes.js';
import errorHandler from '../utils/errorHandler.js';

const app = express();

// Middleware

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Error handling middleware
app.use(errorHandler);

// Export as a Vercel Serverless Function
export default app;
