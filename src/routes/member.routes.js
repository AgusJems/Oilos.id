import express from 'express';
import MemberController from '../controllers/nember.controller.js';

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


/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Members]
 *     description: Retrieve a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user object.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/members/:id', MemberController.getUserById);

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Members]
 *     description: Update the details of an existing user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput' # Reference to a schema for update data
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Internal server error.
 */
router.put('/members/:id', MemberController.updateUser);

export default router;