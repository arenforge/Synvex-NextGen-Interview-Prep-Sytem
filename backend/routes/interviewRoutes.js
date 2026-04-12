import express from 'express';
import { saveInterview,
     chatWithAI,
     syncUserData,
     startInterviewSession,
     evaluateInterview,
     getSpeechToken,
    getSessions} from '../controllers/interviewController.js';

const router = express.Router();

router.post('/sync-user', syncUserData);
router.post('/start-session', startInterviewSession);
router.post('/interview/chat', chatWithAI);
router.post('/save-interview', saveInterview);
router.post('/interview/evaluate', evaluateInterview);
router.get('/speech-token', getSpeechToken);
router.get('/sessions/:email',getSessions)





export default router;
