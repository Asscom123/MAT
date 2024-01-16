import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import multer from "multer";
import { getUsers } from "../models/user.model.js";

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
        const { nombre, apellidoP, apellidoM, correo, fechaNacimiento, genero, numCel, cargo, horarioDeTrabajo, status } = req.body;

        if (!nombre || !apellidoP || !apellidoM || !correo || !fechaNacimiento || !genero || !numCel || !cargo || !horarioDeTrabajo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar que numCel contenga solo dígitos
        if (!/^\d+$/.test(numCel)) {
            return res.status(400).json({ error: "El número de celular debe contener solo dígitos numéricos" });
        }

        // Validar que numCel tenga exactamente 10 dígitos
        if (numCel.length !== 10) {
            return res.status(400).json({ error: "El número de celular debe tener exactamente 10 dígitos" });
        }

        const fechaNacimientoFormateada = formatearFecha(fechaNacimiento);

        if (!fechaNacimientoFormateada) {
            return res.status(400).json({ error: "Formato de fecha inválido" });
        }

        await getUsers.user.create({
            nombre: nombre,
            apellidoP: apellidoP,
            apellidoM: apellidoM,
            correo: correo,
            fechaNacimiento: fechaNacimientoFormateada,
            genero: genero,
            numCel: numCel,
            cargo: cargo,
            horarioDeTrabajo: horarioDeTrabajo,
            status: status,
        }, {
            fields: ["nombre", "apellidoP", "apellidoM", "correo", "fechaNacimiento", "genero", "numCel", "cargo", "horarioDeTrabajo", "status"],
        });

        res.json({ success: true, message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};


function formatearFecha(fecha) {
    const partesFecha = fecha.split('-');
    if (partesFecha.length === 3) {
        return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    } else {
        return null;
    }
}

const user_update = async function(req, res) {
    try {
        const { id } = req.params;
        const { nombre, apellidoP, apellidoM, correo, fechaNacimiento, genero, numCel, cargo, horarioDeTrabajo, status } = req.body;

        if (!nombre || !apellidoP || !apellidoM || !correo || !fechaNacimiento || !genero || !numCel || !cargo || !horarioDeTrabajo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar que numCel contenga solo dígitos
        if (!/^\d+$/.test(numCel)) {
            return res.status(400).json({ error: "El número de celular debe contener solo dígitos numéricos" });
        }

        // Validar que numCel tenga exactamente 10 dígitos
        if (numCel.length !== 10) {
            return res.status(400).json({ error: "El número de celular debe tener exactamente 10 dígitos" });
        }

        const usuario = await getUsers.user.findOne({ where: { idUsuario: id } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.update({
            nombre: nombre,
            apellidoP: apellidoP,
            apellidoM: apellidoM,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            numCel: numCel,
            cargo: cargo,
            horarioDeTrabajo: horarioDeTrabajo,
            status: status,
        });

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