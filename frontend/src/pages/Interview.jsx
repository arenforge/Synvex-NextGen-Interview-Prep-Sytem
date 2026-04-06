import React, { useState } from 'react';
import './Interview.css'; // Your original CSS!
import { auth } from '../firebase';

const Interview = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false); // To show a loading state while Gemini grades

  const makeApiCall = async (msg) => {
    if (!msg && !userInput) return; // Check if BOTH are empty


    setLoading(true);
    setResponse("");

    try {
      // 1. Call your Node.js backend instead of Gemini directly
      const apiRes = await fetch("https://synvex-backend-ioc4.onrender.com/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg || userInput,
          history: history,
          role: "Full Stack Developer", // isko baadme dashboard se lena hai
          level: "Junior"               // isko bhi dashboard se lena hai
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

      // --- NEW BLOCK: Detect End of Interview ---
      if (text.toLowerCase().includes("concludes our interview") || text.toLowerCase().includes("terminated")) {
        setEvaluating(true);
        try {
          const evalRes = await fetch("https://synvex-backend-ioc4.onrender.com/api/interview/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sessionId }) // Use dynamic session ID!
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

      // 2. Update the history so next question remembers what was said
      const currentMessage = msg || userInput;
      setHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: currentMessage }] },
        { role: 'model', parts: [{ text: text }] }
      ]);

      // 3. Your exact code from before to save to the database!
      const currentUser = auth.currentUser;
      const realEmail = currentUser ? currentUser.email : "guest@example.com";

      await fetch("https://synvex-backend-ioc4.onrender.com/api/save-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId, // We will dynamically set this in the next step, hardcode 1 for now
          aiQue: response, // The AI's previous question
          userAns: userInput // The user's answer
        })
      });


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
    const startSession = async () => {
      const currentUser = auth.currentUser;
      const realEmail = currentUser ? currentUser.email : "guest@example.com";

      try {
        const sessionRes = await fetch("https://synvex-backend-ioc4.onrender.com/api/start-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: realEmail,
            role: "Full Stack Developer", // Hardcoded for now
            level: "Junior"               // Hardcoded for now
          })
        });

        const data = await sessionRes.json();
        if (data.success) {
          setSessionId(data.sessionId); // Save the session ID to state!
        }

        // Kick off the interview questions after creating the session
        makeApiCall("Hi");

      } catch (error) {
        console.error("Failed to start session", error);
      }
    };

    startSession();
  }, []);


  return (
    <div className="interview-container">
      <h2>Synvex Interview Engine</h2>

      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={loading ? "Loading..." : "Give Your Response"}
          disabled={loading}

        />
   <button onClick={() => makeApiCall()} disabled={loading}>

          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      <div className="response-area">
        {feedback ? (
          <div className="feedback-box">
            <h3>Interview Completed! 🎉</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{feedback}</pre>
          </div>
        ) : (
          <div>
            <p>{response}</p>
            {evaluating && <p style={{ color: "#f59e0b", marginTop: "10px" }}>⏳ Interview finished. Generating your scores and feedback...</p>}
          </div>
        )}
      </div>

    </div>
  );
};

export default Interview;
