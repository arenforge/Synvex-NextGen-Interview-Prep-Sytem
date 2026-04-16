import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'
import ResumeAnalyzer from "../components/ResumeAnalyzer";


function Dashboard() {
  const navigate = useNavigate();

  // State for Interview Preferences
  const [role, setRole] = useState("Software Engineer");
  const [topic, setTopic] = useState("React & Node.js");
  const [difficulty, setDifficulty] = useState("Medium");
  const [type, setType] = useState("Technical");

  const handleStartInterview = () => {
    // Navigate with preferences
    navigate(`/interview?mode=role&role=${encodeURIComponent(role)}
     &topic=${encodeURIComponent(topic)}
     &level=${encodeURIComponent(difficulty)}&
     type=${encodeURIComponent(type)}`);
  };
  const handleStartResumeInterview = () => {
    // First, check if the user actually uploaded a resume!
    const savedResume = localStorage.getItem('resumeData');
    if (!savedResume) {
      alert("Please upload and parse your resume using the Analyzer below before starting a Resume-Based interview.");
      return;
    }
    navigate(`/interview?mode=resume&level=${encodeURIComponent(difficulty)}`);
  };


  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div>
          <h2 className="logo">Synvex</h2>
          <div className="menu">
            <button onClick={() => navigate("/dashboard")} style={{ background: 'rgba(255,255,255,0.2)' }}>Dashboard</button>
            <button onClick={() => navigate("/resume")}>AI Resume Analyzer</button>
            {/* <button onClick={() => navigate("/interview")}>Mock Interviews</button> */}
            <button onClick={() => navigate("/reports")}>Performance Reports</button>
            <button onClick={()=>navigate("/que-bank")}>🧠 AI Question Bank</button>
            
          </div>
        </div>

        <button className="logout" onClick={() => navigate("/")}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Navbar */}
        <nav className="navbar glass">
          <h1>Welcome, {auth.currentUser?.displayName || "User"} 👋</h1>
          <div className="nav-actions">
            {/* <button onClick={() => navigate("/profile")}>Edit Profile</button> */}
          </div>
        </nav>

        {/* Dashboard Grid Container */}
        <div className="dashboard-grid">

          {/* Left Column - Interview Preferences */}
          <section className="preferences-section glass">
            <h3 className="section-title">
              <span role="img" aria-label="target">🎯</span> Interview Preferences
            </h3>
            <p style={{ color: '#cbd5e1', marginBottom: '20px', fontSize: '14px' }}>
              Configure your next AI interview session. The system will curate tailored questions based on your selections.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>Target Job Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div className="form-group">
                <label>Key Topic / Tech Stack</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. System Design, React"
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '15px' }}>
              <div className="form-group">
                <label>Difficulty Level</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Medium">Medium (Standard)</option>
                  <option value="Hard">Hard (Senior Level)</option>
                  <option value="Expert">Expert (Staff Level)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Interview Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Technical">Technical (Coding & System)</option>
                  <option value="HR">HR / Behavioral</option>
                  <option value="Mixed">Mixed Rounds</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="primary-btn" onClick={handleStartInterview}>
                Start Role-Based Interview
              </button>

             
            </div>

          </section>

          {/* Right Column - Candidate Responses / Last Session */}
          {/*I guess we dont need this section now, so temporarily commented it */}
          {/* <section className="metrics-section glass">
            <h3 className="section-title">
              <span role="img" aria-label="chart">📊</span> Last Session Analytics
            </h3>

            <div className="score-circle">
              <span>91%</span>
            </div>

            <div className="feedback-pill">
              Excellent Progress 🚀
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '15px' }}>
              AI Feedback: "Strong grasp of architectural principles, but needs more confidence when explaining edge cases."
            </p>

            <div className="metrics-grid">
              <div className="metric-item">
                <h4>94%</h4>
                <p>Accuracy</p>
              </div>
              <div className="metric-item">
                <h4>88%</h4>
                <p>Communication</p>
              </div>
              <div className="metric-item">
                <h4>90%</h4>
                <p>Relevance</p>
              </div>
              <div className="metric-item">
                <h4>92%</h4>
                <p>Confidence</p>
              </div>
            </div>
          </section> */}

        </div>

        {/* Bottom Section - dynamic Resume Analyzer */}
        <div style={{ marginTop: '30px' }}>
          <ResumeAnalyzer />
        </div>
         <button
                className="primary-btn"
                onClick={handleStartResumeInterview}
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              >
                Start Resume-Based Interview
              </button>


      </main>
    </div>
  );
}

export default Dashboard;