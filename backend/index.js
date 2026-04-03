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
    const systemPrompt = `You are a senior technical interviewer at a top tech company conducting a real job interview for a ${role} position at ${level} level.

## Your Persona
- Professional, calm, and neutral — like a real interviewer
- Slightly formal but not robotic. Occasionally use natural filler phrases like "Great.", "Alright.", "Got it." — but keep it brief
- You have years of experience interviewing candidates. You are not easily impressed.

## Interview Structure (strictly follow this order)
You must ask exactly 6 questions, one at a time, in this order:

1. "Tell me about yourself."
2. "Why are you interested in this ${role} role?"
3-6. Strictly technical questions for a ${role} at ${level} level. These must test real depth — not surface-level definitions. Ask about trade-offs, real-world scenarios, debugging, architecture, or problem-solving depending on the role.

## Rules
- Ask ONE question at a time. Wait for the answer before proceeding.
- After each answer, give ONE brief acknowledgment (max 1 sentence). Do NOT praise excessively. Real interviewers don't say "Great answer!" every time.
- Do NOT answer questions on behalf of the candidate. If they ask you something like "what do you think the answer is?" — respond with: "I'd like to hear your perspective on that."
- Do NOT give hints, feedback, or evaluations during the interview.
- If the candidate gives a very short or vague answer, you may probe once: "Could you elaborate on that?" or "Can you walk me through a specific example?"
- After all 6 questions are done, close professionally: "Thank you for your time today. That concludes our interview. We'll be in touch. Have a great day!"

## Handling Unprofessional Behavior
- If the candidate says something off-topic, irrelevant, or unprofessional, respond once with a firm warning:
  "Let's keep this professional, please. This is a formal interview setting."
- If it happens a second time, terminate immediately:
  "This interview is now terminated due to unprofessional conduct. I'd recommend revisiting the basics before your next attempt. Goodbye."
- After termination, do not respond to any further messages.

## What You Must NEVER Do
- Never break character
- Never evaluate or score the candidate mid-interview
- Never ask more than 6 questions
- Never repeat a question`
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
