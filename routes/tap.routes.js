import { Router } from 'express';
import bodyParser from 'body-parser';
import { tapController } from '../controllers/tap.controller.js';
import verifyToken from '../middlewares/token.middleware.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * @openapi
 * '/api/tap/create':
 *  post:
 *     tags:
 *     - Tap
 *     summary: Crea un nuevo TAP
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - cargo
 *              - nombre
 *              - fechaI
 *              - fechaL
 *              - descripcionDT
 *              - acciones
 *              - personalDA
 *              - observaciones
 *              - potencial
 *              - plazo
 *              - prioridad
 *              - status
 *              - fechaF
 *            properties:
 *              cargo:
 *                type: string
 *              nombre:
 *                type: string
 *              fechaI:
 *                type: string
 *              fechaL:
 *                type: string
 *              descripcionDT:
 *                type: string
 *              acciones:
 *                type: string
 *              personalDA:
 *                type: string
 *              observaciones:
 *                type: string
 *              potencial:
 *                type: string
 *              plazo:
 *                type: string
 *              prioridad:
 *                type: string
 *              status:
 *                type: string
 *              fechaF:
 *                type: string
 *     responses:
 *      200:
 *        description: TAP creado exitosamente
 *      400:
 *        description: Datos de TAP inválidos o faltantes
 */

router.post('/create', (req, res, next) => verifyToken(req, res, next), (req, res) => tapController.tap_create(req, res));

/**
 * @openapi
 * '/api/tap/update/{idTap}':
 *  put:
 *     tags:
 *     - Tap
 *     summary: Actualiza un TAP por su ID
 *     parameters:
 *      - name: idTap
 *        in: path
 *        required: true
 *        description: ID del TAP a actualizar
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - cargo
 *              - nombre
 *              - fechaI
 *              - fechaL
 *              - descripcionDT
 *              - acciones
 *              - personalDA
 *              - observaciones
 *              - potencial
 *              - plazo
 *              - prioridad
 *              - status
 *              - fechaF
 *            properties:
 *              cargo:
 *                type: string
 *              nombre:
 *                type: string
 *              fechaI:
 *                type: string
 *              fechaL:
 *                type: string
 *              descripcionDT:
 *                type: string
 *              acciones:
 *                type: string
 *              personalDA:
 *                type: string
 *              observaciones:
 *                type: string
 *              potencial:
 *                type: string
 *              plazo:
 *                type: string
 *              prioridad:
 *                type: string
 *              status:
 *                type: string
 *              fechaF:
 *                type: string
 *     responses:
 *      200:
 *        description: TAP actualizado exitosamente
 *      400:
 *        description: Datos de TAP inválidos o faltantes
 *      404:
 *        description: TAP no encontrado
 */
router.put('/update/:id', (req, res, next) => verifyToken(req, res, next), (req, res) => tapController.tap_update(req, res));

/**
 * @openapi
 * '/api/tap/delete/{idTap}':
 *  delete:
 *     tags:
 *     - Tap
 *     summary: Elimina un TAP por su ID
 *     parameters:
 *      - name: idTap
 *        in: path
 *        required: true
 *        description: ID del TAP a eliminar
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: TAP eliminado exitosamente
 *      400:
 *        description: ID de TAP inválido o faltante
 *      404:
 *        description: TAP no encontrado
 */
router.delete('/delete/:idTap', (req, res, next) => verifyToken(req, res, next), (req, res) => tapController.tap_delete(req, res));

/**
 * @openapi
 * '/api/tap/view':
 *  get:
 *     tags:
 *     - Tap
 *     summary: Obtiene la lista de TAPs
 *     responses:
 *      200:
 *        description: Lista de TAPs obtenida exitosamente
 *      500:
 *        description: Error interno del servidor
 */
router.get('/view', (req, res, next) => verifyToken(req, res, next), (req, res) => tapController.tap_view(req, res));

export default router;