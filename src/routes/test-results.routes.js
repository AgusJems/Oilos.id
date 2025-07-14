import express from 'express';
import {getAllTestResults, insertDetailTestResults, updateTestResults, getActiveTestResults, deleteTestResults, getTestResultsById} from '../controllers/test-results.controller.js';
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     TestResults:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the test results.
 *         title:
 *           type: string
 *           description: The title of the test results article.
 *         description:
 *           type: string
 *           description: A brief description of the test results article.
 *         image:
 *           type: string
 *           description: The image associated with the test results article, encoded in Base64.
 *       example:
 *         id: 12
 *         title: "test title"
 *         description: "This is a test description for the test results article."
 *         image: "Base64 encoded image string"
 */

/**
 * @swagger
 * tags:
 *   name: TestResults
 *   description: API for managing test results articles
 */

/**
 * @swagger
 * /api/getAllTestResults:
 *   get:
 *     summary: Retrieve a list of all test results articles
 *     tags: [TestResults]
 *     responses:
 *       200:
 *         description: A list of test results articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestResults'
 *       500:
 *         description: Server error
 */
router.get('/getAllTestResults', getAllTestResults);

/**
 * @swagger
 * /api/getActiveTestResults:
 *   get:
 *     summary: Retrieve a list of active test results articles
 *     tags: [TestResults]
 *     responses:
 *       200:
 *         description: A list of test results articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestResults'
 *       500:
 *         description: Server error
 */
router.get('/getActiveTestResults', getActiveTestResults);

/**
 * @openapi
 * /api/getTestResultsById/{id}:
 *   get:
 *     summary: Get a test results article by ID
 *     description: Retrieve a single test results article by its unique ID.
 *     tags:
 *       - TestResults
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the test results article to retrieve.
 *         schema:
 *           type: string
 *           example: '1a2b3c4d'
 *     responses:
 *       '200':
 *         description: Successfully retrieved the test results article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The test results article ID.
 *                   example: '1a2b3c4d'
 *                 title:
 *                   type: string
 *                   description: The title of the test results article.
 *                   example: 'Important Announcement'
 *                 content:
 *                   type: string
 *                   description: The full content of the test results article.
 *                   example: 'Here is the full content of the test results...'
 *       '400':
 *         description: Invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid ID format.'
 *       '404':
 *         description: TestResults article not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'TestResults article with id 1a2b3c4d not found.'
 */

router.get('/getTestResultsById/:id', getTestResultsById);


/**
 * @swagger
 * /api/insertDetailTestResults:
 *   post:
 *     summary: Create a new test results article
 *     tags: [TestResults]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - image
 *     responses:
 *       201:
 *         description: TestResults created successfully.
 *       500:
 *         description: Server error
 */
router.post('/insertDetailTestResults', insertDetailTestResults);

/**
 * @swagger
 * /api/updateTestResults/{id}:
 *   put:
 *     summary: Update an existing test results article
 *     tags: [TestResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the test results article to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: TestResults updated successfully.
 *       404:
 *         description: TestResults not found or no changes made.
 *       500:
 *         description: Internal server error.
 */
router.put('/updateTestResults/:id', updateTestResults);

/**
 * @swagger
 * /api/deleteTestResults/{id}:
 *   delete:
 *     summary: Delete a test results article
 *     tags: [TestResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the test results article to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TestResults deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete('/deleteTestResults/:id', deleteTestResults);

export default router;