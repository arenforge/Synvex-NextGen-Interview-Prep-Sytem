// backend/routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/resumeController.js';

const router = express.Router();

// Configure multer to save files temporarily in a 'uploads' folder
const upload = multer({ dest: 'uploads/' });

// Route to handle PDF upload, expecting a form field named 'resume'
router.post('/upload', upload.single('resume'), analyzeResume);

export default router;
