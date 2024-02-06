import { getUsers } from "../models/user.model.js";
import { emailController } from './email.controller.js';

const user_view = async (req, res) => {
    getUsers.findAll({
        atributes: ["nombre", "apellidoP", "apellidoM", "email", "contrasena", "fechaNacimiento", "genero", "numCel", "cargo", "horarioDeTrabajo", "status", "rol"]
    }).then(users => {
        res.send(users)
    }).catch (err => {
        console.log (err);
    });
};

const user_create = async function(req, res) {
    try {
        // Obtener los datos del cuerpo de la solicitud
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

        // Validar que se proporcionen todos los campos requeridos
        if (!nombre || !apellidoP || !apellidoM || !email || !contrasena || !fechaNacimiento || !genero || !numCel || !cargo || !horarioDeTrabajo || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Validar el formato del número de celular
        if (!/^\d+$/.test(numCel)) {
            return res.status(400).json({ error: 'El número de celular debe contener solo dígitos numéricos' });
        }

        // Validar la longitud del número de celular
        if (numCel.length !== 10) {
            return res.status(400).json({ error: 'El número de celular debe tener exactamente 10 dígitos' });
        }

        // Crear el usuario
        await getUsers.create({
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
        }, { fields: ["idUsuario", "nombre", "apellidoP", "apellidoM", "email", "contrasena", "fechaNacimiento", "genero", "numCel", "cargo", "horarioDeTrabajo", "status", "rol"] });

        // Enviar correo de bienvenida si el rol es 2 (usuario)
        if (rol === 2) {
            try {
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

        // Validar que se proporcionen todos los campos requeridos
        if (!nombre || !apellidoP || !apellidoM || !email || !contrasena || !fechaNacimiento || !genero || !numCel || !cargo || !horarioDeTrabajo || !rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar el formato del número de celular
        if (!/^\d+$/.test(numCel)) {
            return res.status(400).json({ error: "El número de celular debe contener solo dígitos numéricos" });
        }

        // Validar la longitud del número de celular
        if (numCel.length !== 10) {
            return res.status(400).json({ error: "El número de celular debe tener exactamente 10 dígitos" });
        }

        // Buscar el usuario por ID
        const usuario = await getUsers.findOne({ where: { idUsuario: id } });

        // Verificar si se encontró el usuario
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar si el nuevo correo es diferente al actual
        if (email !== usuario.email) {
            // Intentar actualizar el correo, capturar error si ya existe
            try {
                await usuario.update({ email });
                console.log(`Correo actualizado para el usuario con ID ${id}`);
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
                }
                throw error;
            }
        }

        // Actualizar el resto de la información del usuario con el rol especificado
        usuario.update({
            nombre:nombre,
            apellidoP:apellidoP,
            apellidoM:apellidoM,
            email:email,
            contrasena:contrasena,
            fechaNacimiento:fechaNacimiento,
            genero:genero,
            numCel:numCel,
            cargo:cargo,
            horarioDeTrabajo:horarioDeTrabajo,
            status:status,
            rol:rol,
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
        const { idUsuario } = req.params;

        // Buscar el usuario por ID
        const usuario = await getUsers.findOne({ where: { idUsuario } });

        // Verificar si se encontró el usuario
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Eliminar el usuario
        usuario.destroy();

        res.json({ success: true, message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error interno del Servidor" });
    }
};

const mensajeMotivacionalPersonalizado = (nombre) =>
    `¡Bienvenido a Asscom, ${nombre}! Estamos emocionados de tenerte en nuestro equipo. En Asscom, creemos en el potencial ilimitado de cada miembro. Tu contribución es valiosa, y juntos construiremos un camino de éxitos. ¡Haz de cada día una oportunidad para destacar y lograr grandes cosas! #AsscomTeam`;

export const userController = {
    user_view,
    user_create,
    user_update,
    user_delete,
};