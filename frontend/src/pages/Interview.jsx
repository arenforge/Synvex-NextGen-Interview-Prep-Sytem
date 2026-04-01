import React, { useState } from 'react';
import './Interview.css'; // Your original CSS!
import { auth } from '../firebase';

const Interview = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  // NEW: Keep track of chat history so the AI remembers the conversation
  const [history, setHistory] = useState([]);

  const makeApiCall = async () => {
    if (!userInput) return;

    setLoading(true);
    setResponse("");

    try {
      // 1. Call your Node.js backend instead of Gemini directly
      const apiRes = await fetch("http://localhost:5000/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          history: history,
          role: "Full Stack Developer", // isko baadme dashboard se lena hai
          level: "Junior"               // isko bhi dashboard se lena hai
        })
      });
      
      const data = await apiRes.json();
      const text = data.reply; // Extract the reply from backend

      console.log("Backend API Response:", text);
      setResponse(text);
      
      // 2. Update the history so next question remembers what was said
      setHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: userInput }] },
        { role: 'model', parts: [{ text: text }] }
      ]);
      
      // 3. Your exact code from before to save to the database!
      const currentUser = auth.currentUser;
      const realEmail = currentUser ? currentUser.email : "guest@example.com";
      
      await fetch("http://localhost:5000/api/save-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: "Test User",       
          email: realEmail,   
          question: userInput,         
          aiResponse: text             
        })
      });

    } catch (err) {
      console.error("Error calling Backend API:", err);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-container">
      <h2>Interview Chatbot</h2>

      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={makeApiCall} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      <div className="response-area">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Interview;
