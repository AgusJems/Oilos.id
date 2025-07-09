import express from 'express';
import MemberController from '../../controllers/MemberController.js';
import AuthGuardService from '../../services/AuthGuardService.js';

const router = express.Router();

router.get('/getAllUsers', AuthGuardService.AuthGuardAdmin, MemberController.getAllUsers);

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