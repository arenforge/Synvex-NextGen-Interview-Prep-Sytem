// controllers/interviewController.js
import genAI from '../config/gemini.js';
import {
  syncUser,
  startSession,
  addMessage,
  updateFeedback,
  getSessionMessages,
  getUserSessions
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
    const { message, history, role, level, topic, type, name, mode, resumeData } = req.body;

    const systemPrompt = mode === 'resume'
      ? `You are a senior interviewer conducting a RESUME-BASED technical interview for ${name}.

## Candidate Resume Data
- Skills: ${resumeData?.skills?.join(', ')}
- Projects: ${resumeData?.projects?.join(', ')}
- Experience: ${resumeData?.experience_summary}

## Interview Structure (strictly follow this order)
Ask exactly 6 questions, one at a time:
1. "Tell me about yourself." — Accept any answer immediately and move on. Do NOT ask follow-up general questions.
2. Dive straight in: "Walk me through your ${resumeData?.projects?.[0]} project — what problem were you solving and what was your specific role?"
3. Ask a deep technical question about ${resumeData?.skills?.[0]} — how they used it, challenges they faced, how they'd improve it.
4. Ask about another skill or project from the resume data above. Focus on implementation details, architecture, or debugging.
5. Ask a scenario question: "How would you scale or improve [project/skill from resume] to handle a real-world load?"
6. Final technical challenge based on the resume.

## Rules
- Ask ONE question at a time.
- After each answer, give ONE brief acknowledgment ("Got it.", "Interesting.", "Alright.") then immediately ask the next question.
- Do NOT ask about any skill or technology NOT listed in the resume data above.
- Do NOT give hints, feedback, or scores mid-interview.
- After all 6 questions: "Thank you for your time. That concludes our interview. We'll be in touch!"

## Handling Unprofessional Behavior
- First offense: "Let's keep this professional, please."
- Second offense: "This interview is now terminated. Goodbye."
- After termination, do not respond to any further messages.`

      : `You are a senior interviewer at a top tech company conducting a technical job interview for a ${role} position at ${level} level.
The primary focus topic is: ${topic}.
The interview type is: ${type}.
Candidate Name: ${name}

## Your Persona
- Professional, calm, and neutral — like a real interviewer
- Slightly formal but natural. Use brief fillers like "Got it.", "Alright.", "Interesting." — keep them short.
- You are not easily impressed. You have interviewed hundreds of candidates.

## Interview Structure (strictly follow this order)
Ask exactly 6 questions, one at a time:
1. "Tell me about yourself." — Accept any answer and move on immediately.
2. One quick warm-up: "Why are you interested in this ${role} role?" — Accept any answer and move on without dwelling.
3. First REAL technical question on ${topic}. Make it practical and challenging.
4. Deeper technical question — ask about architecture decisions, trade-offs, or a design scenario related to ${topic}.
5. Problem-solving or debugging scenario based on ${topic}.
6. Final hard technical or system-design question on ${topic}.

## Rules
- Ask ONE question at a time. Wait for the answer before proceeding.
- Do NOT ask more than 2 general/soft questions. Questions 3-6 must be strictly technical.
- After each answer, give ONE brief acknowledgment (max 1 sentence). Do NOT praise excessively.
- Do NOT give hints, feedback, or evaluations during the interview.
- If the candidate gives a very short answer, probe once: "Could you elaborate on that?"
- After all 6 questions: "Thank you for your time today. That concludes our interview. We'll be in touch!"

## Handling Unprofessional Behavior
- First offense: "Let's keep this professional, please. This is a formal interview setting."
- Second offense: "This interview is now terminated due to unprofessional conduct. Goodbye."
- After termination, do not respond to any further messages.

## What You Must NEVER Do
- Never break character
- Never evaluate or score the candidate mid-interview
- Never ask more than 6 questions
- Never ask more than 2 general/soft questions
- Never repeat a question`;


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

    const prompt = `You are an expert technical interviewer evaluating a candidate named ${name}.

Based on this interview transcript, return a JSON evaluation. No markdown, no backticks, ONLY a raw JSON object.

Transcript:
${transcript}

Return EXACTLY this JSON structure:
{
  "technical_strengths": ["specific strength 1", "specific strength 2"],
  "technical_weaknesses": ["specific topic to improve 1", "specific topic to improve 2"],
  "communication": {
    "rating": "Strong / Moderate / Needs Work",
    "tip": "One specific actionable tip"
  },
  "accuracy": {
    "rating": "Strong / Moderate / Needs Work",
    "tip": "One specific actionable tip"
  },
  "confidence": {
    "rating": "Strong / Moderate / Needs Work",
    "tip": "One specific actionable tip"
  },
  "overall_verdict": "Interview Ready / Almost There / Needs More Preparation",
  "summary": "2-3 sentence honest overall summary of the candidate."
}

Rules:
- Be honest and specific — mention actual technologies or topics from the transcript
- technical_strengths and technical_weaknesses must reference real answers given
- Do NOT pad with generic advice
- Return NOTHING except the JSON object`;


    // 3. Ask Gemini for an evaluation
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);

    // Parse JSON from Gemini (clean up any accidental markdown first)
    let responseText = result.response.text();
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const feedback = JSON.parse(responseText);

    // 4. Save feedback to database (as string)
    await updateFeedback(sessionId, JSON.stringify(feedback));

    res.json({ success: true, feedback }); // Send parsed object to frontend
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
// GET /api/sessions/:email
export const getSessions = async (req, res, next) => {
  try {
    const { email } = req.params; // Gets 'someone@gmail.com' from the URL
    const sessions = await getUserSessions(email); // Calls the model
    res.json({ success: true, sessions });
  } catch (err) {
    next(err);
  }
};



