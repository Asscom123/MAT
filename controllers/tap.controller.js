import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import multer from "multer";
import { getTaps } from "../models/tap.model.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

function formatearFecha(fecha) {
    const partesFecha = fecha.split('-');
    if (partesFecha.length === 3) {
        return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    } else {
        return null;
    }
}

const tap_view = async function(req, res) {
    try {
        const taps = await getTaps.tap.findAll();
        res.json(taps);
    } catch (error) {
        console.error("Error obteniendo TAPs:", error);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};

const tap_create = async function(req, res) {
    try {
        const { cargo, nombre, fechaI, fechaL, descripcionDT, acciones, personalDA, observaciones, potencial, plazo, prioridad, status, fechaF } = req.body;

        if (!cargo || !nombre || !fechaI || !fechaL || !descripcionDT || !acciones || !personalDA || !observaciones || !potencial || !plazo || !prioridad || !status || !fechaF) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const respuestasPlazo = ["CP", "MP", "LP"];
        if (!respuestasPlazo.includes(plazo)) {
            return res.status(400).json({ error: "El campo plazo solo permite respuestas: CP, MP, LP las letras deben de estar en mayusculas" });
        }

        const respuestasPrioridad = ["UI", "NUI", "NIU", "NINU"];
        if (!respuestasPrioridad.includes(prioridad)) {
            return res.status(400).json({ error: "El campo prioridad solo permite respuestas: UI, NUI, NIU, NINU las letras deben de estar en mayuculas" });
        }

        const respuestasStatus = ["Por iniciar", "En proceso", "Finalizado"];
        if (!respuestasStatus.includes(status)) {
            return res.status(400).json({ error: "El campo status solo permite respuestas: Por iniciar, En proceso, Finalizado las respuestas deben de estas igual que en los ejemplos" });
        }

        const fechaFFormateada = formatearFecha(fechaF);

        if (!fechaFFormateada) {
            return res.status(400).json({ error: "Formato de fechaF inválido" });
        }

        await getTaps.tap.create({
            cargo: cargo,
            nombre: nombre,
            fechaI: fechaI,
            fechaL: fechaL,
            descripcionDT: descripcionDT,
            acciones: acciones,
            personalDA: personalDA,
            observaciones: observaciones,
            potencial: potencial,
            plazo: plazo,
            prioridad: prioridad,
            status: status,
            fechaF: fechaFFormateada,
        }, {
            fields: ["cargo", "nombre", "fechaI", "fechaL", "descripcionDT", "acciones", "personalDA", "observaciones", "potencial", "plazo", "prioridad", "status", "fechaF"],
        });

        res.json({ success: true, message: "TAP creado exitosamente" });
    } catch (error) {
        console.error("Error al crear TAP:", error);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};

const tap_update = async function(req, res) {
    try {
        const { id } = req.params;
        const { cargo, nombre, fechaI, fechaL, descripcionDT, acciones, personalDA, observaciones, potencial, plazo, prioridad, status, fechaF } = req.body;

        if (!cargo || !nombre || !fechaI || !fechaL || !descripcionDT || !acciones || !personalDA || !observaciones || !potencial || !plazo || !prioridad || !status || !fechaF) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const respuestasPlazo = ["CP", "MP", "LP"];
        if (!respuestasPlazo.includes(plazo)) {
            return res.status(400).json({ error: "El campo plazo solo permite respuestas: CP, MP, LP las letras deben de estar en mayusculas" });
        }

        const respuestasPrioridad = ["UI", "NUI", "NIU", "NINU"];
        if (!respuestasPrioridad.includes(prioridad)) {
            return res.status(400).json({ error: "El campo prioridad solo permite respuestas: UI, NUI, NIU, NINU las letras deben de estar en mayusculas " });
        }

        const respuestasStatus = ["Por iniciar", "En proceso", "Finalizado"];
        if (!respuestasStatus.includes(status)) {
            return res.status(400).json({ error: "El campo status solo permite respuestas: Por iniciar, En proceso, Finalizado las respuestas deben de estas igual que en los ejemplos " });
        }

        const fechaFFormateada = formatearFecha(fechaF);

        if (!fechaFFormateada) {
            return res.status(400).json({ error: "Formato de fechaF inválido" });
        }

        const tap = await getTaps.tap.findOne({ where: { idTap: id } });

        if (!tap) {
            return res.status(404).json({ error: "TAP no encontrado" });
        }

        await tap.update({
            cargo: cargo,
            nombre: nombre,
            fechaI: fechaI,
            fechaL: fechaL,
            descripcionDT: descripcionDT,
            acciones: acciones,
            personalDA: personalDA,
            observaciones: observaciones,
            potencial: potencial,
            plazo: plazo,
            prioridad: prioridad,
            status: status,
            fechaF: fechaFFormateada,
        });

        res.json({ success: true, message: "TAP actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar TAP:", error);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};

const tap_delete = async function(req, res) {
    try {
        const idTap = req.params.idTap;
        const tap = await getTaps.tap.findOne({ where: { idTap: idTap } });

        if (!tap) {
            return res.status(404).json({ error: "TAP no encontrado" });
        }

        await tap.destroy();

        res.json({ success: true, message: "TAP eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar TAP:", error);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};

export const tapController = {
    tap_create,
    tap_update,
    tap_view,
    tap_delete,
};