import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-brand">
        <span className="header-logo" onClick={() => navigate('/')}>Synvex</span>
      </div>
      <div className="header-nav">
        <span className="nav-link" onClick={() => navigate('/')}>Home</span>
        <span className="nav-link" onClick={() => navigate('/que-bank')}>Features</span>
        <span className="nav-link" onClick={() => navigate('/AuthBox')}>Login</span>
        <button className="btn-get-started" onClick={() => navigate('/AuthBox')}>Get Started Free</button>
      </div>
    </header>
  );
}

export default Header;