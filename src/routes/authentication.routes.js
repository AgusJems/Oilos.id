import express from 'express';
import AuthenticationController from '../controllers/AuthenticationController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     tags: [Authentication]
 *     description: Authenticates a user with username and password and returns a JSON Web Token (JWT) upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JSON Web Token for authenticated requests.
 *       400:
 *         description: Bad request (e.g., missing username or password).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username and password are required
 *       401:
 *         description: Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid username or password
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/login', AuthenticationController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Registers a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - name
 *               - identity
 *               - phone
 *               - email
 *               - codeReferral
 *               - cityId
 *             properties:
 *               username:
 *                 type: string
 *                 description: The desired username for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               name:
 *                 type: string
 *                 description: The user's full name.
 *               identity:
 *                 type: string
 *                 description: The user's identity number or identifier.
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               cityId:
 *                 type: string
 *                 description: The user's geographical area.
 *               codeReferral:
 *                 type: string
 *                 description: Optional referral code.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request (e.g., missing required fields, username or identity already exists).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username OR Identity already exists
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/register', AuthenticationController.register);

/**
 * @swagger
 * /verify-email:
 *   get:
 *     summary: Verify user email address
 *     tags: [Authentication]
 *     description: Verifies a user's email address using a verification token provided in the query parameters.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The email verification token.
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *       400:
 *         description: Bad request (e.g., missing token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verification token is required
 *       404:
 *         description: Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/verify-email', AuthenticationController.verifyEmail);

export default router;