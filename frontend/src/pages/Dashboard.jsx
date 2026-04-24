import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import ResumeAnalyzer from "../components/ResumeAnalyzer";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole]         = useState("Software Engineer");
  const [topic, setTopic]       = useState("React & Node.js");
  const [difficulty, setDiff]   = useState("Medium");
  const [type, setType]         = useState("Technical");
  const [duration, setDuration] = useState("10 min");

  const handleStartInterview = () => {
    navigate(`/interview?mode=role&role=${encodeURIComponent(role)}&topic=${encodeURIComponent(topic)}&level=${encodeURIComponent(difficulty)}&type=${encodeURIComponent(type)}&duration=${encodeURIComponent(duration)}`);
  };
  const handleStartResumeInterview = () => {
    const savedResume = localStorage.getItem('resumeData');
    if (!savedResume) {
      alert("Please upload and parse your resume using the Analyzer below first.");
      return;
    }
    navigate(`/interview?mode=resume&level=${encodeURIComponent(difficulty)}&duration=${encodeURIComponent(duration)}`);
  };

  const userName = auth.currentUser?.displayName || "User";

  return (
    <div className="dashboard-page">
      {/* Ambient orbs */}
      <div className="dash-orb dash-orb-1" />
      <div className="dash-orb dash-orb-2" />

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div>
          <h2 className="logo">Synvex</h2>
          <nav className="menu">
            <button className="menu-btn active" onClick={() => navigate("/dashboard")}>
              <span>🏠</span> Dashboard
            </button>
            <button className="menu-btn" onClick={() => navigate("/resume")}>
              <span>📄</span> AI Resume Analyzer
            </button>
            <button className="menu-btn" onClick={() => navigate("/reports")}>
              <span>📊</span> Performance Reports
            </button>
            <button className="menu-btn" onClick={() => navigate("/que-bank")}>
              <span>🧠</span> AI Question Bank
            </button>
          </nav>
        </div>
        <button className="logout-btn" onClick={() => navigate("/")}>
          🚪 Logout
        </button>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">

        {/* Welcome bar */}
        <div className="dash-welcome">
          <div>
            <p className="dash-greeting">Good to see you back,</p>
            <h1 className="dash-name">{userName} 👋</h1>
          </div>
          <div className="dash-quick-stats">
            <div className="quick-stat">
              <span className="qs-icon">🎯</span>
              <div><strong>Role-Based</strong><p>Interview</p></div>
            </div>
            <div className="quick-stat">
              <span className="qs-icon">📄</span>
              <div><strong>Resume</strong><p>Interview</p></div>
            </div>
            <div className="quick-stat">
              <span className="qs-icon">🧠</span>
              <div><strong>Question</strong><p>Bank</p></div>
            </div>
          </div>
        </div>

        {/* ── Interview Preferences card ── */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-icon">🎯</div>
            <div>
              <h2 className="dash-card-title">Interview Preferences</h2>
              <p className="dash-card-sub">Configure your next AI session — the AI adapts every question to your selections.</p>
            </div>
          </div>

          <div className="dash-form-grid">
            <div className="dash-field">
              <label>Target Job Role</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="dash-field">
              <label>Key Topic / Tech Stack</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. System Design, React" />
            </div>
            <div className="dash-field">
              <label>Difficulty Level</label>
              <select value={difficulty} onChange={e => setDiff(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="Hard">Hard (Senior Level)</option>
                <option value="Expert">Expert (Staff Level)</option>
              </select>
            </div>
            <div className="dash-field">
              <label>Interview Type</label>
              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="Technical">Technical (Coding & System)</option>
                <option value="HR">HR / Behavioral</option>
                <option value="Mixed">Mixed Rounds</option>
              </select>
            </div>
            <div className="dash-field">
              <label>Interview Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)}>
                <option>5 min</option>
                <option>10 min</option>
                <option>15 min</option>
                <option>20 min</option>
                <option>30 min</option>
                <option>1 hr</option>
              </select>
            </div>
          </div>

          <div className="dash-btn-row">
            <button className="dash-btn primary-dash-btn" onClick={handleStartInterview}>
              🚀 Start Role-Based Interview
            </button>
            <button className="dash-btn resume-dash-btn" onClick={handleStartResumeInterview}>
              📄 Start Resume-Based Interview
            </button>
          </div>
        </div>

        {/* ── Feature tiles ── */}
        <div className="dash-tiles">
          <div className="dash-tile" onClick={() => navigate("/que-bank")}>
            <span className="tile-icon">🧠</span>
            <strong>AI Question Bank</strong>
            <p>Practice 500+ topics</p>
          </div>
          <div className="dash-tile" onClick={() => navigate("/reports")}>
            <span className="tile-icon">📊</span>
            <strong>Performance Reports</strong>
            <p>Track your progress</p>
          </div>
          <div className="dash-tile" onClick={() => navigate("/resume")}>
            <span className="tile-icon">📄</span>
            <strong>Resume Analyzer</strong>
            <p>AI-tailored questions</p>
          </div>
        </div>

        {/* ── Resume Analyzer ── */}
        <div className="dash-card" style={{ marginTop: 0 }}>
          <div className="dash-card-header">
            <div className="dash-card-icon">📄</div>
            <div>
              <h2 className="dash-card-title">Resume Analyzer</h2>
              <p className="dash-card-sub">Upload your resume and get a fully personalized mock interview.</p>
            </div>
          </div>
          <ResumeAnalyzer />
        </div>

      </main>
    </div>
  );
}

export default Dashboard;