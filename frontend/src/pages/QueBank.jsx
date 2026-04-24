import React, { useState } from 'react';
import QueBankGenerator from '../components/QueBankGenerator';
import { auth } from '../firebase';
import './QueBank.css';

const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://synvex-backend-ioc4.onrender.com";

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

    const fetchQuestions = async (url, bodyParams) => {
        setLoading(true);
        setError(null);
        setQuestions([]);
        try {
            const res = await fetch(`${API_BASE_URL}/api/que-bank/${url}`, {
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

    const handleManual = (topic, difficulty, count) =>
        fetchQuestions('manual', { topic, difficulty, count });

    const handlePersonalized = () => {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return setError("Please login to use personalized questions.");
        fetchQuestions('personalized', { email: userEmail });
    };

    return (
        <div className="que-bank">

            {/* Hero */}
            <div className="qb-hero">
                <div className="qb-hero-eyebrow">🧠 AI-Powered</div>
                <h1>AI <span>Question Bank</span></h1>
                <p>Practice specific topics or let AI target your weak points — get interview-ready faster.</p>
            </div>

            {/* Stats */}
            <div className="qb-stats">
                <div className="qb-stat">
                    <div className="qb-stat-num">500+</div>
                    <div className="qb-stat-label">Topics Available</div>
                </div>
                <div className="qb-stat">
                    <div className="qb-stat-num">10K+</div>
                    <div className="qb-stat-label">Questions Generated</div>
                </div>
                <div className="qb-stat">
                    <div className="qb-stat-num">3 Levels</div>
                    <div className="qb-stat-label">Easy · Medium · Hard</div>
                </div>
                <div className="qb-stat">
                    <div className="qb-stat-num">100%</div>
                    <div className="qb-stat-label">Personalized to You</div>
                </div>
            </div>

            {/* Generator Cards */}
            <QueBankGenerator
                onGenerateManual={handleManual}
                onGeneratePersonalized={handlePersonalized}
                loading={loading}
                error={error}
            />

            {loading && <p className="loading">🧠 Generating questions…</p>}

            <div className="q-list">
                {!loading && questions.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
            </div>
        </div>
    );
};

export default QueBank;
