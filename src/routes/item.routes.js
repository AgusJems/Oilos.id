import { Router } from 'express';
import {getAllItems, getActiveItems, getItemsById, insertDetailItems, updateItems, deleteItems} from '../controllers/item.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the item.
 *         code:
 *           type: string
 *           description: The unique code for the item.
 *         name:
 *           type: string
 *           description: The name of the item.
 *         description:
 *           type: string
 *           description: A description of the item.
 *         image:
 *           type: string
 *           description: The image associated with the item, encoded in Base64.
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the item.
 *         status:
 *           type: integer
 *           description: The status of the item (e.g., 1 for active, 0 for inactive).
 *         created_by:
 *           type: string
 *           description: Who created the item record.
 *       example:
 *         id: 1
 *         code: "TI-010120241200"
 *         name: "Test Item"
 *         description: "This is a test item."
 *         image: "Base64 encoded image string"
 *         price: 99.99
 *         status: 1
 *         created_by: "Developer"
 *
 *     NewItem:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item.
 *         description:
 *           type: string
 *           description: A description of the item.
 *         image:
 *           type: string
 *           description: The image for the item, encoded in Base64.
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the item.
 *       example:
 *         name: "New Gadget"
 *         description: "A very useful new gadget."
 *         image: "Base64 encoded image string"
 *         price: 149.99
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * /api/items/getAllItems:
 *   get:
 *     summary: Retrieve a list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Server error
 */
router.get('/getAllItems', getAllItems);

/**
 * @swagger
 * /api/items/getActiveItems:
 *   get:
 *     summary: Retrieve a list of all active items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of active items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Server error
 */
router.get('/getActiveItems', getActiveItems);

/**
 * @swagger
 * /api/items/getItemsById/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Server error
 */
router.get('/getItemsById/:id', getItemsById);

/**
 * @swagger
 * /api/items/insertDetailItems:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewItem'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *       500:
 *         description: Server error
 */
router.post('/insertDetailItems', insertDetailItems);

/**
 * @swagger
 * /api/items/updateItems/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewItem'
 *     responses:
 *       200:
 *         description: The item was updated
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Server error
 */
router.put('/updateItems/:id', updateItems);

/**
 * @swagger
 * /api/items/deleteItems/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item was deleted
 *       500:
 *         description: Server error
 */
router.delete('/deleteItems/:id', deleteItems);


export default router;