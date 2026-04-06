import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // State for Interview Preferences
  const [role, setRole] = useState("Software Engineer");
  const [topic, setTopic] = useState("React & Node.js");
  const [difficulty, setDifficulty] = useState("Medium");
  const [type, setType] = useState("Technical");

  const handleStartInterview = () => {
    // Navigate with preferences (in a real app, this would use context or state)
    navigate(`/interview?role=${role}&level=${difficulty}&type=${type}`);

  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div>
          <h2 className="logo">Synvex</h2>
          <div className="menu">
            <button onClick={() => navigate("/dashboard")} style={{background: 'rgba(255,255,255,0.2)'}}>Dashboard</button>
            <button onClick={() => navigate("/resume")}>Resume Data</button>
            <button onClick={() => navigate("/interview")}>Mock Interviews</button>
            <button onClick={() => navigate("/reports")}>Performance Reports</button>
            <button onClick={() => navigate("/profile")}>Settings</button>
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
          <h1>{use} 👋</h1>
          <div className="nav-actions">
            <button onClick={() => navigate("/profile")}>Edit Profile</button>
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

            <button className="primary-btn" onClick={handleStartInterview}>
              Start AI Interview
            </button>
          </section>

          {/* Right Column - Candidate Responses / Last Session */}
          <section className="metrics-section glass">
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
          </section>

        </div>

        {/* Bottom Section - Resume Data */}
        <section className="resume-section glass">
          <div className="resume-header">
            <h3 className="section-title" style={{ marginBottom: 0 }}>
              <span role="img" aria-label="doc">📄</span> Resume Data Analysis
            </h3>
            <button className="resume-btn" onClick={() => navigate("/resume")}>
              Update Resume
            </button>
          </div>
          
          <p style={{ color: '#cbd5e1', marginBottom: '25px', fontSize: '14px' }}>
            System has extracted the following key metrics from your active resume (jamal_resume_ai_v4.pdf). These will be used to generate personalized questions.
          </p>

          <div className="resume-content">
            <div className="data-group">
              <h4>Extracted Skills</h4>
              <div className="skills-list">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">AWS Cloud</span>
                <span className="skill-tag">System Design</span>
                <span className="skill-tag">GraphQL</span>
              </div>
            </div>

            <div className="data-group">
              <h4>Identified Projects</h4>
              <div className="projects-list">
                <span className="project-tag">AI Chat System</span>
                <span className="project-tag">E-Commerce Microservices</span>
                <span className="project-tag">Real-time Analytics Dashboard</span>
              </div>
            </div>
          </div>
          
          <div className="data-group">
            <h4>Experience Highlight</h4>
            <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6' }}>
              • Full Stack Developer with 3+ years experience building scalable web applications.<br/>
              • Led the migration to a microservices architecture improving performance by 40%.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;