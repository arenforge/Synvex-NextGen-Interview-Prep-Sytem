import React from "react";
import "./MainComp.css";
import { useNavigate } from "react-router-dom";

function MainComp() {
  const navigate = useNavigate();

  function routeAuthBox() {
    navigate("/AuthBox");
  }

  return (
    <div className="main-wrapper">
      <div className="overlay"></div>

      <div className="hero-content">
        <p className="brand">Synvex AI</p>
        <h1>
          Master Your <span>Dream Interviews</span>
        </h1>
        <p className="subtitle">
          Practice role-based AI interviews, resume-driven questions, and
          real-world interview preparation with immersive voice simulations.
        </p>

        <div className="features">
          <div className="box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Role interview"
            />
            <h3>Role Based Interview</h3>
            <p>AI voice interviews tailored for your target role.</p>
          </div>

          <div className="box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
              alt="Resume interview"
            />
            <h3>Resume Based Interviews</h3>
            <p>Questions intelligently generated from your resume.</p>
          </div>

          <div className="box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
              alt="Question bank"
            />
            <h3>Question Bank</h3>
            <p>Curated interview questions for strong preparation.</p>
          </div>
        </div>

        <button onClick={routeAuthBox} className="learn">
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default MainComp;