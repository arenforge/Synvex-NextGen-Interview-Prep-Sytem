import React, { useState } from 'react';

const QueBankGenerator = ({ onGenerateManual, onGeneratePersonalized, loading, error }) => {
  const [topic, setTopic] = useState('');
  const [diff, setDiff] = useState('Medium');
  const [count, setCount] = useState(5);

  return (
    <div className="generator-panel">
      
      <h3>1. Custom Practice</h3>
      <div className="manual-controls">
        <input 
          className="qb-input" 
          placeholder="Topic (e.g. React)" 
          onChange={e => setTopic(e.target.value)} 
        />
        <select className="qb-select" onChange={e => setDiff(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input 
          className="qb-input count-input" 
          type="number" 
          value={count} 
          min="1" max="10" 
          onChange={e => setCount(e.target.value)} 
        />
        <button 
          className="qb-btn" 
          disabled={loading || !topic} 
          onClick={() => onGenerateManual(topic, diff, count)}>
          Generate
        </button>
      </div>

      <h3>2. Personalized Practice</h3>
      <button 
        className="qb-btn personalized-btn" 
        disabled={loading} 
        onClick={onGeneratePersonalized}>
        ✨ Generate Based on Interview Weaknesses
      </button>

      {error && <p className="error-text">⚠️ {error}</p>}
    </div>
  );
};
export default QueBankGenerator;
