import express from 'express';
import ProvinceController from '../../controllers/ProvinceController.js';

const router = express.Router();

/**
 * @openapi
 * /api/getAllProvinces:
 *   get:
 *     summary: Retrieve a list of all provinces
 *     description: Fetches a complete list of provinces. This endpoint provides an array of province objects, each with a unique ID and name.
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: A JSON array of province objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Province'
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     Province:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The province's unique identifier.
 *           example: 11
 *         code:
 *           type: string
 *           description: The province's code.
 *           example: "11"
 *         name:
 *           type: string
 *           description: The name of the province.
 *           example: "ACEH"
 */
router.get('/getAllProvinces', ProvinceController.getAllProvinces);

export default router;