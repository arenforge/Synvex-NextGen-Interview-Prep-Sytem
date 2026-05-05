import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDesktop, FaFileAlt, FaChartBar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './LandingPage.css';

// Landing page ka main design aur sections yahan se handle hote hain
function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header mein brand logo aur navigation buttons hain */}
      <header className="site-header">
        <div className="header-brand">
          <span className="header-logo" onClick={() => navigate('/')}>Synvex</span>
        </div>

        <div className="header-tagline-middle">
          Next Gen Interview Preparation System
        </div>

        <div className="header-nav">
          <span className="nav-link" onClick={() => navigate('/')}>Home</span>
          <span className="nav-link" onClick={() => navigate('/AuthBox')}>Login</span>
          <button className="btn-get-started" onClick={() => navigate('/AuthBox')}>Get Started Free</button>
        </div>
      </header>

      <div className="landing-page-container">
        {/* Background Orbs for the Hero Section */}
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>

        {/* 1. Hero Section */}
        {/* Hero section user ko welcome karta hai features ke saath */}
        <section className="hero-section">

          {/* Floating Icons from Reference Image */}
          <div className="floating-hero-icon left-icon">
            <svg viewBox="0 0 100 100" className="icon-svg">
              {/* Flag shape */}
              <path d="M25 20 Q 40 10 50 25 T 80 25 L 80 65 Q 65 50 50 65 T 25 60 Z" fill="#ff5a22" />
              {/* Flag pole */}
              <path d="M25 15 L 25 85" stroke="#ff5a22" strokeWidth="8" strokeLinecap="round" />
              {/* AI text cutout */}
              <text x="35" y="52" fill="white" fontSize="24" fontWeight="900" fontFamily="sans-serif">AI</text>
            </svg>
          </div>
          <div className="floating-hero-icon right-icon">
            <svg viewBox="0 0 24 24" className="icon-svg" fill="none" stroke="#ff5a22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>

          <div className="hero-logo-container">
            <img
              src="/images/logo2.png"
              alt="Synvex Logo"
              className="hero-main-logo"
            />
          </div>

          <h2 className="hero-title" style={{ marginTop: '30px', fontSize: 'clamp(44px, 6vw, 56px)', lineHeight: '1.2' }}>
            Master Interview Workflows, with <br />
            <span className="text-gradient">AI-Powered Analysis</span>
          </h2>
          <p className="hero-subtitle" style={{ fontSize: '20px', maxWidth: '750px' }}>
            An intelligent platform that helps you prepare, analyze, and conquer your technical interviews with confidence. Receive detailed performance reports after every session.
          </p>
          <button className="btn-cta-large" onClick={() => navigate('/AuthBox')} style={{ marginBottom: '40px' }}>
            Start your free trial <span>&rarr;</span>
          </button>

          {/* NEW CTA BANNER (Replaces old hero image) */}
          <div className="cta-banner" style={{ marginTop: '120px' }}>
            <div className="cta-banner-content">
              <h2>Start Preparing Smarter</h2>
              <p>Ready to transform your interview performance. Practice with our Next-Gen Interview Platform and unlock deep, post-session AI insights.</p>
              <button className="btn-black" onClick={() => navigate('/AuthBox')}>Get Started</button>
            </div>
            <div className="cta-banner-image-wrapper">
              <img
                src="/images/performance_report_summary_mockup_1777032314018.png"
                alt="AI Interview Report Summary"
                className="cta-banner-image"
              />
            </div>
          </div>
        </section>

        {/* 1.5 Feature Cards Section (Split Cards Layout) */}
        <section className="feature-cards-section">
          <div className="fc-stacked-container">
            {/* Card 1: Image Left, Content Right */}
            <div className="fc-card">
              <div className="fc-image-wrapper">
                <img src="/images/video_candidate_photo_1776964537193.png" alt="AI Mock Interview" />
              </div>
              <div className="fc-content">
                <h3 className="fc-title">AI Mock Interviews</h3>
                <p className="fc-desc">Immersive interview simulation and practice with post-interview feedback. Synvex provides an experience tailored to real-world technical interviews, pinpointing exact areas for improvement.</p>
                <div className="fc-actions">
                  <button className="fc-btn fc-btn-primary" onClick={() => navigate('/AuthBox')}>Get Started Free</button>
                </div>
              </div>
            </div>

            {/* Card 2: Content Left, Image Right (Reverse) */}
            <div className="fc-card reverse">
              <div className="fc-image-wrapper">
                <img src="/images/resume_upload_mockup_1777030915190.png" alt="Resume-Based Interviews" />
              </div>
              <div className="fc-content">
                <h3 className="fc-title">Resume-Based Interviews</h3>
                <p className="fc-desc">Turn your resume into a personalized mock interview instantly. The AI dynamically generates rigorous questions specifically based on your unique skills and project history.</p>
              </div>
            </div>

            {/* Card 3: Image Left, Content Right */}
            <div className="fc-card">
              <div className="fc-image-wrapper">
                <img src="/images/question_bank_mockup_1777031135968.png" alt="Question Bank & Reports" />
              </div>
              <div className="fc-content">
                <h3 className="fc-title">Question Bank & Reports</h3>
                <p className="fc-desc">Access tailored questions and actionable performance insights. Track your proficiency over time with deep analytics on your communication, technical accuracy, and confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Feature Section - Post-Interview Analysis */}
        <section className="feature-section left-align">
          <div className="feature-content">
            <h2 className="feature-title">Post-Interview <br /> AI Analysis</h2>
            <p className="feature-desc">
              Synvex analyzes your recording after the session to provide deep, actionable feedback. Identify areas for improvement in your technical accuracy and communication style.
            </p>
            <ul className="feature-list">
              <li><span>✓</span> Technical gap identification</li>
              <li><span>✓</span> Communication style reports</li>
              <li><span>✓</span> Personalised improvement tips</li>
            </ul>
          </div>
          <div className="feature-image-wrapper">
            <img
              src="/images/user_dashboard_report.png"
              alt="Interview Dashboard Report"
              className="feature-image"
            />
            {/* Decorative blur behind image */}
            <div className="feature-glow"></div>
          </div>
        </section>

        {/* 2.5 Feature Section - Detailed Reports */}
        <section className="feature-section evaluation-section">
          <div className="evaluation-card-outer">
            <h2 className="evaluation-title">Deep Performance Insights</h2>
            <p className="evaluation-desc">
              Our AI tool provides a comprehensive breakdown of your performance—rating your communication, accuracy, and confidence to help you master every aspect of the interview.
            </p>
            <div className="evaluation-inner-card" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
              <img
                src="/images/user_session_report.png"
                alt="Detailed Session Report"
                style={{ width: '100%', borderRadius: '20px', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* 3. Feature Section - Resume to Interview */}
        <section className="feature-section right-align">
          <div className="feature-image-wrapper">
            <div className="resume-mockup-card">
              {/* Decorative background shapes */}
              <div className="rm-shape rm-circle-1"></div>
              <div className="rm-shape rm-triangle-1"></div>
              <div className="rm-shape rm-triangle-2"></div>

              <h3 className="rm-title">Upload Your Resume</h3>

              <div className="rm-inner-container">
                <div className="rm-dropzone">
                  <div className="rm-icons">
                    <div className="rm-icon rm-word">W</div>
                    <div className="rm-icon rm-pdf">PDF</div>
                    <div className="rm-icon rm-txt">TXT</div>
                  </div>
                  <div className="rm-drop-text">Drag & drop files</div>
                </div>
                <div className="rm-paste-area">
                  <span>Paste Text</span>
                  <div className="rm-paste-box"></div>
                </div>
              </div>

              <div className="rm-process-btn">Start AI Interview</div>
            </div>
          </div>
          <div className="feature-content">
            <h2 className="feature-title">Turn Your Resume into <br /> an AI Interview</h2>
            <p className="feature-desc">
              Simply upload your resume, and our AI will instantly generate a personalized mock interview. Prepare for questions specifically tailored to your real experience, skills, and past projects.
            </p>
            <button className="btn-secondary" onClick={() => navigate('/resume')}>
              Try it Now
            </button>
          </div>
        </section>

        {/* 4. Top Companies Section */}
        <section className="companies-section">
          <h2 className="companies-title">Prepare Smarter. Get Hired by Top Companies.</h2>
          <p className="companies-desc">Synvex helps you master interviews with AI-powered practice, real-world questions, and personalized feedback—so you're always one step ahead.</p>

          <div className="companies-circle-wrapper">
            {/* Center Element */}
            <div className="companies-center">
              <span>Top<br />Tech</span>
            </div>

            {/* Orbiting Logos Track */}
            <div className="orbit-track">
              {/* Using SimpleIcons API for high-quality SVG company logos */}
              <img src="/images/logos/google.svg" alt="Google" className="orbit-logo" style={{ '--angle': '0deg' }} />
              <img src="/images/logos/apple.svg" alt="Apple" className="orbit-logo" style={{ '--angle': '30deg' }} />
              <img src="/images/logos/amazon.svg" alt="Amazon" className="orbit-logo" style={{ '--angle': '60deg' }} />
              <img src="/images/logos/linkedin.svg" alt="LinkedIn" className="orbit-logo" style={{ '--angle': '90deg' }} />
              <img src="/images/logos/salesforce.svg" alt="Salesforce" className="orbit-logo" style={{ '--angle': '120deg' }} />
              <img src="/images/logos/spotify.svg" alt="Spotify" className="orbit-logo" style={{ '--angle': '150deg' }} />
              <img src="/images/logos/airbnb.svg" alt="Airbnb" className="orbit-logo" style={{ '--angle': '180deg' }} />
              <img src="/images/logos/paypal.svg" alt="PayPal" className="orbit-logo" style={{ '--angle': '210deg' }} />
              <img src="/images/logos/adobe.svg" alt="Adobe" className="orbit-logo" style={{ '--angle': '240deg' }} />
              <img src="/images/logos/dropbox.svg" alt="Dropbox" className="orbit-logo" style={{ '--angle': '270deg' }} />
              <img src="/images/logos/pinterest.svg" alt="Pinterest" className="orbit-logo" style={{ '--angle': '300deg' }} />
              <img src="/images/logos/shopify.svg" alt="Shopify" className="orbit-logo" style={{ '--angle': '330deg' }} />
            </div>
          </div>
        </section>

        {/* 5. Final CTA Section */}
        <section className="final-cta-section">
          <div className="final-cta-content">
            <div className="cta-badge">Your dream role is just one session away.</div>
            <h2 className="final-cta-title">Ready to Ace Your <br /> Next Interview?</h2>
            <p className="final-cta-desc">
              Transform your interview skills with Synvex's AI interview practice. Start now and land your dream job with confidence. You've done the prep—now it's time to practice smarter.
            </p>
            <button className="btn-cta-dark" onClick={() => navigate('/AuthBox')}>
              Start Practicing – It's Free
            </button>
          </div>

          {/* Floating Avatars */}
          <img src="/images/avatar_1_1776965017335.png" alt="Avatar 1" className="floating-avatar avatar-1" />
          <img src="/images/avatar_2_1776965033438.png" alt="Avatar 2" className="floating-avatar avatar-2" />
          <img src="/images/video_candidate_photo_1776964537193.png" alt="Avatar 3" className="floating-avatar avatar-3" />
          <img src="/images/avatar_1_1776965017335.png" alt="Avatar 4" className="floating-avatar avatar-4" />
        </section>

        {/* 6. Footer Section */}
        <footer className="footer-section">
          <div className="footer-container">
            {/* Top Row: Brand & Socials */}
            <div className="footer-top">
              <h2 className="footer-logo">Synvex <span className="logo-badge">AI</span></h2>
              <div className="footer-socials">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>

            {/* Middle Row: Links Grid */}
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Contact Us</a>
                <a href="#">Referral Program</a>
              </div>
              <div className="footer-column">
                <h4>Products</h4>
                <a href="#">Interview Copilot</a>
                <a href="#">AI Mock Interview</a>
                <a href="#">Resume Optimizer</a>
              </div>
              <div className="footer-column">
                <h4>AI Tools</h4>
                <a href="#">Coding Interview Copilot</a>
                <a href="#">AI Career Coach</a>
                <a href="#">Resume Checker</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#">Blog</a>
                <a href="#">Interview Guides</a>
                <a href="#">Question Bank</a>
              </div>
            </div>

            {/* Bottom Row: Status & Policies */}
            <div className="footer-bottom">
              <div className="footer-status">
                <span className="status-dot"></span> All services are online
              </div>
              <div className="footer-legal-links">
                <a href="#">Refund Policy</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="footer-disclaimer">
              Disclaimer: This platform provides guidance, resources, and support to enhance your job search. However, securing employment within a specific timeframe depends on various factors beyond our control, including market conditions, individual effort, and employer decisions. We do not guarantee job placement within any specific timeframe. © 2026 Synvex. All rights reserved.
            </div>
            <h5> © 2026 Synvex. All Rights Reserved.</h5>
          </div>
        </footer>

      </div>
    </>
  );
}

export default LandingPage;
