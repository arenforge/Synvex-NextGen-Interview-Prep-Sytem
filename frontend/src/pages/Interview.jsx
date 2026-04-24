import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Interview.css'; // Your original CSS!
import { auth } from '../firebase';
import { useDeepgram } from '../hooks/useDeepgram';
import FeedbackCard from '../components/FeedbackCard';

// Auto-detect backend URL
const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";


const Interview = () => {
  const location = useLocation();
  const navigate =useNavigate()
  const sessionStarted = React.useRef(false)
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role") || "Software Engineer";
  const userTopic = queryParams.get("topic") || "React & Node.js";
  const userLevel = queryParams.get("level") || "Medium";
  const userType = queryParams.get("type") || "Technical";
  const interviewMode = queryParams.get("mode") || "role";
  const resumeData = JSON.parse(localStorage.getItem('resumeData') || 'null');


  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false); // To show a loading state while Gemini grades
  const [questionNumber, setQuestionNumber] = useState(1); // Explicitly track question count
  const { isListening, toggleListening } = useDeepgram(setUserInput);

  // Reference for stopping audio if needed
  const currentAudioRef = React.useRef(null);

  const playDeepgramVoice = async (text) => {
    try {
      // 1. Fetch token
      const tokenRes = await fetch(`${API_BASE_URL}/api/speech-token`);
      const { key } = await tokenRes.json();

      // 2. Fetch TTS Audio from Deepgram Aura
      const response = await fetch("https://api.deepgram.com/v1/speak?model=aura-asteria-en", {
        method: "POST",
        headers: {
          "Authorization": `Token ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error("Failed to get audio from Deepgram");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      // Save to ref and play
      currentAudioRef.current = audio;
      audio.play();
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  const makeApiCall = async (msg, forcedSessionId = null) => {
    if (!msg && !userInput) return; // Check if BOTH are empty


    setLoading(true);
    setResponse("");
    setUserInput('');




    try {
      // Auto-turn off the mic if it's currently on when the user clicks submit
      if (isListening) toggleListening();

      // Stop any currently playing TTS audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }

      // 1. Call your Node.js backend instead of Gemini directly
      const currentInput = msg || userInput;
      if (!msg) setUserInput(""); // Clear input early for better UX

      const apiRes = await fetch(`${API_BASE_URL}/api/interview/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history: history,
          role: userRole,
          level: userLevel,
          topic: userTopic,
          type: userType,
          name: auth.currentUser?.displayName || "Candidate",
          mode: interviewMode,
          resumeData: resumeData
        })
      });

      const data = await apiRes.json();
      const text = data.reply; // Extract the reply from backend

      if (!text) {
        console.error("Backend Error:", data.error || "No reply text");
        setResponse(data.error || "Failed to get response from AI. Please wait 10 seconds and try again.");
        return; // Exit early so we don't crash or save bad history
      }

      console.log("Backend API Response:", text);
      setResponse(text);

      // Play the AI Voice natively!
      playDeepgramVoice(text);

      // --- NEW BLOCK: Detect End of Interview ---
      if (text.toLowerCase().includes("concludes our interview") || text.toLowerCase().includes("terminated")) {
        setEvaluating(true);
        try {
          const evalRes = await fetch(`${API_BASE_URL}/api/interview/evaluate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionId,
              name: auth.currentUser?.displayName || "Candidate"
            }) // Use dynamic session ID and name!
          });
          const evalData = await evalRes.json();
          setFeedback(evalData.feedback);
        } catch (evalErr) {
          console.error("Evaluation error:", evalErr);
        } finally {
          setEvaluating(false);
        }
      }
      // ------------------------------------------

      // 2. Update the history and question count
      const currentMessage = msg || userInput;
      setHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: currentMessage }] },
        { role: 'model', parts: [{ text: text }] }
      ]);

      if (history.length > 0) {
        setQuestionNumber(prev => prev + 1);
      }

      // 3. Save the interaction to the database
      // SKIP saving if it's the initial "Hi" (msg is "Hi") to avoid empty entries
      const currentSessionId = forcedSessionId || sessionId;
      if (currentSessionId && msg !== "Hi") {
        await fetch(`${API_BASE_URL}/api/save-interview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: currentSessionId,
            aique: response, // The AI's previous question (before the one just received)
            userans: currentInput // The candidate's current answer
          })
        });
      }


    } catch (err) {
      console.error("Error calling Backend API:", err);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  // Start as soon as page loads
  // Start session and launch interview as soon as page loads
  React.useEffect(() => {
    if(sessionStarted.current) return; // if already started , to dobara nhi chalaenge
    sessionStarted.current = true; // Ab mark karo ki start ho chuka hai
    const startSession = async () => {
      const currentUser = auth.currentUser;
      const realEmail = currentUser ? currentUser.email : "guest@example.com";

      try {
        const sessionRes = await fetch(`${API_BASE_URL}/api/start-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: realEmail,
            role: userRole,
            level: userLevel,
            topic: userTopic,
            type: userType
          })
        });

        const data = await sessionRes.json();
        if (data.success) {
          setSessionId(data.sessionId); // Save the session ID to state!
        }

        // Kick off the interview questions after creating the session
        makeApiCall("Hi", data.sessionId);

      } catch (error) {
        console.error("Failed to start session", error);
      }
    };

    startSession();
  }, []);
  return (
    <div className="interview-container">
      {/* Background Orbs to match Landing Page theme */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <header className="engine-header">
        <span>Synvex Interview Engine</span>
      </header>

      {!feedback ? (
        <div className="interview-panels">
          {/* Left Panel: AI Response (Restored) */}
          <div className="panel ai-panel">
            <div className="panel-title">
              <span className="icon">✨</span> AI Response
            </div>

            <div className="panel-content">
              {loading ? (
                <div className="typing-status">
                  <span>•••</span> Interviewer is typing...
                </div>
              ) : response ? (
                <div className="ai-question">
                  <strong>Q{questionNumber} &rarr;</strong> {response}
                </div>
              ) : (
                <p className="welcome-text">The interview will begin shortly. Please stay professional.</p>
              )}

              {evaluating && (
                <div className="typing-status">
                  <span>•••</span> Preparing your performance feedback...
                </div>
              )}
            </div>
          </div>
          {/* Right Panel: Your Response (Swapped to Right) */}
          <div className="panel user-panel">
            <div className="panel-title">
              <span className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <circle cx="12" cy="12" r="12" fill="#FFF5F2"/>
                  <rect x="7" y="10" width="1.5" height="4" rx="0.75" fill="#FF5722"/>
                  <rect x="10" y="7" width="1.5" height="10" rx="0.75" fill="#FF5722"/>
                  <rect x="13" y="9" width="1.5" height="6" rx="0.75" fill="#FF5722"/>
                  <rect x="16" y="7" width="1.5" height="10" rx="0.75" fill="#FF5722"/>
                  <rect x="19" y="10" width="1.5" height="4" rx="0.75" fill="#FF5722"/>
                </svg>
              </span> 
              Your Response
            </div>
            
            <div className="panel-content user-input-container">
              <textarea
                className="response-textarea"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && userInput.trim() && !loading) {
                    e.preventDefault();
                    makeApiCall();
                  }
                }}
                placeholder={isListening ? "Listening to your voice..." : (loading ? "AI is processing..." : "Start speaking or type your response here...")}
                disabled={loading}
              />

              <div className="panel-footer">
                <button 
                  className="send-btn" 
                  onClick={() => makeApiCall()}
                  disabled={loading || !userInput.trim()}
                >
                  {loading ? "Sending..." : "Submit Response"}
                </button>
              </div>
            </div>

            <button
              className={`floating-mic-btn ${isListening ? 'listening-active' : ''}`}
              onClick={toggleListening}
              disabled={loading}
              title={isListening ? "Stop listening" : "Start speaking"}
            >
              {isListening ? (
                <div className="mic-active-content">
                  <div className="tiny-wave">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="end-text">End</span>
                </div>
              ) : (
                <div className="mic-idle-icon">
                  <div className="idle-wave">
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="completion-container">
          <div className="completion-card">
            <div className="completion-header">
              <h2>Interview Completed! 🎉</h2>
              <p>Well done! Here is your AI-powered performance analysis.</p>
            </div>
            
            <div className="completion-feedback-wrap">
              <FeedbackCard feedback={feedback} />
            </div>

            <div className="completion-footer">
              <button className="btn-finish-alt dashboard" onClick={() => navigate("/dashboard")}>
                🏠 Dashboard
              </button>
              <button className="btn-finish-alt reports" onClick={() => navigate("/reports")}>
                📊 Performance Reports
              </button>
              <button className="btn-finish-alt btn-quebank" onClick={() => navigate("/que-bank")}>
                🧠 Question Bank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
