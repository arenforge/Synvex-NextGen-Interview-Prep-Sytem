import React from "react";
import "./MainComp.css";

function MainComp() {
  return (
    <>
      <h2>Synvex Features</h2>

      <div className="features">

        <div className="box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
          <h3>Role Based Interview</h3>
          <p>Practice using real voice interviewer for specific job roles.</p>
        </div>

        <div className="box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"/>
          <h3>Resume Based Interviews</h3>
          <p>Interview questions generated directly from your resume.</p>
        </div>

        <div className="box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" />
          <h3>Question Bank for Prep</h3>
          <p>Prepare with curated questions like real interview practice.</p>
        </div>
      </div><button className="learn"> Start Learning</button>

    </>
  );
}

export default MainComp;