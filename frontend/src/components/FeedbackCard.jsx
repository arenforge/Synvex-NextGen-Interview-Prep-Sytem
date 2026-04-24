import React from 'react';
import './FeedbackCard.css';

function FeedbackCard({ feedback }) {
  let data = null;
  try {
    data = typeof feedback === 'string' ? JSON.parse(feedback) : feedback;
  } catch {
    data = null;
  }

  if (!data) return (
    <div className="fc-plain">
      {typeof feedback === 'string' ? feedback : 'No feedback available for this session.'}
    </div>
  );

  const ratingConfig = (rating) => {
    if (rating === 'Strong')   return { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.30)', icon: '✅' };
    if (rating === 'Moderate') return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.30)', icon: '⚠️' };
    return                            { color: '#ef4444', bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.28)',  icon: '❌' };
  };

  const verdictConfig = () => {
    const v = (data.overall_verdict || '').toLowerCase();
    if (v.includes('strong') || v.includes('ready'))  return { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.35)' };
    if (v.includes('moderate') || v.includes('progress')) return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)' };
    return { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)' };
  };

  const vc = verdictConfig();

  return (
    <div className="fc-container">

      {/* ── TOP: Verdict + Summary ─────────────── */}
      <div className="fc-top-row">
        <div className="fc-verdict-wrap">
          <span className="fc-verdict-label">Overall Verdict</span>
          <div className="fc-verdict-badge" style={{ color: vc.color, background: vc.bg, borderColor: vc.border }}>
            {data.overall_verdict}
          </div>
        </div>
        <div className="fc-summary-wrap">
          <span className="fc-section-label">AI Summary</span>
          <p className="fc-summary">{data.summary}</p>
        </div>
      </div>

      <div className="fc-divider" />

      {/* ── MID: Strengths + Weaknesses ───────── */}
      <div className="fc-sw-label-row">
        <span className="fc-section-label">Technical Assessment</span>
      </div>
      <div className="fc-grid">
        <div className="fc-card fc-strengths">
          <div className="fc-card-head green">
            <span>✅</span>
            <h4>Technical Strengths</h4>
          </div>
          <ul>
            {data.technical_strengths?.length > 0
              ? data.technical_strengths.map((s, i) => <li key={i}>{s}</li>)
              : <li className="fc-empty-item">No strengths recorded</li>}
          </ul>
        </div>
        <div className="fc-card fc-weaknesses">
          <div className="fc-card-head red">
            <span>📌</span>
            <h4>Areas to Improve</h4>
          </div>
          <ul>
            {data.technical_weaknesses?.length > 0
              ? data.technical_weaknesses.map((w, i) => <li key={i}>{w}</li>)
              : <li className="fc-empty-item">No weaknesses recorded</li>}
          </ul>
        </div>
      </div>

      <div className="fc-divider" />

      {/* ── BOTTOM: Area Ratings ───────────────── */}
      <span className="fc-section-label">Skill Breakdown</span>
      <div className="fc-areas">
        {['communication', 'accuracy', 'confidence'].map((area) => {
          const cfg = ratingConfig(data[area]?.rating);
          return (
            <div key={area} className="fc-area-item" style={{ background: cfg.bg, borderColor: cfg.border }}>
              <div className="fc-area-header">
                <div className="fc-area-left">
                  <span className="fc-area-icon">{cfg.icon}</span>
                  <span className="fc-area-name">{area.charAt(0).toUpperCase() + area.slice(1)}</span>
                </div>
                <span className="fc-area-rating" style={{ color: cfg.color, background: `${cfg.bg}`, borderColor: cfg.border }}>
                  {data[area]?.rating || 'N/A'}
                </span>
              </div>
              <p className="fc-area-tip">{data[area]?.tip || '—'}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default FeedbackCard;
