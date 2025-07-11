import express from 'express';
import {getAllNews, insertDetailNews, updateNews, getActiveNews} from '../controllers/news.controller.js';
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the news.
 *         title:
 *           type: string
 *           description: The title of the news article.
 *         description:
 *           type: string
 *           description: A brief description of the news article.
 *         image:
 *           type: string
 *           description: The image associated with the news article, encoded in Base64.
 *       example:
 *         id: 12
 *         title: "test title"
 *         description: "This is a test description for the news article."
 *         image: "Base64 encoded image string"
 */

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API for managing news articles
 */

/**
 * @swagger
 * /api/getAllNews:
 *   get:
 *     summary: Retrieve a list of all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
router.get('/getAllNews', getAllNews);

/**
 * @swagger
 * /api/getActiveNews:
 *   get:
 *     summary: Retrieve a list of active news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
router.get('/getActiveNews', getActiveNews);

/**
 * @swagger
 * /api/insertDetailNews:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
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
 *         description: News created successfully.
 *       500:
 *         description: Server error
 */
router.post('/insertDetailNews', insertDetailNews);

/**
 * @swagger
 * /api/updateNews/{id}:
 *   put:
 *     summary: Update an existing news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news article to update.
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
 *         description: News updated successfully.
 *       404:
 *         description: News not found or no changes made.
 *       500:
 *         description: Internal server error.
 */
router.put('/updateNews/:id', updateNews);

export default router;