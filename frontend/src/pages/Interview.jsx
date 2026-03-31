import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Interview.css';
import { auth } from '../firebase';

const Interview = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const makeApiCall = async () => {
    if (!userInput) return;

    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(userInput);
      const text = result.response.text();

      console.log("Gemini API Response:", text); // Console logging the response
      setResponse(text);
      //yaha pe wm trying to get  the realEmail from firebase so that it ca be uploaded to firebase
      const currentUser = auth.currentUser;
      const realEmail = currentUser ? currentUser.email : "guest@example.com";
      
      // yaha pe we will send the api responses to the backend
            // Send the data to your Node.js backend
      await fetch("http://localhost:5000/api/save-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: "Test User",       // Hardcoded for now
          email: realEmail,   // Hardcoded for now
          question: userInput,         // What the user typed
          aiResponse: text             // What the AI said back
        })
      });

    } catch (err) {
      console.error("Error calling Gemini API:", err);
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