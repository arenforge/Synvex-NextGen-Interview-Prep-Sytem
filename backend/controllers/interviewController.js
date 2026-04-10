// controllers/interviewController.js
import genAI from '../config/gemini.js';
import {
  syncUser,
  startSession,
  addMessage,
  updateFeedback,
  getSessionMessages
} from '../models/interviewModel.js';

// A. Sync User Data (Login/Signup)
export const syncUserData = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await syncUser(email, name);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// B. Start a New Session
export const startInterviewSession = async (req, res, next) => {
  const { email, role, level } = req.body;
  try {
    await syncUser(email, "Interview Candidate");
    const sessionId = await startSession(email, role, level);
    res.json({ success: true, sessionId });
  } catch (error) {
    next(error);
  }
};

// POST /api/save-interview
// C. Save Individual Message
export const saveInterview = async (req, res, next) => {
  const { sessionId, aique, userans } = req.body;
  try {
    const saved = await addMessage(sessionId, aique, userans);
    res.json({ success: true, message: "Saved to messages table!", data: saved });
  } catch (error) {
    next(error);
  }
};


// POST /api/interview/chat
export const chatWithAI = async (req, res, next) => {
  try {
    const { message, history, role, level, topic, type, name } = req.body;

    const systemPrompt = `You are a senior interviewer at a top tech company conducting a real job interview for a ${role} position at ${level} level.
The primary focus topic for this interview is: ${topic}.
The interview round is of type: ${type}.
Candidate Name is ${name}
## Your Persona
- Professional, calm, and neutral — like a real interviewer
- Slightly formal but not robotic. Occasionally use natural filler phrases like "Great.", "Alright.", "Got it." — but keep it brief
- You have years of experience interviewing candidates. You are not easily impressed.

## Interview Structure (strictly follow this order)
You must ask exactly 6 questions, one at a time, in this order:

1. "Tell me about yourself."
2. "Why are you interested in this ${role} role?"
3-6. Strictly generate questions aligned with the interview type (${type}) and primarily focused on the topic (${topic}). If technical, ask deep technical questions testing real depth, trade-offs, and architecture. If HR/Behavioral, ask situational and behavioral questions.

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
- Never repeat a question`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
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
    next(err);
  }
};
// POST /api/interview/evaluate
export const evaluateInterview = async (req, res, next) => {
  try {
    const { sessionId, name } = req.body;

    // 1. Get the conversation from Postgres
    const messages = await getSessionMessages(sessionId);
    if (!messages || messages.length === 0) return res.json({ feedback: "No answers to evaluate." });

    // 2. Format the conversation into a readable string
    const transcript = messages.map(m => `Interviewer: ${m.aique}\nCandidate: ${m.userans}`).join('\n\n');

    const prompt = `You are an expert technical interviewer. Candidate Name is ${name} Evaluate the candidate based on this interview transcript.\n\n${transcript}\n\nProvide constructive feedback on their technical answers and give a final score out of 10. Format the response nicely.`;

    // 3. Ask Gemini for an evaluation
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const result = await model.generateContent(prompt);
    const feedback = result.response.text();

    // 4. Save feedback to database
    await updateFeedback(sessionId, feedback);

    res.json({ success: true, feedback });
  } catch (err) {
    console.error('Feedback Error:', err);
    next(err);
  }
};

// --- DEEPGRAM LOGIC ---
export const getSpeechToken = async (req, res) => {
  try {
    // Return the API key directly to frontend
    // This avoids the 'keys:write' permission error with the Deepgram Scoped Keys API
    if (process.env.DEEPGRAM_API_KEY) {
      res.json({ key: process.env.DEEPGRAM_API_KEY });
    } else {
      res.status(500).json({ error: "DEEPGRAM_API_KEY not found in backend .env" });
    }
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};



