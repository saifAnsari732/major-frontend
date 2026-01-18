// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import ButtomNav from './ButtomNav';
export default function Navbar() {
const navigate=useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src="/l.png" alt="SAVS FRIEND" className="logo-img" />
          </div>

          {/* <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>HOME</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT US</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT US</a></li>
          </ul> */}

          <div className="navbar-right">
            <button onClick={()=>navigate('/signup')} className="signin-btn">SIGN IN</button>
            {/* <button className="signup-btn">SIGN UP</button> */}
          </div>
        </div>
      </nav>

      <ButtomNav />
    </>
  );
}
