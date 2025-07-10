import express from 'express';
import MemberController from '../controllers/MemberController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for managing members
 */

/**
 * @openapi
 * /api/getAllUsers:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Fetches a complete list of users. This endpoint provides an array of user objects, each with a unique ID and username.
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A JSON array of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getAllUsers', MemberController.getAllUsers);



export default router;