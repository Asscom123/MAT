import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = Router();

// Definición de rutas
router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

// Otras rutas de autenticación

export default router;