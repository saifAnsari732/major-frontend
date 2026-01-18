import React, { useState } from 'react'
import '../styles/Navbar.css';

const ButtomNav = () => {
  const [activeNav, setActiveNav] = useState('books');

  return (
    <>
    <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeNav === 'search' ? 'active' : ''}`}
          onClick={() => setActiveNav('search')}
          aria-label="Search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>

        <button 
          className={`nav-item ${activeNav === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveNav('explore')}
          aria-label="Explore"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 5-5m4 0l5 5-5 5"></path>
          </svg>
        </button>

        <button 
          className={`nav-item center ${activeNav === 'books' ? 'active' : ''}`}
          onClick={() => setActiveNav('books')}
          aria-label="Books"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l2.75 3.54h2.29l-4.08-5.25 4.08-5.25h-2.29l-2.75 3.54V7h-2v10h2z"/>
          </svg>
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
          className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveNav('profile')}
          aria-label="Profile"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </nav>
    </>
  )
}

export default ButtomNav