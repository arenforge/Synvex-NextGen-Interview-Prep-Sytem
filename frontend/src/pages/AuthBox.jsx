import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserShield, FaGoogle, FaGithub, FaAt, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; 
import "./AuthBox.css";

function AuthBox() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      alert("Please fill in Full Name, Email, and Password!");
      return;
    }
    try {
      // 1. Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Add their Full Name to their profile
      await updateProfile(userCredential.user, {
        displayName: name
      });

      alert("Signup Successful! Welcome " + name);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <div className="auth-header">
          <FaUserShield className="shield-icon" />
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Login to continue your AI interview journey" : "Join us to start your AI interview journey"}</p>
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Enter your Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btn-group">
          <button className="login-btn" onClick={isLogin ? handleLogin : handleSignup} style={{ width: '100%' }}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)} style={{ textAlign: "center", marginTop: "15px", cursor: "pointer", color: "#60a5fa", fontSize: "14px" }}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>

        <div className="social-login">
          <p className="divider"><span>OR CONTINUE WITH</span></p>
          <div className="social-btns">
            <button className="google-btn" onClick={handleGoogleSignIn}>
              <FcGoogle style={{ fontSize: '20px' }} /> Continue with Google
            </button>
            <button className="github-btn" onClick={handleGithubSignIn}>
              <FaGithub /> Continue with GitHub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthBox;