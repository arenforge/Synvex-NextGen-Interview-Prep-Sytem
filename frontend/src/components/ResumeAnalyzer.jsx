import React, { useState } from 'react';
import './ResumeAnalyzer.css';
import { FaCloudUploadAlt, FaFileAlt, FaSpinner } from 'react-icons/fa';

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Lazy load from local storage (one-liner instead of useEffect)
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : null;
  });

  // Simplified API Call
  const uploadResume = async () => {
    if (!file) return setError('Please select a PDF first.');
    
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const res = await fetch('http://localhost:5000/api/resume/upload', {
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

  return (
    <div className="resume-analyzer-container">
      <h3 className="ra-header"><FaFileAlt style={{ marginRight: '8px' }} /> AI Resume Analyzer</h3>
      <p className="ra-subtitle">Upload your resume to personalize your mock interview.</p>

      {/* Upload Section */}
      <div className="ra-upload-box">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="ra-file-input"
        />

        <button className="ra-btn" onClick={uploadResume} disabled={loading || !file}>
          {loading ? (
            <><FaSpinner className="spinner" style={{ marginRight: '8px' }} /> Analyzing...</>
          ) : (
            <><FaCloudUploadAlt style={{ marginRight: '8px' }} /> Upload PDF</>
          )}
        </button>
        {error && <p className="ra-error">{error}</p>}
      </div>

      {/* Results Section */}
      {resumeData && (
        <div className="ra-results">
          <h4 className="ra-section-title">Experience Summary</h4>
          <p className="ra-text">{resumeData.experience_summary}</p>

          <h4 className="ra-section-title">Skills</h4>
          <div className="ra-skills-list">
            {resumeData.skills?.map((skill, i) => <span key={i} className="ra-skill-tag">{skill}</span>)}
          </div>

          <h4 className="ra-section-title">Projects</h4>
          <ul className="ra-projects-list">
            {resumeData.projects?.map((proj, i) => <li key={i}>{proj}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
