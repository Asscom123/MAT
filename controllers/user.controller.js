import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import multer from "multer";
import { getUsers } from "../models/user.model.js";
import { emailController } from './email.controller.js';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const user_view = async function(req, res) {
    try {
        const usuarios = await getUsers.user.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error("Error fetching usuarios:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const user_create = async function(req, res) {
    try {
        const {
            nombre,
            apellidoP,
            apellidoM,
            email,
            contrasena,
            fechaNacimiento,
            genero,
            numCel,
            cargo,
            horarioDeTrabajo,
            status,
            rol,
        } = req.body;

        if (!nombre ||
            !apellidoP ||
            !apellidoM ||
            !email ||
            !contrasena ||
            !fechaNacimiento ||
            !genero ||
            !numCel ||
            !cargo ||
            !horarioDeTrabajo ||
            !rol
        ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Validar que numCel contenga solo dígitos
        if (!/^\d+$/.test(numCel)) {
            return res
                .status(400)
                .json({ error: 'El número de celular debe contener solo dígitos numéricos' });
        }

        // Validar que numCel tenga exactamente 10 dígitos
        if (numCel.length !== 10) {
            return res.status(400).json({
                error: 'El número de celular debe tener exactamente 10 dígitos',
            });
        }

        const fechaNacimientoFormateada = formatearFecha(fechaNacimiento);

        if (!fechaNacimientoFormateada) {
            return res.status(400).json({ error: 'Formato de fecha inválido' });
        }

        // Intenta crear el usuario
        const usuario = await getUsers.user.create({
            nombre,
            apellidoP,
            apellidoM,
            email,
            contrasena,
            fechaNacimiento: fechaNacimientoFormateada,
            genero,
            numCel,
            cargo,
            horarioDeTrabajo,
            status,
            rol,
        });

        // Envía el correo de bienvenida solo si el rol es 2 (usuario)
        if (rol === 2) {
            try {
                // Mensaje de bienvenida y motivacional personalizado
                const asunto = '¡Bienvenido a Asscom!';
                const mensajeMotivacional = mensajeMotivacionalPersonalizado(nombre);

                await emailController.enviarCorreoConfirmacion(email, asunto, mensajeMotivacional);
                console.log(`Correo de bienvenida enviado a ${email}`);
            } catch (error) {
                console.error('Error al enviar el correo de bienvenida:', error);
            }
        }

        res.json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

const mensajeMotivacionalPersonalizado = (nombre) =>
    `¡Bienvenido a Asscom, ${nombre}! Estamos emocionados de tenerte en nuestro equipo. En Asscom, creemos en el potencial ilimitado de cada miembro. Tu contribución es valiosa, y juntos construiremos un camino de éxitos. ¡Haz de cada día una oportunidad para destacar y lograr grandes cosas! #AsscomTeam`;


const user_update = async function(req, res) {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellidoP,
            apellidoM,
            email,
            contrasena,
            fechaNacimiento,
            genero,
            numCel,
            cargo,
            horarioDeTrabajo,
            status,
            rol,
        } = req.body;

        if (!nombre ||
            !apellidoP ||
            !apellidoM ||
            !email ||
            !contrasena ||
            !fechaNacimiento ||
            !genero ||
            !numCel ||
            !cargo ||
            !horarioDeTrabajo ||
            !rol
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar que numCel contenga solo dígitos
        if (!/^\d+$/.test(numCel)) {
            return res
                .status(400)
                .json({ error: "El número de celular debe contener solo dígitos numéricos" });
        }

        // Validar que numCel tenga exactamente 10 dígitos
        if (numCel.length !== 10) {
            return res.status(400).json({
                error: "El número de celular debe tener exactamente 10 dígitos",
            });
        }

        const usuario = await getUsers.user.findOne({ where: { idUsuario: id } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar si el nuevo correo es diferente al actual
        if (email !== usuario.email) {
            // Intentar actualizar el correo, capturar error si ya existe
            try {
                await usuario.update({ email: email });
                console.log(`Correo actualizado para el usuario con ID ${id}`);
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
                }
                throw error; // Si el error no es de correo duplicado, lanzarlo nuevamente
            }
        }

        // Actualiza el resto de la información del usuario con el rol especificado
        await usuario.update({
            nombre,
            apellidoP,
            apellidoM,
            email,
            contrasena,
            fechaNacimiento,
            genero,
            numCel,
            cargo,
            horarioDeTrabajo,
            status,
            rol,
        });

        // No enviar correo si el rol es 1 (administrador)
        if (rol === 2) {
            try {
                await emailController.enviarCorreoActualizacion(email);
                console.log(`Correo de actualización enviado para el usuario con correo electrónico ${email}`);
            } catch (error) {
                console.error('Error al enviar el correo de actualización:', error);
            }
        }


        res.json({ success: true, message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error interno del Servidor" });
    }
};



const user_delete = async function(req, res) {
    try {
        const idUsuario = req.params.idUsuario;
        const usuario = await getUsers.user.findOne({ where: { idUsuario: idUsuario } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.destroy();

        res.json({ success: true, message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error interno del Servidor" });
    }
};

export const userController = {
    user_create,
    user_update,
    user_view,
    user_delete,
};

// Función para formatear la fecha
function formatearFecha(fecha) {
    const partesFecha = fecha.split("-");
    if (partesFecha.length === 3) {
        return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    } else {
        return null;
    }
}