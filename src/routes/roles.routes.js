import express from 'express';
import {getAllRoles} from '../controllers/roles.controller.js';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the role.
 *         name:
 *           type: string
 *           description: The name of the role.
 *         code:
 *           type: string
 *           description: The code of the role.
 *       example:
 *         id: 12
 *         code: "A-0"
 *         name: "Admin"
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing roles
 */

/**
 * @swagger
 * /api/getAllRoles:
 *   get:
 *     summary: Retrieve a list of all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Server error
 */
router.get('/getAllRoles', getAllRoles);

export default router;