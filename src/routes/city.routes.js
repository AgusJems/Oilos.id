import express from 'express';
import {getAllCities, getCityById} from '../controllers/city.controller.js';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - name
 *         - province_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the city.
 *         name:
 *           type: string
 *           description: The name of the city.
 *         province_id:
 *           type: integer
 *           description: The ID of the province the city belongs to.
 *       example:
 *         id: 12
 *         name: "Bandung"
 *         province_id: 9
 */

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API for managing cities
 */

/**
 * @swagger
 * /api/getAllCities:
 *   get:
 *     summary: Retrieve a list of all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: A list of cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       500:
 *         description: Server error
 */
router.get('/getAllCities', getAllCities);

/**
 * @swagger
 * /api/getCityById/{id}:
 *   get:
 *     summary: Get a city by its ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The city ID
 *     responses:
 *       200:
 *         description: The city data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found.
 *       500:
 *         description: Server error
 */
router.get('/getCityById/:id', getCityById);

export default router;