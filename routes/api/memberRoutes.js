import express from 'express';
import MemberController from '../../src/controllers/MemberController.js';

const router = express.Router();

/**
 * @swagger
 * /getUsers:
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
router.get('/getUsers', MemberController.getAllUsers);

// Add other member-related routes here as needed
// router.post('/members', MemberController.createMember);
// router.get('/members/:id', MemberController.getMemberById);
// router.put('/members/:id', MemberController.updateMember);
// router.delete('/members/:id', MemberController.deleteMember);

export default router;