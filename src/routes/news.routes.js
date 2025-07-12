import express from 'express';
import {getAllNews} from '../controllers/news.controller.js';
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

export default router;