import express from 'express';
import { login, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res, next) => { console.log('Login route hit'); next(); }, login);
router.post('/signup', (req, res, next) => { console.log('Signup route hit'); next(); }, signup);

export default router;