import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import FeedbackCard from '../components/FeedbackCard';
import './Reports.css';

const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";

function Reports() {
  const [sessions, setSessions] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) { setLoading(false); return; }
      fetch(`${API_BASE_URL}/api/sessions/${user.email}`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            const completed = data.sessions.filter(s => s.feedback !== null);
            setSessions(completed);
          }
        })
        .finally(() => setLoading(false));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="reports-page">

      {/* Hero */}
      <div className="reports-hero">
        <div className="reports-eyebrow">📊 AI Analysis</div>
        <h1>Performance <span>Reports</span></h1>
        <p>Review your past interview sessions and track your improvement over time.</p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="reports-loading">⏳ Loading your sessions…</p>
      )}

      {/* Empty state */}
      {!loading && sessions.length === 0 && (
        <div className="reports-empty">
          <div className="empty-icon">🎯</div>
          <p>You haven't completed any interviews yet.<br />Start a session to see your performance here!</p>
        </div>
      )}

      {/* Session list */}
      <div className="reports-list">
        {sessions.map((session, index) => (
          <div key={session.id} className="session-card">
            <div
              className={`session-header ${openId === session.id ? 'expanded' : ''}`}
              onClick={() => setOpenId(openId === session.id ? null : session.id)}
            >
              <span>Session {sessions.length - index} — {session.role} — {session.level}</span>
              <span>{openId === session.id ? '▲' : '▼'}</span>
            </div>

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

    </div>
  );
}

export default Reports;
