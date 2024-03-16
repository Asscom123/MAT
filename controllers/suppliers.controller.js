import { getSuppliers } from "../models/suppliers.model.js";

const supplier_view = async(req, res) => {
    try {
        const suppliers = await getSuppliers.findAll({
            attributes: ["id", "mayorista", "asesor", "contactoDePago", "RFC", "numCliente", "correo", "banco", "cuenta", "clabe", "convenioCIE", "diasCred", "diasPP", "PP", "telefono"]
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
            convenioCIE,
            diasCred,
            diasPP,
            PP,
            telefono,
        } = req.body;

        // Validaciones
        if (!mayorista) {
            return res.status(400).json({ error: 'El campo "mayorista" es obligatorio y no puede quedar vacío.' });
        }

        if (!RFC) {
            return res.status(400).json({ error: 'El campo "RFC" es obligatorio y no puede quedar vacío.' });
        }

        if (!/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][A-Z1-9]\d$/.test(RFC)) {
            return res.status(400).json({ error: 'El RFC ingresado no es válido. Por favor, ingrese un RFC válido.' });
        }

        if (!banco) {
            return res.status(400).json({ error: 'El campo "banco" es obligatorio y no puede quedar vacío.' });
        }

        if (!/^\d+$/.test(diasCred)) {
            return res.status(400).json({ error: 'El campo "diasCred" debe contener solo dígitos numéricos y si no tiene entonces poner un 0.' });
        }

        if (!/^\d+$/.test(diasPP)) {
            return res.status(400).json({ error: 'El campo "diasPP" debe contener solo dígitos numéricos y si no tiene entonces poner un 0.' });
        }

        if (!/^\d+$/.test(PP)) {
            return res.status(400).json({ error: 'El campo "PP" debe contener solo dígitos numéricos y si no tiene entonces poner un 0.' });
        }

        if (!/^(\d{10})?$/.test(telefono)) {
            return res.status(400).json({ error: 'El campo "telefono" debe contener 10 dígitos o estar vacío.' });
        }

        if (cuenta !== '' && !/^\d+$/.test(cuenta)) {
            return res.status(400).json({ error: 'El campo "cuenta" debe contener solo dígitos numéricos o estar vacío.' });
        }

        if (clabe !== '' && !/^\d+$/.test(clabe)) {
            return res.status(400).json({ error: 'El campo "clabe" debe contener solo dígitos numéricos o estar vacío.' });
        }

        const isValidEmail = (email) => {
            // Expresión regular para validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Validar formato de correo electrónico
        if (!isValidEmail(correo)) {
            return res.status(400).json({ error: 'El correo electrónico ingresado no es válido. Por favor, ingrese un correo electrónico válido.' });
        }

        const existingSupplier = await getSuppliers.findOne({ where: { correo } });
        if (existingSupplier) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        await getSuppliers.create({
            mayorista,
            asesor,
            contactoDePago,
            RFC,
            numCliente,
            correo,
            banco,
            cuenta,
            clabe,
            convenioCIE,
            diasCred,
            diasPP,
            PP,
            telefono,
        });

        res.json({ success: true, message: 'Proveedor creado exitosamente' });
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};


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
            convenioCIE,
            diasCred,
            diasPP,
            PP,
            telefono,
        } = req.body;

        // Validaciones
        if (!mayorista) {
            return res.status(400).json({ error: 'El campo "mayorista" es obligatorio y no puede quedar vacío.' });
        }

        if (!RFC) {
            return res.status(400).json({ error: 'El campo "RFC" es obligatorio y no puede quedar vacío.' });
        }

        if (!/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][A-Z1-9]\d$/.test(RFC)) {
            return res.status(400).json({ error: 'El RFC ingresado no es válido. Por favor, ingrese un RFC válido.' });
        }

        if (!banco) {
            return res.status(400).json({ error: 'El campo "banco" es obligatorio y no puede quedar vacío.' });
        }

        if (!/^\d+$/.test(diasCred)) {
            return res.status(400).json({ error: 'El campo "diasCred" debe contener solo dígitos numéricos.' });
        }

        if (!/^\d+$/.test(diasPP)) {
            return res.status(400).json({ error: 'El campo "diasPP" debe contener solo dígitos numéricos.' });
        }

        if (!/^\d+$/.test(PP)) {
            return res.status(400).json({ error: 'El campo "PP" debe contener solo dígitos numéricos.' });
        }

        if (!/^(\d{10})?$/.test(telefono)) {
            return res.status(400).json({ error: 'El campo "telefono" debe contener 10 dígitos o estar vacío.' });
        }

        if (cuenta !== '' && !/^\d+$/.test(cuenta)) {
            return res.status(400).json({ error: 'El campo "cuenta" debe contener solo dígitos numéricos o estar vacío.' });
        }

        if (clabe !== '' && !/^\d+$/.test(clabe)) {
            return res.status(400).json({ error: 'El campo "clabe" debe contener solo dígitos numéricos o estar vacío.' });
        }

        const isValidEmail = (email) => {
            // Expresión regular para validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Validar formato de correo electrónico
        if (correo !== '' && !isValidEmail(correo)) {
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
            correo,
            banco,
            cuenta,
            clabe,
            convenioCIE,
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