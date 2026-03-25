import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page">

       

       
      <section className="hero">

        <div className="hero-text">
          <h1>
            Crack Your Dream Job! <br />
            With AI-Powered Practice
          </h1>

          <p>
            Upload your resume, get personalized questions,
            and simulate real interviews — all in one place.
          </p>

          <div className="hero-buttons">
            <button
              className="cta resume"
              onClick={() => navigate("/resume")}
            >
              Upload Resume
            </button>

            <button
              className="cta interview"
              onClick={() => navigate("/interview")}
            >
              Start Interview
            </button>
          </div>
        </div>

        
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Interview preparation"
          />
        </div>

      </section>
    </div>
  );
}

export default Dashboard;