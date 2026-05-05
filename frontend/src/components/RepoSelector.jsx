import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaSpinner, FaCodeBranch } from 'react-icons/fa';
import './RepoSelector.css';

const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";

// GitHub repositories fetch karne aur select karne ka logic yahan hai
function RepoSelector() {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [fetchingRepos, setFetchingRepos] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("github_token");

  // GitHub token check karte hain taaki repositories fetch ho sake
  useEffect(() => {
    if (token) {
      fetchRepos();
    }
  }, [token]);

  const fetchRepos = async () => {
    setFetchingRepos(true);
    try {
      const res = await fetch("https://api.github.com/user/repos?per_page=50&sort=updated", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("GitHub token expired or invalid.");
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
      localStorage.removeItem("github_token"); // Clear bad token
    } finally {
      setFetchingRepos(false);
    }
  };

  // Repository select hone par backend se context fetch hota hai
  const handleStartRepoInterview = async () => {
    if (!selectedRepo) return alert("Please select a repository first!");

    setLoading(true);
    setError("");

    try {
      // 1. Get the code context from the backend
      const contextRes = await fetch(`${API_BASE_URL}/api/repo/context`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          repoFullName: selectedRepo, 
          githubToken: token 
        })
      });
      const contextData = await contextRes.json();
      if (!contextData.success) throw new Error(contextData.message);

      // 2. Start the interview session
      const sessionRes = await fetch(`${API_BASE_URL}/api/start-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("user") || "{}").email || "guest@example.com",
          role: "Software Engineer (Repo Review)",
          level: difficulty,
          mode: "repo",
          repoName: selectedRepo,
          repoUrl: `https://github.com/${selectedRepo}`
        })
      });
      const sessionData = await sessionRes.json();

      // 3. Navigate to interview page with all repo data
      navigate(`/interview?mode=repo&sessionId=${sessionData.sessionId}&repoName=${selectedRepo}&level=${difficulty}`, {
        state: { 
          repoContext: contextData.context, 
          fileList: contextData.fileList 
        }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="repo-selector-card placeholder">
        <FaGithub className="github-icon-bg" />
        <h3>GitHub Not Connected</h3>
        <p>Please log in with GitHub to enable repository-based interviews.</p>
        <button className="v5-btn-gradient" onClick={() => navigate("/")}>Connect GitHub</button>
      </div>
    );
  }

  return (
    <div className="repo-selector-card">
      <div className="ra-header-badge">NEW: REPO-OWNERSHIP MODE</div>
      <h2 className="ra-main-title">Interview based on your actual code.</h2>
      
      <div className="repo-controls">
        <div className="dash-field">
          <label>Select Repository</label>
          <select 
            value={selectedRepo} 
            onChange={(e) => setSelectedRepo(e.target.value)}
            disabled={fetchingRepos}
          >
            <option value="">{fetchingRepos ? "Loading repos..." : "-- Choose a Repo --"}</option>
            {repos.map(r => (
              <option key={r.id} value={r.full_name}>{r.name} {r.private ? "🔒" : ""}</option>
            ))}
          </select>
        </div>

        <div className="dash-field">
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>
      </div>

      {error && <p className="ra-error">{error}</p>}

      <button 
        className="v5-btn-gradient" 
        onClick={handleStartRepoInterview}
        disabled={loading || !selectedRepo}
        style={{ marginTop: '20px', width: '100%' }}
      >
        {loading ? (
          <><FaSpinner className="spinner" /> Analyzing Repository...</>
        ) : (
          <><FaCodeBranch /> Start Repository Interview</>
        )}
      </button>
    </div>
  );
}

export default RepoSelector;
