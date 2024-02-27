import { Router } from 'express';
import bodyParser from 'body-parser';
import { supplierController } from '../controllers/suppliers.controller.js';


const router = Router();

const jsonParser = bodyParser.json();

/**
 * @openapi
 * '/api/supplier/create':
 *  post:
 *     tags:
 *     - Supplier
 *     summary: Crea un nuevo proveedor
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - mayorista
 *              - asesor
 *              - contactoDePago
 *              - RFC
 *              - numCliente
 *              - correo
 *              - banco
 *              - cuenta
 *              - clabe
 *              - diasCred
 *              - diasPP
 *              - telefono
 *            properties:
 *              mayorista:
 *                type: string
 *              asesor:
 *                type: string
 *              contactoDePago:
 *                type: string
 *              RFC:
 *                type: string
 *              numCliente:
 *                type: string
 *              correo:
 *                type: string
 *              banco:
 *                type: string
 *              cuenta:
 *                type: string
 *              clabe:
 *                type: string
 *              diasCred:
 *                type: integer
 *              diasPP:
 *                type: integer
 *              telefono:
 *                type: string
 *     responses:
 *      200:
 *        description: Proveedor creado exitosamente 
 *      400:
 *        description: Datos de proveedor inválidos o faltantes
 */
router.post('/create', jsonParser, (req, res) => supplierController.supplier_create(req, res));

/**
 * @openapi
 * '/api/supplier/update/{id}':
 *  put:
 *     tags:
 *     - Supplier
 *     summary: Actualiza un proveedor por su ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del proveedor a actualizar
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - mayorista
 *              - asesor
 *              - contactoDePago
 *              - RFC
 *              - numCliente
 *              - correo
 *              - banco
 *              - cuenta
 *              - clabe
 *              - diasCred
 *              - diasPP
 *              - telefono
 *            properties:
 *              mayorista:
 *                type: string
 *              asesor:
 *                type: string
 *              contactoDePago:
 *                type: string
 *              RFC:
 *                type: string
 *              numCliente:
 *                type: string
 *              correo:
 *                type: string
 *              banco:
 *                type: string
 *              cuenta:
 *                type: string
 *              clabe:
 *                type: string
 *              diasCred:
 *                type: integer
 *              diasPP:
 *                type: integer
 *              telefono:
 *                type: string
 *     responses:
 *      200:
 *        description: Proveedor actualizado exitosamente
 *      400:
 *        description: Datos de proveedor inválidos o faltantes
 *      404:
 *        description: Proveedor no encontrado
 */
router.put('/update/:id', jsonParser, (req, res) => supplierController.supplier_update(req, res));


/**
 * @openapi
 * '/api/supplier/delete/{id}':
 *  delete:
 *     tags:
 *     - Supplier
 *     summary: Elimina un proveedor por su ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del proveedor a eliminar
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Proveedor eliminado exitosamente
 *      400:
 *        description: ID de proveedor inválido o faltante
 *      404:
 *        description: Proveedor no encontrado
 */
router.delete('/delete/:id', (req, res) => supplierController.supplier_delete(req, res));

/**
 * @openapi
 * '/api/supplier/view':
 *  get:
 *     tags:
 *     - Supplier
 *     summary: Obtiene la lista de proveedores
 *     responses:
 *      200:
 *        description: Lista de proveedores obtenida exitosamente
 *      500:
 *        description: Error interno del servidor
 */
router.get('/view', (req, res) => supplierController.supplier_view(req, res));

export default router;