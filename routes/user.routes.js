import { Router } from 'express';
import bodyParser from 'body-parser';
import { userController } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/token.middleware.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * @openapi
 * '/api/user/create':
 *  post:
 *     tags:
 *     - User
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - nombre
 *              - apellidoP
 *              - apellidoM
 *              - fechaNacimiento
 *              - genero
 *              - numCel
 *              - cargo
 *              - horarioDeTrabajo
 *              - status
 *            properties:
 *              nombre:
 *                type: string
 *                default: prueba
 *              apellidoP:
 *                type: string
 *                default: prueba
 *              apellidoM:
 *                type: string
 *                default: prueba
 *              fechaNacimiento:
 *                type: string
 *                default: 2000-01-01
 *              genero:
 *                type: string
 *                default: masculino
 *              numCel:
 *                type: string
 *                default: 123456789
 *              cargo:
 *                type: string
 *                default: empleado
 *              horarioDeTrabajo:
 *                type: string
 *                default: 9AM-5PM
 *              status:
 *                type: boolean
 *                default: true
 *     responses:
 *      200:
 *        description: Usuario creado exitosamente
 *      400:
 *        description: Datos de usuario inválidos o faltantes
 */

router.post('/create', (req, res) => userController.user_create(req, res));

/**
 * @openapi
 * '/api/user/update/{id}':
 *  put:
 *     tags:
 *     - User
 *     summary: Actualiza un usuario por su ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del usuario a actualizar
 *        schema:
 *          type: string
 *          default: 123456789
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - nombre
 *              - apellidoP
 *              - apellidoM
 *              - fechaNacimiento
 *              - genero
 *              - numCel
 *              - cargo
 *              - horarioDeTrabajo
 *              - status
 *            properties:
 *              nombre:
 *                type: string
 *                default: prueba
 *              apellidoP:
 *                type: string
 *                default: prueba
 *              apellidoM:
 *                type: string
 *                default: prueba
 *              fechaNacimiento:
 *                type: string
 *                default: 2000-01-01
 *              genero:
 *                type: string
 *                default: masculino
 *              numCel:
 *                type: string
 *                default: 123456789
 *              cargo:
 *                type: string
 *                default: empleado
 *              horarioDeTrabajo:
 *                type: string
 *                default: 9AM-5PM
 *              status:
 *                type: boolean
 *                default: true
 *     responses:
 *      200:
 *        description: Usuario actualizado exitosamente
 *      400:
 *        description: Datos de usuario inválidos o faltantes
 *      404:
 *        description: Usuario no encontrado
 */
router.put('/update/:id', (req, res) => verifyToken(req, res, next), (req, res) => userController.user_update(req, res));


/**
 * @openapi
 * '/api/user/delete/{idUsuario}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Elimina un usuario por su ID
 *     parameters:
 *      - name: idUsuario
 *        in: path
 *        required: true
 *        description: ID del usuario a eliminar
 *        schema:
 *          type: string
 *          default: 123456789
 *     responses:
 *      200:
 *        description: Usuario eliminado exitosamente
 *      400:
 *        description: ID de usuario inválido o faltante
 *      404:
 *        description: Usuario no encontrado
 */
router.delete('/delete/:idUsuario', (req, res) => verifyToken(req, res, next), (req, res) => userController.user_delete(req, res));




/**
 * @openapi
 * '/api/user/view':
 *  get:
 *     tags:
 *     - User
 *     summary: Obtiene la lista de usuarios
 *     responses:
 *      200:
 *        description: Lista de usuarios obtenida exitosamente
 *      500:
 *        description: Error interno del servidor
 */

router.get('/view', (req, res) => verifyToken(req, res, next), (req, res) => userController.user_view(req, res));

export default router;