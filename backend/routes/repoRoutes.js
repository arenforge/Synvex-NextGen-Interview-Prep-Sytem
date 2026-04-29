// backend/routes/repoRoutes.js
import express from 'express';
import { buildRepoContext } from '../controllers/repoController.js';

const router = express.Router();

// This endpoint will be called by the frontend to analyze the repo
router.post('/context', buildRepoContext);

export default router;
