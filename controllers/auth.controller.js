// auth.controller.js
import { getUsers } from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { dataEnv } from '../config/env.config.js';

const saltRounds = 10; // Número de rounds para la generación del hash
const secretKey = process.env.JWT_SECRET_KEY || 'default_clave_secreta'; // Reemplaza esto con una clave secreta más segura en un entorno de producción

// Función para generar un token
function generarToken(usuarioId, expiresIn = '12h') {
    const token = jwt.sign({ usuarioId }, secretKey, { expiresIn });
    return token;
}

// Función para verificar y devolver la información del usuario desde el token
function verificarToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null; // Si el token no es válido, devuelve null
    }
}

// Función para el inicio de sesión
const login = async(req, res) => {
    const { email, contrasena } = req.body;
    try {

        // Verificar si el usuario existe
        const user = await getUsers.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(contrasena, user.contrasena);

        if (!validPassword) {
            return res.status(401).json({ error: "Contraseña inválida" });
        }

        // Generar y almacenar un nuevo token en cada inicio de sesión
        const token = jwt.sign({ iidUsuario: user.idUsuario }, dataEnv.parsed.JWT_TOKEN_SECRET, {

        });
        return res.status(200).json({ error: null, data: { token, users: user.idUsuario }, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error interno del Servidor" });
    }
};

// Función para cerrar sesión (limpiar el token)
const logout = async function(req, res) {
    try {
        // Suponiendo que el token está presente en el encabezado de la solicitud
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token
        const decodedToken = verificarToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: "Token inválido o caducado" });
        }

        // Generar y almacenar un nuevo token al cerrar sesión (con expiración inmediata)
        const nuevoToken = generarToken(decodedToken.usuarioId, '0s'); // Token expira inmediatamente
        const usuario = await getUsers.user.findByPk(decodedToken.usuarioId);
        await usuario.update({ token: nuevoToken });

        res.json({ success: true, message: "Cierre de sesión exitoso" });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ error: "Error interno del Servidor" });
    }
};

// ... otras funciones y exportaciones

export const authController = {
    login,
    logout,
    // ... otras exportaciones
};