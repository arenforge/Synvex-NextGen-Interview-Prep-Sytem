import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import ResumeAnalyzer from "../components/ResumeAnalyzer";

function Dashboard() {
   const navigate = useNavigate();
   const [role, setRole] = useState("Software Engineer");
   const [topic, setTopic] = useState("React & Node.js");
   const [difficulty, setDiff] = useState("Medium");
   const [type, setType] = useState("Technical");
   const [duration, setDuration] = useState("10 min");

   const handleStartInterview = () => {
      navigate(`/interview?mode=role&role=${encodeURIComponent(role)}&topic=${encodeURIComponent(topic)}&level=${encodeURIComponent(difficulty)}&type=${encodeURIComponent(type)}&duration=${encodeURIComponent(duration)}`);
   };

   const handleStartResumeInterview = () => {
      const savedResume = localStorage.getItem('resumeData');
      if (!savedResume) {
         alert("Please upload and parse your resume in the section below first.");
         document.getElementById('resume-card')?.scrollIntoView({ behavior: 'smooth' });
         return;
      }
      navigate(`/interview?mode=resume&level=${encodeURIComponent(difficulty)}&duration=${encodeURIComponent(duration)}`);
   };

   const userName = auth.currentUser?.displayName || "User";

   return (
      <div className="dash-v5-container">

         {/* ── Sidebar (Fixed & Dark) ── */}
         <aside className="dash-v5-sidebar">
            <nav className="sidebar-nav">
               <div className="nav-section">
                  <button className="nav-item active" onClick={() => navigate("/dashboard")}>
                     🏠 Dashboard
                  </button>
                  <button className="nav-item" onClick={() => navigate("/que-bank")}>
                     🧠 Question Bank
                  </button>
                  <button className="nav-item" onClick={() => navigate("/reports")}>
                     📊 Analysis Reports
                  </button>
               </div>
            </nav>

            <div className="sidebar-bottom">
               <button className="nav-item" onClick={() => navigate("/")}>🚪 Sign Out</button>
            </div>
         </aside>

         {/* ── Main Content Area ── */}
         <main className="dash-v5-main">
            
            <header className="dash-header-section">
               <div className="dash-header-left">
                  <span className="v5-subtitle">SYNVEX AI PLATFORM</span>
                  <h1 className="v5-title">Good Day, {userName}</h1>
               </div>
               
               {/* NEW: Big Logo and Name on Top Right */}
               <div className="dash-header-right-brand">
                  <img src="/images/logo2.png" alt="Synvex" className="header-right-logo" />
                  <span className="header-right-name">SYNVEX</span>
               </div>
            </header>

            <div className="v5-scroll-stack">

               {/* Card 1: Role-Based Practice */}
               <section className="v5-feature-card">
                  <div className="card-header-row">
                     <div className="card-title-area">
                        <h2>✨ Role-Based Practice</h2>
                        <p>Pick any topic, set difficulty, and get instant AI questions tailored to your goals.</p>
                     </div>
                  </div>

                  <div className="card-sub-grid">
                     <div className="sub-item">
                        <span className="sub-item-icon">🎯</span>
                        <div className="sub-item-text">
                           <h4>Targeted Prep</h4>
                           <p>Engineered for specific job roles and seniority levels.</p>
                        </div>
                     </div>
                     <div className="sub-item">
                        <span className="sub-item-icon">⚡</span>
                        <div className="sub-item-text">
                           <h4>Real-time Adaptive</h4>
                           <p>Difficulty shifts dynamically based on your answer quality.</p>
                        </div>
                     </div>
                  </div>

                  <div className="card-action-area">
                     <div className="dash-input-row">
                        <div className="dash-field">
                           <label>Job Title</label>
                           <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Frontend Dev" />
                        </div>
                        <div className="dash-field">
                           <label>Key Topics</label>
                           <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. React, CSS" />
                        </div>
                        <div className="dash-field">
                           <label>Difficulty</label>
                           <select value={difficulty} onChange={e => setDiff(e.target.value)}>
                              <option>Beginner</option>
                              <option>Medium</option>
                              <option>Hard</option>
                           </select>
                        </div>
                        <div className="dash-field">
                           <label>Session Type</label>
                           <select value={type} onChange={e => setType(e.target.value)}>
                              <option>Technical</option>
                              <option>HR</option>
                           </select>
                        </div>
                     </div>
                     <button className="v5-btn-gradient" onClick={handleStartInterview}>
                        ✨ Launch Role-Based Interview
                     </button>
                  </div>
               </section>

               {/* Card 2: Resume Intelligence */}
               <section id="resume-card" className="v5-feature-card">
                  <div className="card-header-row">
                     <div className="card-title-area">
                        <h2>✨ Personalized Practice</h2>
                        <p>AI analyzes your resume and targets your unique weak spots for maximum growth.</p>
                     </div>
                     <div className="v5-badge-flame">
                        🔥 Recommended
                     </div>
                  </div>

                  <div className="card-sub-grid">
                     <div className="sub-item">
                        <span className="sub-item-icon">📊</span>
                        <div className="sub-item-text">
                           <h4>Resume Context</h4>
                           <p>Pulls data directly from your uploaded experience.</p>
                        </div>
                     </div>
                     <div className="sub-item">
                        <span className="sub-item-icon">🎯</span>
                        <div className="sub-item-text">
                           <h4>Weak Point Targeting</h4>
                           <p>Focuses on topics you need to defend with confidence.</p>
                        </div>
                     </div>
                     <div className="sub-item">
                        <span className="sub-item-icon">🤖</span>
                        <div className="sub-item-text">
                           <h4>Gemini AI Powered</h4>
                           <p>Adaptive questions cross-verified against your profile.</p>
                        </div>
                     </div>
                     <div className="sub-item">
                        <span className="sub-item-icon">📈</span>
                        <div className="sub-item-text">
                           <h4>Progress Tracking</h4>
                           <p>See how you improve over multiple sessions.</p>
                        </div>
                     </div>
                  </div>

                  <div className="card-action-area">
                     <div className="resume-mockup-area">
                        <ResumeAnalyzer />
                     </div>
                     <button className="v5-btn-gradient" style={{ marginTop: '24px' }} onClick={handleStartResumeInterview}>
                        ✨ Generate Based on My Weaknesses
                     </button>
                  </div>
               </section>

               {/* Card 3: Question Bank */}
               <section className="v5-feature-card">
                  <div className="card-header-row">
                     <div className="card-title-area">
                        <h2>🧠 AI Question Library</h2>
                        <p>Over 500+ hand-picked technical questions covering everything from OS fundamentals to System Design.</p>
                     </div>
                  </div>

                  <div className="card-sub-grid">
                     <div className="sub-item">
                        <span className="sub-item-icon">📚</span>
                        <div className="sub-item-text">
                           <h4>Concept Mastery</h4>
                           <p>Daily drills and deep-dives into core engineering concepts.</p>
                        </div>
                     </div>
                     <div className="sub-item">
                        <span className="sub-item-icon">🔍</span>
                        <div className="sub-item-text">
                           <h4>Curated Collections</h4>
                           <p>Questions from top tech companies like Google and Amazon.</p>
                        </div>
                     </div>
                  </div>

                  <div className="card-action-area">
                     <button className="v5-btn-gradient" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)' }} onClick={() => navigate("/que-bank")}>
                        Go to Question Bank
                     </button>
                  </div>
               </section>

            </div>

            <footer className="v5-footer">
               <p>© 2026 SYNVEX AI. All rights reserved. Premium Professional Suite.</p>
            </footer>
         </main>
      </div>
   );
}

export default Dashboard;