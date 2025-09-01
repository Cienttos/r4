import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import errorHandler from './utils/errorHandler.js';
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['GET','POST','PUT','DELETE','OPTIONS'],
  origin: 'https://fcp-two.vercel.app', // tu frontend
});

const app = express();
app.use(express.json());
app.use(cors); // <-- importa CORS acá

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.use(errorHandler);

export default app;
