import express from 'express';
import { emailController } from '../controllers/email.controller.js';

const router = express.Router();

// Ruta para enviar recordatorio a las 9:30 a.m.
router.post('/recordatorio-manana', (req, res) => {
    try {
        // Obtener la lista de destinatarios desde la solicitud (puedes ajustar según tu implementación)
        const destinatarios = req.body.destinatarios || [];

        // Llamar al controlador para enviar el recordatorio
        emailController.enviarRecordatorioManana(destinatarios);

        res.json({ success: true, message: 'Recordatorio enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el recordatorio:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
});

// Ruta para enviar recordatorio a las 6:30 p.m.
router.post('/recordatorio-noche', (req, res) => {
    try {
        // Obtener la lista de destinatarios desde la solicitud (puedes ajustar según tu implementación)
        const destinatarios = req.body.destinatarios || [];

        // Llamar al controlador para enviar el recordatorio
        emailController.enviarRecordatorioNoche(destinatarios);

        res.json({ success: true, message: 'Recordatorio enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el recordatorio:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
});

export default router;