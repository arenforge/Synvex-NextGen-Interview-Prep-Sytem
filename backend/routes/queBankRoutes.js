import express from 'express';
import { generateManual, generatePersonalized } from '../controllers/queBankController.js';

const router = express.Router();

// POST /api/que-bank/manual
router.post('/manual', generateManual);

// POST /api/que-bank/personalized
router.post('/personalized', generatePersonalized);

export default router;
