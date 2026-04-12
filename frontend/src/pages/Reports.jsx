// frontend/src/pages/Reports.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import FeedbackCard from '../components/FeedbackCard';
import './Reports.css';

function Reports() {
  const [sessions, setSessions] = useState([]);
  const [openId, setOpenId] = useState(null);
  const[loading,setLoading] = useState(true);

 useEffect(() => {
  // auth.currentUser directly lene ke bajay Firebase ka event sunenge
  // kyunki Firebase async hai — currentUser shuru mein null ho sakta hai
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      setLoading(false); // Login nahi hai
      return;
    }

    fetch(`http://localhost:5000/api/sessions/${user.email}`)
      .then(r => r.json())
      .then(data => {
        console.log('All sessions from API:', data.sessions);
        if (data.success) {
          // Sirf woh sessions dikhao jinka feedback hai — baaki incomplete hain
          const completed = data.sessions.filter(s => s.feedback !== null);
          console.log('Sessions with feedback:', completed);
          setSessions(completed);
        }
      })
      .finally(() => setLoading(false));
  });

  return () => unsubscribe(); // Cleanup — memory leak avoid karo
}, []);


  return (
    <div className="reports-page">
      <h1>Performance Reports</h1>
      <p>Click on any Session to see the feedback.</p>

      {loading ? <p>Loading sessions...</p> : sessions.length === 0 && 
      <p>You have not given any Interview yet!</p>}

      {sessions.map((session, index) => (
        <div key={session.id} className="session-card">

          {/* Click karo to open/close */}
          <div
            className={`session-header ${openId === session.id ? 'expanded' : ''}`}
            onClick={() => setOpenId(openId === session.id ? null : session.id)}
          >
            <span>Session {sessions.length - index} — {session.role} — {session.level}</span>
            <span>{openId === session.id ? '▲' : '▼'}</span>
          </div>

          {/* Feedback sirf tab dikhao jab session khula ho */}
          {openId === session.id && (
            <div className="session-feedback">
              {session.feedback
                ? <FeedbackCard feedback={session.feedback} />
                : <p>Feedback not available</p>}
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default Reports;
