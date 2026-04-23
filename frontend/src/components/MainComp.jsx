import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDesktop, FaFileAlt, FaChartBar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './MainComp.css';

function MainComp() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      {/* Background Orbs for the Hero Section */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-logo-container">
          <h1 className="hero-synvex-title">SYNVEX</h1>
          <p className="hero-since-text">S I N C E <span> 2 0 2 6 </span></p>
        </div>

        <h2 className="hero-title" style={{ marginTop: '30px' }}>
          Master Interview Workflows, with <br/>
          <span className="text-gradient">Real-Time AI Assistant</span>
        </h2>
        <p className="hero-subtitle">
          An intelligent platform that helps you prepare, analyze, and conquer your technical interviews with confidence. Get personalized feedback instantly.
        </p>
        <button className="btn-cta-large" onClick={() => navigate('/AuthBox')}>
          Start your free trial <span>&rarr;</span>
        </button>
        
        {/* NEW CTA BANNER (Replaces old hero image) */}
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2>Start Preparing Smarter</h2>
            <p>Ready to transform your interview performance. Download our Next-Gen Interview Platform and unlock invisible, real-time AI support.</p>
            <button className="btn-black" onClick={() => navigate('/AuthBox')}>Get Started</button>
          </div>
          <div className="cta-banner-image-wrapper">
            <img 
              src="/images/video_interview_mockup_1776963851485.png" 
              alt="Video Interview AI Support" 
              className="cta-banner-image" 
            />
          </div>
        </div>
      </section>

      {/* 1.5 Feature Cards Section */}
      <section className="feature-cards-section">
        <div className="fc-container">
          {/* Card 1 */}
          <div className="fc-card">
            <div className="fc-icon"><FaDesktop /></div>
            <h3 className="fc-title">AI Mock Interviews</h3>
            <p className="fc-desc">Immersive interview simulation and practice with real-time feedback.</p>
            <div className="fc-actions">
              <button className="fc-btn fc-btn-primary" onClick={() => navigate('/AuthBox')}>Get Started for Free</button>
              <button className="fc-btn fc-btn-outline" onClick={() => navigate('/interview')}>Learn More</button>
            </div>
          </div>

          {/* Card 2 - Highlighted */}
          <div className="fc-card fc-card-highlighted">
            <div className="fc-icon"><FaFileAlt /></div>
            <h3 className="fc-title">Resume-Based Interviews</h3>
            <p className="fc-desc">Turn your resume into a personalized mock interview instantly.</p>
            <div className="fc-actions">
              <button className="fc-btn fc-btn-white" onClick={() => navigate('/resume')}>Get Started for Free</button>
              <button className="fc-btn fc-btn-outline-white" onClick={() => navigate('/resume')}>Learn More</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="fc-card">
            <div className="fc-icon"><FaChartBar /></div>
            <h3 className="fc-title">Question Bank & Reports</h3>
            <p className="fc-desc">Access tailored questions and actionable performance insights.</p>
            <div className="fc-actions">
              <button className="fc-btn fc-btn-primary" onClick={() => navigate('/que-bank')}>Get Started for Free</button>
              <button className="fc-btn fc-btn-outline" onClick={() => navigate('/reports')}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Section - Real-time Insights */}
      <section className="feature-section left-align">
        <div className="feature-content">
          <h2 className="feature-title">Real-time Feedback & <br/> AI Insights</h2>
          <p className="feature-desc">
            Synvex listens to your responses during practice interviews and provides instant, actionable feedback. Identify filler words, tone variations, and areas for improvement on the fly.
          </p>
          <ul className="feature-list">
            <li><span>✓</span> Instant tone analysis</li>
            <li><span>✓</span> Vocabulary suggestions</li>
            <li><span>✓</span> Pacing and clarity tracking</li>
          </ul>
        </div>
        <div className="feature-image-wrapper">
          <img 
            src="/images/feature_assistant_mockup_1776958536817.png" 
            alt="AI Assistant UI Mockup" 
            className="feature-image" 
          />
          {/* Decorative blur behind image */}
          <div className="feature-glow"></div>
        </div>
      </section>

      {/* 2.5 Feature Section - Instant Evaluation */}
      <section className="feature-section evaluation-section">
        <div className="evaluation-card-outer">
          <h2 className="evaluation-title">Instant Evaluation</h2>
          <p className="evaluation-desc">
            Our AI tool provides immediate scoring—green for a pass, red for a retry—and detailed feedback on your communication, This enhances your overall interview presentation and performance.
          </p>
          <div className="evaluation-inner-card">
            <div className="eval-photo-wrapper">
              <img src="/images/video_candidate_photo_1776964537193.png" alt="Candidate Video Feed" className="eval-photo" />
            </div>
            <div className="eval-score-wrapper">
              <h3>Total Score</h3>
              <div className="eval-ring">
                <span className="eval-score">8 / 10</span>
                <span className="eval-status">Fair B</span>
              </div>
            </div>
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
          <h2 className="feature-title">Turn Your Resume into <br/> an AI Interview</h2>
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
            <span>Top<br/>Tech</span>
          </div>
          
          {/* Orbiting Logos Track */}
          <div className="orbit-track">
            {/* Using SimpleIcons API for high-quality SVG company logos */}
            <img src="/images/logos/google.svg" alt="Google" className="orbit-logo" style={{'--angle': '0deg'}} />
            <img src="/images/logos/apple.svg" alt="Apple" className="orbit-logo" style={{'--angle': '30deg'}} />
            <img src="/images/logos/amazon.svg" alt="Amazon" className="orbit-logo" style={{'--angle': '60deg'}} />
            <img src="/images/logos/linkedin.svg" alt="LinkedIn" className="orbit-logo" style={{'--angle': '90deg'}} />
            <img src="/images/logos/salesforce.svg" alt="Salesforce" className="orbit-logo" style={{'--angle': '120deg'}} />
            <img src="/images/logos/spotify.svg" alt="Spotify" className="orbit-logo" style={{'--angle': '150deg'}} />
            <img src="/images/logos/airbnb.svg" alt="Airbnb" className="orbit-logo" style={{'--angle': '180deg'}} />
            <img src="/images/logos/paypal.svg" alt="PayPal" className="orbit-logo" style={{'--angle': '210deg'}} />
            <img src="/images/logos/adobe.svg" alt="Adobe" className="orbit-logo" style={{'--angle': '240deg'}} />
            <img src="/images/logos/dropbox.svg" alt="Dropbox" className="orbit-logo" style={{'--angle': '270deg'}} />
            <img src="/images/logos/pinterest.svg" alt="Pinterest" className="orbit-logo" style={{'--angle': '300deg'}} />
            <img src="/images/logos/shopify.svg" alt="Shopify" className="orbit-logo" style={{'--angle': '330deg'}} />
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <div className="cta-badge">Your dream role is just one session away.</div>
          <h2 className="final-cta-title">Ready to Ace Your <br/> Next Interview?</h2>
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
        </div>
      </footer>

    </div>
  );
}

export default MainComp;