import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import interviewRoutes from './routes/interviewRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', interviewRoutes);
app.use('/api/resume',resumeRoutes)
// Global Error Handler, jo hamne define kiya hai middleware/errorHandler.js me
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server perfectly running on port ${PORT}`);
});
