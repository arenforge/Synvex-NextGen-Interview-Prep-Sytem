import React, { useState, useEffect } from "react";
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
            <div className="sidebar-header" onClick={() => navigate("/")}>
               <img src="/images/logo2.png" alt="Synvex" className="sidebar-logo" />
               <span className="sidebar-brand-name">SYNVEX</span>
            </div>

            <nav className="sidebar-nav">
               <div className="nav-section">
                  <h4 className="nav-section-title">Main Dashboard</h4>
                  <button className="nav-item active" onClick={() => navigate("/dashboard")}>
                     <span className="nav-icon">🏠</span> Dashboard
                  </button>
                  <button className="nav-item" onClick={() => navigate("/que-bank")}>
                     <span className="nav-icon">🧠</span> Question Bank
                  </button>
                  <button className="nav-item" onClick={() => navigate("/reports")}>
                     <span className="nav-icon">📊</span> Analysis Reports
                  </button>
               </div>
            </nav>

            <div className="sidebar-bottom">
               <button className="nav-logout-btn" onClick={() => navigate("/")}>Sign Out</button>
            </div>
         </aside>

         {/* ── Main Content Area ── */}
         <main className="dash-v5-main">
            <header className="v5-page-header">
               <div className="v5-header-content">
                  <span className="v5-subtitle">SYNVEX AI PLATFORM</span>
                  <h1 className="v5-title">Good Day, {userName}</h1>
               </div>
               <div className="v5-header-actions">
                  <div className="v5-status">Engine Ready</div>
               </div>
            </header>

            <div className="v5-scroll-stack">

               {/* Card 1: Role-Based Practice */}
               <section className="v5-feature-card">
                  <div className="v5-card-inner">
                     <div className="v5-card-content">
                        <div className="v5-badge">TARGETED PREP</div>
                        <h2 className="v5-card-title">Role-Based Interview</h2>
                        <p className="v5-card-description">
                           Practice with an AI trained on the latest industry standards for your specific job title. Our engine adapts to your depth of knowledge in real-time.
                        </p>

                        <div className="v5-feature-grid">
                           <div className="v5-feature-item">
                              <span className="check">✓</span>
                              <div>
                                 <strong>Adaptive Logic</strong>
                                 <p>Difficulty shifts based on answer quality.</p>
                              </div>
                           </div>
                           <div className="v5-feature-item">
                              <span className="check">✓</span>
                              <div>
                                 <strong>Core Skills Focus</strong>
                                 <p>Deep-dives into your chosen tech stack.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="v5-card-action-box">
                        <div className="v5-form-layout">
                           <div className="v5-input-row">
                              <div className="v5-field">
                                 <label>Job Title</label>
                                 <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Backend Dev" />
                              </div>
                              <div className="v5-field">
                                 <label>Key Topics</label>
                                 <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Python, SQL" />
                              </div>
                           </div>
                           <div className="v5-input-row">
                              <div className="v5-field">
                                 <label>Difficulty</label>
                                 <select value={difficulty} onChange={e => setDiff(e.target.value)}>
                                    <option>Beginner</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                 </select>
                              </div>
                              <div className="v5-field">
                                 <label>Session Type</label>
                                 <select value={type} onChange={e => setType(e.target.value)}>
                                    <option>Technical</option>
                                    <option>HR</option>
                                 </select>
                              </div>
                           </div>
                           <button className="v5-btn-primary" onClick={handleStartInterview}>
                              Launch Interview Session
                           </button>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Card 2: Resume intelligence */}
               <section id="resume-card" className="v5-feature-card alternate">
                  <div className="v5-card-inner">
                     <div className="v5-card-content">
                        <div className="v5-badge brown">DYNAMIC ANALYSIS</div>
                        <h2 className="v5-card-title">Resume Intelligence</h2>
                        <p className="v5-card-description">
                           Upload your resume to let our AI cross-verify your claims. This session prepares you to defend your projects and skills with confidence.
                        </p>

                        <div className="v5-info-box">
                           <strong>Best Use Case:</strong>
                           <p>Defending project architectural decisions listed on your profile.</p>
                        </div>

                        <button className="v5-btn-outline" onClick={handleStartResumeInterview}>
                           Start Session from Resume
                        </button>
                     </div>

                     <div className="v5-card-action-box no-bg">
                        <div className="v5-resume-integration">
                           <ResumeAnalyzer />
                        </div>
                     </div>
                  </div>
               </section>

               {/* Card 3: Question Bank */}
               <section className="v5-feature-card">
                  <div className="v5-card-inner">
                     <div className="v5-card-content">
                        <div className="v5-badge purple">MASTERY BANK</div>
                        <h2 className="v5-card-title">AI Question Library</h2>
                        <p className="v5-card-description">
                           Over 500+ hand-picked technical questions covering everything from OS fundamentals to System Design patterns.
                        </p>

                        <div className="v5-tags">
                           <span>React</span>
                           <span>Algorithms</span>
                           <span>Databases</span>
                           <span>API Design</span>
                        </div>
                     </div>

                     <div className="v5-card-action-box dark">
                        <div className="v5-bank-cta">
                           <h3>Hone your technical edge.</h3>
                           <p>Daily drills and conceptual deep-dives.</p>
                           <button className="v5-btn-dark" onClick={() => navigate("/que-bank")}>
                              Go to Question Bank
                           </button>
                        </div>
                     </div>
                  </div>
               </section>

            </div>

            <footer className="v5-footer">
               <p>© 2024 SYNVEX AI. All rights reserved. Premium Professional Suite.</p>
            </footer>
         </main>
      </div>
   );
}

export default Dashboard;