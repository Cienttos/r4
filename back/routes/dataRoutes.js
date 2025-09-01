import express from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/dataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (read-only)
router.get('/:tableName', getAllItems);
router.get('/:tableName/:id', getItemById);

// Protected routes (CRUD operations requiring authentication)
router.post('/:tableName', protect, createItem);
router.put('/:tableName/:id', protect, updateItem);
router.delete('/:tableName/:id', protect, deleteItem);

export default router;