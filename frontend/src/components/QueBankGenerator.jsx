import React, { useState } from 'react';

const QueBankGenerator = ({ onGenerateManual, onGeneratePersonalized, loading, error }) => {
  const [topic, setTopic] = useState('');
  const [diff, setDiff] = useState('Medium');
  const [count, setCount] = useState(5);

  return (
    <div className="qb-cards-wrapper">

      {/* ── Card 1: Custom Practice ─────────────── */}
      <div className="qb-card custom-card">
        <div className="qb-card-header">
          <div className="qb-card-icon">🎯</div>
          <div>
            <h2 className="qb-card-title">Custom Practice</h2>
            <p className="qb-card-sub">Pick any topic, set difficulty, and get instant AI questions.</p>
          </div>
        </div>

        <div className="qb-form-group">
          <label className="qb-label">Topic</label>
          <input
            className="qb-input"
            placeholder="e.g. React, SQL, System Design, Python…"
            onChange={e => setTopic(e.target.value)}
          />
        </div>

        <div className="qb-form-row">
          <div className="qb-form-group">
            <label className="qb-label">Difficulty</label>
            <select className="qb-select" onChange={e => setDiff(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="qb-form-group">
            <label className="qb-label">Questions</label>
            <input
              className="qb-input"
              type="number"
              value={count}
              min="1" max="10"
              onChange={e => setCount(e.target.value)}
            />
          </div>
        </div>

        <button
          className="qb-btn primary-btn"
          disabled={loading || !topic.trim()}
          onClick={() => onGenerateManual(topic, diff, count)}
        >
          {loading ? '⏳ Generating…' : '⚡ Generate Questions'}
        </button>

        <div className="qb-tips">
          <span className="qb-tip">💡 Try: "React Hooks"</span>
          <span className="qb-tip">💡 Try: "System Design"</span>
          <span className="qb-tip">💡 Try: "Python OOP"</span>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────── */}
      <div className="qb-or-divider">
        <span>OR</span>
      </div>

      {/* ── Card 2: Personalized Practice ──────── */}
      <div className="qb-card personalized-card">
        <div className="qb-card-header">
          <div className="qb-card-icon">✨</div>
          <div>
            <h2 className="qb-card-title">Personalized Practice</h2>
            <p className="qb-card-sub">AI analyzes your past interviews and targets your weak spots.</p>
          </div>
          <span className="qb-badge">🔥 Recommended</span>
        </div>

        <div className="qb-features-grid">
          <div className="qb-feature-item">
            <span className="qb-feature-icon">📊</span>
            <div>
              <strong>Interview History</strong>
              <p>Pulls data from all your past sessions</p>
            </div>
          </div>
          <div className="qb-feature-item">
            <span className="qb-feature-icon">🎯</span>
            <div>
              <strong>Weak Point Targeting</strong>
              <p>Focuses on topics you struggled with</p>
            </div>
          </div>
          <div className="qb-feature-item">
            <span className="qb-feature-icon">🤖</span>
            <div>
              <strong>Gemini AI Powered</strong>
              <p>Adaptive questions updated after each session</p>
            </div>
          </div>
          <div className="qb-feature-item">
            <span className="qb-feature-icon">📈</span>
            <div>
              <strong>Progress Tracking</strong>
              <p>See how you improve over time</p>
            </div>
          </div>
        </div>

        <button
          className="qb-btn personalized-btn"
          disabled={loading}
          onClick={onGeneratePersonalized}
        >
          {loading ? '⏳ Generating…' : '✨ Generate Based on My Weaknesses'}
        </button>
      </div>

      {error && <p className="qb-error">⚠️ {error}</p>}
    </div>
  );
};

export default QueBankGenerator;
