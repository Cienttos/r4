import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', (req, res, next) => { console.log('Auth route hit'); next(); }, authRoutes);
app.use('/api/data', (req, res, next) => { console.log('Data route hit'); next(); }, dataRoutes); // All data-related routes will be under /api/data/:tableName

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Auth API at http://localhost:${PORT}/api/auth`);
  console.log(`Data API at http://localhost:${PORT}/api/data/<table_name>`);
});