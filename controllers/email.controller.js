import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';
import { getUsers } from "../models/user.model.js";

// Cambiar por tu dirección de correo electrónico y contraseña
const correoOrigen = 'desasscom@outlook.com';
const contraseñaCorreoOrigen = 'Asscom123';

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: correoOrigen,
        pass: contraseñaCorreoOrigen,
    },
});

const generarCuerpoConEstilosColoridos = (mensaje, tipo) => {
    const directorioActual = process.cwd();
    const rutaImagenLocal = path.join(directorioActual, 'assest', 'img', 'logo.jpg');

    let titulo;
    if (tipo === 'bienvenida') {
        titulo = '¡Bienvenido a Asscom!';
    } else if (tipo === 'recordatorio_inicio') {
        titulo = 'No olvides iniciar tu TAP';
    } else if (tipo === 'recordatorio_final') {
        titulo = 'No olvides enviar tu TAP';
    }

    try {
        // Lee la imagen como base64
        const imagenBase64 = fs.readFileSync(rutaImagenLocal, { encoding: 'base64' });

        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #ffffff; /* blanco */
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff; /* blanco */
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #006868; /* verde oscuro */
                    }
                    p {
                        color: #000000; /* negro */
                        text-align: justify; /* Alineación justificada */
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        margin-bottom: 20px;
                        border-radius: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="data:image/jpg;base64,${imagenBase64}" alt="Asscom">
                    <h1>${titulo}</h1>
                    <p>${mensaje}</p>
                </div>
            </body>
            </html>
        `;
    } catch (error) {
        console.error('Error al leer la imagen:', error);
        throw new Error('Error al leer la imagen');
    }
};

const enviarCorreoRecordatorio = async(destinatario, asunto, mensaje, tipo) => {
    const cuerpoConEstilos = generarCuerpoConEstilosColoridos(mensaje, tipo);

    const opcionesCorreo = {
        from: correoOrigen,
        to: destinatario,
        subject: asunto,
        html: cuerpoConEstilos,
    };

    try {
        await transporter.sendMail(opcionesCorreo);
        console.log(`Correo de ${tipo} enviado a ${destinatario}`);
    } catch (error) {
        console.error(`Error al enviar el correo de ${tipo}:`, error);
        throw new Error(`Error al enviar el correo de ${tipo}`);
    }
};

// Función para enviar recordatorio de TAP en la mañana
const enviarRecordatorioManana = async() => {
    const users = await getUsers.findAll({ where: { rol: 2 } }); // Obtener usuarios con rol 2 (usuario)
    users.forEach(async(user) => {
        const asunto = 'Recordatorio de TAP - Mañana';
        const mensaje = 'No olvides iniciar tu TAP';
        const tipo = 'recordatorio_inicio';
        await enviarCorreoRecordatorio(user.email, asunto, mensaje, tipo);
    });
};

// Función para enviar recordatorio de TAP en la tarde
const enviarRecordatorioTarde = async() => {
    const users = await getUsers.findAll({ where: { rol: 2 } }); // Obtener usuarios con rol 2 (usuario)
    users.forEach(async(user) => {
        const asunto = 'Recordatorio de TAP - Tarde';
        const mensaje = 'No olvides enviar tu TAP';
        const tipo = 'recordatorio_final';
        await enviarCorreoRecordatorio(user.email, asunto, mensaje, tipo);
    });
};

// Función para programar las tareas de envío de correos en la mañana
const programarTareaManana = () => {
    cron.schedule('30 9 * * 1-5', async() => { // De lunes a viernes a las 9:30 am
        await enviarRecordatorioManana();
    });

    cron.schedule('30 10 * * 6', async() => { // Sábado a las 10:30 am
        await enviarRecordatorioManana();
    });
};

// Función para programar las tareas de envío de correos en la tarde
const programarTareaTarde = () => {
    cron.schedule('30 18 * * 1-5', async() => { // De lunes a viernes a las 6:30 pm
        await enviarRecordatorioTarde();
    });

    cron.schedule('30 13 * * 6', async() => { // Sábado a las 1:30 pm
        await enviarRecordatorioTarde();
    });
};

// Llamar a las funciones para programar las tareas
programarTareaManana();
programarTareaTarde();

export const emailController = {
    enviarCorreoConfirmacion: async function(destinatario, asunto, mensaje) {
        const cuerpoConEstilos = generarCuerpoConEstilosColoridos(mensaje, 'bienvenida');

        const opcionesCorreo = {
            from: correoOrigen,
            to: destinatario,
            subject: asunto,
            html: cuerpoConEstilos,
        };

        try {
            await transporter.sendMail(opcionesCorreo);
            console.log(`Correo de bienvenida enviado a ${destinatario}`);
        } catch (error) {
            console.error('Error al enviar el correo de bienvenida:', error);
            throw new Error('Error al enviar el correo de bienvenida');
        }
    },

};