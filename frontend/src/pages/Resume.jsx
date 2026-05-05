import React from "react";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import "./Resume.css";

// Resume analyze karne ka simple wrapper page hai yeh
function Resume() {
  return (
    <div className="resume-page">
      {/* Ambient design ke liye background orbs yahan hain */}
      {/* Ambient orbs — same as login & QueBank */}
      <div className="resume-orb resume-orb-1" />
      <div className="resume-orb resume-orb-2" />
      <ResumeAnalyzer />
    </div>
  );
}
export default Resume;