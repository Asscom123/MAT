import { getSuppliers } from "../models/suppliers.model.js";

const supplier_view = async(req, res) => {
    try {
        const suppliers = await getSuppliers.findAll({
            attributes: ["id", "mayorista", "asesor", "contactoDePago", "RFC", "numCliente", "correo", "banco", "cuenta", "clabe", "diasCred", "diasPP", "PP", "telefono"]
        });
        res.send(suppliers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

const supplier_create = async(req, res) => {
    try {
        const {
            mayorista,
            asesor,
            contactoDePago,
            RFC,
            numCliente,
            correo,
            banco,
            cuenta,
            clabe,
            diasCred,
            diasPP,
            PP,
            telefono,
        } = req.body;

        if (!mayorista || !asesor || !banco) {
            return res.status(400).json({ error: 'Los campos "mayorista", "asesor" y "banco" son obligatorios' });
        }

        if (!/^\d{10}$/.test(telefono) && telefono !== '') {
            return res.status(400).json({ error: 'El número de teléfono debe contener exactamente 10 dígitos o estar vacío' });
        }

        if (!/^\d+$/.test(cuenta) && cuenta !== '') {
            return res.status(400).json({ error: 'El campo "cuenta" debe contener solo dígitos numéricos o estar vacío' });
        }

        if (!/^\d+$/.test(clabe) && clabe !== '') {
            return res.status(400).json({ error: 'El campo "clabe" debe contener solo dígitos numéricos o estar vacío' });
        }

        if (!/^\d+$/.test(PP)) {
            return res.status(400).json({ error: 'El campo "PP" debe contener solo dígitos numéricos' });
        }

        if (!/^\d+$/.test(diasCred) && diasCred !== '') {
            return res.status(400).json({ error: 'El campo "diasCred" debe contener solo dígitos numéricos' });
        }

        if (!/^\d+$/.test(diasPP) && diasPP !== '') {
            return res.status(400).json({ error: 'El campo "diasPP" debe contener solo dígitos numéricos' });
        }

        if (correo !== '' && !isValidEmail(correo)) {
            return res.status(400).json({ error: 'El correo electrónico ingresado no es válido. Por favor, ingrese un correo electrónico válido.' });
        }

        await getSuppliers.create({
            mayorista,
            asesor,
            contactoDePago,
            RFC,
            numCliente,
            correo: correo || null, // Permitir que el correo sea nulo o vacío
            banco,
            cuenta,
            clabe,
            diasCred,
            diasPP,
            PP,
            telefono,
        }, { fields: ["id", "mayorista", "asesor", "contactoDePago", "RFC", "numCliente", "correo", "banco", "cuenta", "clabe", "diasCred", "diasPP", "PP", "telefono"] });

        res.json({ success: true, message: 'Proveedor creado exitosamente' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        console.error('Error al crear proveedor:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



const supplier_update = async(req, res) => {
    try {
        const { id } = req.params;
        const {
            mayorista,
            asesor,
            contactoDePago,
            RFC,
            numCliente,
            correo,
            banco,
            cuenta,
            clabe,
            diasCred,
            diasPP,
            PP,
            telefono,
        } = req.body;

        if (!mayorista || !asesor || !banco) {
            return res.status(400).json({ error: 'Los campos "mayorista", "asesor" y "banco" son obligatorios' });
        }

        if (!/^\d{10}$/.test(telefono) && telefono !== '') {
            return res.status(400).json({ error: 'El número de teléfono debe contener exactamente 10 dígitos o estar vacío' });
        }

        if (!/^\d+$/.test(cuenta) && cuenta !== '') {
            return res.status(400).json({ error: 'El campo "cuenta" debe contener solo dígitos numéricos o estar vacío' });
        }

        if (!/^\d+$/.test(clabe) && clabe !== '') {
            return res.status(400).json({ error: 'El campo "clabe" debe contener solo dígitos numéricos o estar vacío' });
        }

        if (!/^\d+$/.test(PP) && PP !== '') {
            return res.status(400).json({ error: 'El campo "PP" debe contener solo dígitos numérico' });
        }

        if (!/^\d+$/.test(diasCred) && diasCred !== '') {
            return res.status(400).json({ error: 'El campo "diasCred" debe contener solo dígitos numéricos' });
        }

        if (!/^\d+$/.test(diasPP) && diasPP !== '') {
            return res.status(400).json({ error: 'El campo "diasPP" debe contener solo dígitos numéricos' });
        }

        if (correo !== '' && correo !== null && !isValidEmail(correo)) {
            return res.status(400).json({ error: 'El correo electrónico ingresado no es válido. Por favor, ingrese un correo electrónico válido.' });
        }

        const supplier = await getSuppliers.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        await supplier.update({
            mayorista,
            asesor,
            contactoDePago,
            RFC,
            numCliente,
            correo: correo || null, // Permitir que el correo sea nulo o vacío
            banco,
            cuenta,
            clabe,
            diasCred,
            diasPP,
            PP,
            telefono,
        });

        res.json({ success: true, message: 'Proveedor actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};




const supplier_delete = async(req, res) => {
    try {
        const { id } = req.params;
        const supplier = await getSuppliers.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        await supplier.destroy();

        res.json({ success: true, message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

export const supplierController = {
    supplier_view,
    supplier_create,
    supplier_update,
    supplier_delete,
};