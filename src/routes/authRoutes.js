import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Register route (optional, for initial setup)
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

export default router;
