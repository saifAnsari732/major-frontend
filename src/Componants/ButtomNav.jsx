import React, { useState } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const ButtomNav = () => {
  const navigate=useNavigate();
  const [activeNav, setActiveNav] = useState('books');

  return (
    <>
    <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeNav === 'search' ? 'active' : ''}`}
          onClick={() => navigate('/')}
          aria-label="Search"
        >
            <IoIosHome  />
        </button>

        <button 
          className={`nav-item ${activeNav === 'explore' ? 'active' : ''}`}
          // onClick={() => navigate('/compiler')}
          onClick={()=>navigate('/codecompiler')}
          aria-label="Explore"
        >
          <FaCode />
        </button>

        <button 
    
          className="nav-item center"
        >
          <FaPlus size={32} className='' />
        </button>

        <button 
          className={`nav-item ${activeNav === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveNav('saved')}
          aria-label="Saved"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
          </svg>
        </button>

        <button 
          className="nav-item"
          onClick={() =>navigate('/profile')}
          
        >
          <FaUserCircle/>
        </button>
      </nav>
    </>
  )
}

export default ButtomNav