import genAI from '../config/gemini.js';
import { getUserSessions } from '../models/interviewModel.js';

// Helper function to keep our Gemini code clean and reusable
const getGeminiResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
  const result = await model.generateContent(prompt);
  let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(text);
};

export const generateManual = async (req, res, next) => {
  try {
    const { topic, difficulty, count } = req.body;
    const prompt = `You are a technical interviewer. Generate exactly ${count} interview questions on "${topic}" at "${difficulty}" difficulty.
Return EXACTLY a JSON array: [{"question": "...", "solution": "...", "hints": ["..."], "expected_topics": ["..."]}]`;

    const questions = await getGeminiResponse(prompt);
    res.json({ success: true, questions });
  } catch (error) {
    next(error); // Let your global errorHandler handle this!
  }
};

export const generatePersonalized = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Fetch sessions and safely grab the feedback using optional chaining
    const sessions = await getUserSessions(email);
    const feedback = sessions?.find(s => s.feedback)?.feedback;




    if (!feedback) {
      return res.status(400).json({ success: false, error: "No past interview feedback found to analyze." });
    }

    const feedbackObj = typeof feedback === 'string' ? JSON.parse(feedback) : feedback;
    const weaknesses = feedbackObj.technical_weaknesses || ["general technical skills"];

    const prompt = `A candidate has weaknesses in: ${weaknesses.join(', ')}.
Generate 5 targeted practice questions specifically to improve these weak areas.
Return EXACTLY a JSON array: [{"question": "...", "solution": "...", "hints": ["..."], "expected_topics": ["..."]}]`;

    const questions = await getGeminiResponse(prompt);
    res.json({ success: true, questions });
  } catch (error) {
    next(error);
  }
};
