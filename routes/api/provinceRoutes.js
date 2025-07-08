import express from 'express';
import ProvinceController from '../../src/controllers/ProvinceController.js';

const router = express.Router();

// Route to get all provinces
router.get('/getAllProvinces', ProvinceController.getAllProvinces);

export default router;