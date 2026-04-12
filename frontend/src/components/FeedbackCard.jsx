import React from 'react';
import './FeedbackCard.css';

function FeedbackCard({ feedback }) {
  // If feedback is a string (from DB), parse it
  let data = null;
try {
  data = typeof feedback === 'string' ? JSON.parse(feedback) : feedback;
} catch {
  // Purana feedback tha plain text mein — JSON nahi bana
  data = null;
}

if (!data) return (
  <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
    {typeof feedback === 'string' ? feedback : 'No feedback available for this session.'}
  </div>
);



  const ratingColor = (rating) => {
    if (rating === 'Strong') return '#10b981';
    if (rating === 'Moderate') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="fc-container">
      {/* Verdict badge at top */}
      <div className="fc-verdict">
        {data.overall_verdict}
      </div>

      <p className="fc-summary">{data.summary}</p>

      {/* Two columns: Strengths + Weaknesses */}
      <div className="fc-grid">
        <div className="fc-card fc-strengths">
          <h4>✅ Technical Strengths</h4>
          <ul>
            {data.technical_strengths?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="fc-card fc-weaknesses">
          <h4>📌 Work On These</h4>
          <ul>
            {data.technical_weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </div>

      {/* Area ratings */}
      <div className="fc-areas">
        {['communication', 'accuracy', 'confidence'].map((area) => (
          <div key={area} className="fc-area-item">
            <div className="fc-area-header">
              <span className="fc-area-name">{area.charAt(0).toUpperCase() + area.slice(1)}</span>
              <span className="fc-area-rating" style={{ color: ratingColor(data[area]?.rating) }}>
                {data[area]?.rating}
              </span>
            </div>
            <p className="fc-area-tip">{data[area]?.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCard;
