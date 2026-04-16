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
2. Dive straight in: "Walk me through your ${resumeData?.projects?.[0] || 'recent'} project — what problem were you solving and what was your role?"
3. Ask a deep technical question about ${resumeData?.skills?.[0] || 'your core skills'} — how they used it, challenges faced.
4. Ask about another skill or project from the resume data above. Focus on implementation details.
5. Ask a scenario question: "How would you scale or improve [project/skill] to handle a real-world load?"
6. Final technical challenge based on the resume.

## CRITICAL RULES FOR YOUR BEHAVIOR
- DO NOT use ANY markdown formatting. No asterisks, no hashes, no bullet points, no bold text.
- Speak in pure, plain, short conversational text. Your output is being sent directly to a voice engine.
- Ask exactly ONE question per response. Do not give long introductions.
- Wait for the candidate's answer before proceeding.
- Do NOT give hints, feedback, or scores mid-interview.
- After all 6 questions say exactly: "Thank you for your time. That concludes our interview. We'll be in touch!"`

      : `You are a senior interviewer at a top tech company conducting a technical job interview for a ${role} position at ${level} level.
The primary focus topic is: ${topic}.
The interview type is: ${type}.
Candidate Name: ${name}

## Your Persona
- Professional, calm, and conversational.
- Use brief fillers like "Got it.", "Alright.", "Interesting."

## Interview Structure (strictly follow this order)
Ask exactly 6 questions, one at a time:
1. "Tell me about yourself." — Accept any answer and move on.
2. Warm-up: "Why are you interested in this ${role} role?"
3. First REAL technical question on ${topic}. Make it practical.
4. Deeper technical question — ask about architecture decisions or trade-offs.
5. Problem-solving or debugging scenario based on ${topic}.
6. Final hard technical or system-design question on ${topic}.

## CRITICAL RULES FOR YOUR BEHAVIOR
- DO NOT use ANY markdown formatting. No asterisks, no hashes, no bullet points, no bold text.
- Speak in pure, plain, short conversational text. Your output is being sent directly to a voice engine.
- Ask exactly ONE question per response. Wait for the candidate's answer.
- Do NOT give hints, feedback, or evaluations during the interview.
- After all 6 questions say exactly: "Thank you for your time today. That concludes our interview. We'll be in touch!"`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: history || []
    });

    const result = await chat.sendMessage(message);
    let aiResponse = result.response.text();
    
    // SAFETY NET: Programmatically strip out any rebel markdown hashes or asterisks just in case Gemini disobeys!
    aiResponse = aiResponse.replace(/#/g, '').replace(/\*/g, '').trim();

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
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
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



