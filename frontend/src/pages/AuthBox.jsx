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
  const [userName, setUserName] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !fullName) {
      alert("Please fill in Full Name, Email, and Password!");
      return;
    }
    try {
      // 1. Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Add their Full Name to their profile
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      alert("Signup Successful! Welcome " + fullName);
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
          <h2>Welcome Back</h2>
          <p>Login to continue your AI interview journey</p>
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Enter your Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {/* 2. Unique Username Input */}
        <div className="input-group">
          <FaAt className="input-icon" />
          <input
            type="text"
            placeholder="Create a Unique Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Enter your Email/Username"
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
          <button className="signup-btn" onClick={handleSignup}>
            Sign Up
          </button>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="social-login">
          <p className="divider"><span>OR CONTINUE WITH</span></p>
          <div className="social-btns">
            <button className="google-btn" onClick={handleGoogleSignIn}>
              <FaGoogle style={{fontSize:'20px'}} /> Continue with Google
            </button>
            <button className="github-btn" onClick={handleGithubSignIn}>
              <FaGithub /> Continue with Github
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthBox;