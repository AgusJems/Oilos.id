import express from 'express';
import MemberController from '../../src/controllers/MemberController.js';

const router = express.Router();

/**
 * @swagger
 * /api/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users. This endpoint requires authentication.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User' # Reference to a User schema definition
 *       401:
 *         description: Unauthorized - No token provided or token is invalid
 *       403:
 *         description: Forbidden - User does not have sufficient permissions
 *       500:
 *         description: Internal server error
 */
router.get('/getAllUsers', MemberController.getAllUsers);

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a user by ID
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

// Add other member-related routes here as needed
// router.post('/members', MemberController.createMember);
// router.delete('/members/:id', MemberController.deleteMember);

export default router;