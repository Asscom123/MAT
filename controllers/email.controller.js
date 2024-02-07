import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const correoOrigen = 'desasscom@outlook.com';
const contraseñaCorreoOrigen = 'Asscom123';

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: correoOrigen,
        pass: contraseñaCorreoOrigen,
    },
});

const generarCuerpoConEstilosColoridos = (mensaje) => {
    const directorioActual = process.cwd();
    const rutaImagenLocal = path.join(directorioActual, 'assest', 'img', 'logo.jpg');

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
                    <img src="data:image/jpg;base64,${imagenBase64}" alt="Bienvenido a Asscom">
                    <h1>¡Bienvenido a Asscom!</h1>
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

export const emailController = {
    enviarCorreoConfirmacion: async function(destinatario, asunto, mensaje) {
        const cuerpoConEstilos = generarCuerpoConEstilosColoridos(mensaje);

        const opcionesCorreo = {
            from: correoOrigen,
            to: destinatario,
            subject: asunto,
            html: cuerpoConEstilos,
        };

        try {
            await transporter.sendMail(opcionesCorreo);
            console.log(`Correo enviado a ${destinatario}`);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('Error al enviar el correo');
        }
    },
    // ... (otras funciones)
};