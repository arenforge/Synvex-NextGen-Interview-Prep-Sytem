import React, { useState } from 'react';
import QueBankGenerator from '../components/QueBankGenerator';
import './QueBank.css';

const QuestionCard = ({ q, index }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="card">
      <div className="card-header">
        <h4>{q.question}</h4>
        <span className="q-badge">Q{index + 1}</span>
      </div>
      
      {q.hints?.length > 0 && <p className="hints">💡 Hints: {q.hints.join(', ')}</p>}

      <button className="toggle-btn" onClick={() => setShow(!show)}>
        {show ? 'Hide Solution ▲' : 'View Solution ▼'}
      </button>

      {show && <div className="solution">{q.solution}</div>}
    </div>
  );
};

const QueBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to handle calling our API cleanly
  const fetchQuestions = async (url, bodyParams) => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    
    try {
      const res = await fetch(`http://localhost:5000/api/que-bank/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams)
      });
      const data = await res.json();
      
      if (data.success) setQuestions(data.questions);
      else setError(data.error);
    } catch {
      setError('Failed to connect to the server.');
    }
    setLoading(false);
  };

  const handleManual = (topic, difficulty, count) => fetchQuestions('manual', { topic, difficulty, count });

  const handlePersonalized = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.email) return setError("Please login to use personalized questions.");
    fetchQuestions('personalized', { email: user.email });
  };

  return (
    <div className="que-bank">
      <h1>AI Question Bank</h1>
      <p>Practice specific topics or focus on your weak points.</p>

      <QueBankGenerator 
        onGenerateManual={handleManual}
        onGeneratePersonalized={handlePersonalized}
        loading={loading}
        error={error}
      />

      {loading && <p className="loading">🧠 Generating questions...</p>}

      <div className="q-list">
        {!loading && questions.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
      </div>
    </div>
  );
};

export default QueBank;
