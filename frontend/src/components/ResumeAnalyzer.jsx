import React, { useState, useRef } from 'react';
import './ResumeAnalyzer.css';
import { FaSpinner, FaLock, FaFilePdf } from 'react-icons/fa';

const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Lazy load from local storage
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError('');
    }
  };

  // Simplified API Call
  const uploadResume = async () => {
    if (!file) return setError('Please select a PDF or DOCX file first.');

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const res = await fetch(`${API_BASE_URL}/api/resume/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setResumeData(data.analysis);
        localStorage.setItem('resumeData', JSON.stringify(data.analysis));
        setFile(null);
      } else {
        setError(data.message || 'Analysis failed.');
      }
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleMainButtonClick = () => {
    if (!file) {
      fileInputRef.current.click();
    } else {
      uploadResume();
    }
  };

  return (
    <div className="resume-analyzer-container">
      <div className="ra-header-badge">RESUME-BASED INTERVIEWS</div>
      <h1 className="ra-main-title">Turn your resume into a personalized mock interview.</h1>
      <p className="ra-subtitle">
        Upload your resume and our AI will generate tailored interview questions based on your actual experience, skills, and projects to ensure you're ready to perform and get callbacks.
      </p>

      {/* Upload Section */}
      <div className="ra-upload-wrapper">
        <div
          className={`ra-upload-box ${isDragging ? 'drag-active' : ''}`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="ra-file-input-hidden"
            ref={fileInputRef}
          />
          {file ? (
            <div className="ra-file-selected">
              <FaFilePdf className="ra-file-icon" />
              <span>{file.name}</span>
            </div>
          ) : (
            <div className="ra-upload-prompt">
              <p>Drop your resume here or <strong>choose a file</strong>.</p>
              <p className="ra-upload-limits">PDF & DOCX only. Max 5MB file size.</p>
            </div>
          )}
        </div>

        <button
          className={`btn-primary ra-upload-btn ${!file ? 'needs-file' : ''}`}
          onClick={handleMainButtonClick}
          disabled={loading}
        >
          {loading ? (
            <><FaSpinner className="spinner" style={{ marginRight: '8px' }} /> Generating Interview...</>
          ) : (
            <>{!file ? "Select a File to Upload" : "Upload & Generate Interview"}</>
          )}
        </button>
        <div className="ra-privacy-note">
          <FaLock className="ra-lock-icon" /> Privacy guaranteed
        </div>

        {error && <p className="ra-error">{error}</p>}
      </div>

      {/* Results Section */}
      {resumeData && (
        <div className="ra-results">
          <h4 className="ra-section-title">Extracted Experience</h4>
          <p className="ra-text">{resumeData.experience_summary}</p>

          <h4 className="ra-section-title">Identified Skills</h4>
          <div className="ra-skills-list">
            {resumeData.skills?.map((skill, i) => <span key={i} className="ra-skill-tag">{skill}</span>)}
          </div>

          <h4 className="ra-section-title">Key Projects</h4>
          <ul className="ra-projects-list">
            {resumeData.projects?.map((proj, i) => <li key={i}>{proj}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
