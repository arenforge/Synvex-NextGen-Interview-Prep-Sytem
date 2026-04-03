// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // Import our parking lot!
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();

// Cors ye hai Middleware -> Node aur React baat kar sakte to each other
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// frontend react se data receive karega
app.post('/api/save-interview', async (req, res) => {
  // 1. Grab the exact data React sent us
  const { userName, email, question, aiResponse } = req.body;

  try {
    // 2. Insert into PostgreSQL securely
    await pool.query(
      'INSERT INTO interviews (user_name, email, question, ai_response) VALUES ($1, $2, $3, $4)',
      [userName, email, question, aiResponse]
    );
    console.log("Data saved successfully!");
    res.json({ success: true, message: "Saved to database!" });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

// New Interview Chat Route
app.post('/api/interview/chat', async (req, res) => {
  try {
    const { message, history, role, level } = req.body;

    // Updated Prompt: 2 non-tech, rest ONLY technical.
    const systemPrompt = `You are a strict and professional interview conductor for the role of "${role}" at "${level}" level. 

Your rules:
- You must ask exactly 6 questions total, one at a time.
- Question 1 MUST be: "Tell me about yourself."
- Question 2 MUST be: "Why do you want to apply for this role?"
- Questions 3-6 MUST be strictly technical questions relevant to the "${role}" role at "${level}" level. Do not ask behavioral questions after question 2.
- After the user answers each question, briefly acknowledge their answer (1 short line) and then ask the next question.
- Do NOT answer questions for the user. You are the interviewer, not the interviewee.
- After all 6 questions are answered, conclude the interview professionally by saying something like: "Thank you for your time. This concludes our interview. Have a great day!"
- Do NOT generate any feedback or evaluation. Just conduct the interview.
- Keep your responses concise and professional.`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: history || []
    });

    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

    res.json({ reply: aiResponse });

  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server perfectly running on port ${PORT}`);
});
