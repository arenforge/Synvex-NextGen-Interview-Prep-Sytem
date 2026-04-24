import { useState, useRef } from "react";

const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";

export const useDeepgram = (onTranscript) => {
  const [isListening, setIsListening] = useState(false);
  const socket = useRef(null);
  const recorder = useRef(null);

  const toggleListening = async () => {
    if (isListening) {
      // Sab band karo
      recorder.current?.stop();
      socket.current?.close();
      setIsListening(false);
      return;
    }

    try {
      // Backend se token lo
      const res = await fetch(`${API_BASE_URL}/api/speech-token`).then(r => r.json());
      
      // Raw WebSocket use kar rahe hain (No SDK needed!)
      // Deepgram ko direct URL pe audio bhejenge
      const ws = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', ['token', res.key]);

      ws.onopen = async () => {
        // Mic start karo jab connection open ho jaye
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0 && ws.readyState === 1) ws.send(e.data);
        };
        
        mediaRecorder.start(250);
        recorder.current = mediaRecorder;
        setIsListening(true);
      };

      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const text = data.channel?.alternatives[0]?.transcript;
        if (text && data.is_final) onTranscript(prev => prev + " " + text);
      };

      ws.onerror = (err) => console.error("WS Error", err);
      ws.onclose = () => setIsListening(false);
      socket.current = ws;

    } catch (err) {
      alert("Mic or Connection error!");
    }
  };

  return { isListening, toggleListening };
};
