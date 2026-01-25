import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import AI from './Ai_Code/AI';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '#about' },
    { label: 'Services', path: '#services' },
    { label: 'Contact', path: '#contact' }
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="/l.png" alt="SAVS FRIEND" className="logo-img" />
          </div>

          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`navbar-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            <button onClick={() => navigate('/signin')} className="signin-btns">
              SIGN IN
            </button>
            <AI/>
          </div>
        </div>
      </nav>

    </>
  );
}
