import express from 'express';
import { saveInterview, chatWithAI } from '../controllers/interviewController.js';

const router = express.Router();

router.post('/save-interview', saveInterview);
router.post('/interview/chat', chatWithAI);

export default router;
