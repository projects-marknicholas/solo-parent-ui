import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/dswd.png';

function Navbar({ isMenuOpen, handleMenuClick }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const leftDivRef = useRef(null);
  const location = useLocation();

  // Handle the display and hide of content after the width transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsContentVisible(isMenuOpen);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the sidebar is open before handling the click outside
      if (isMenuOpen && leftDivRef.current && !leftDivRef.current.contains(event.target)) {
        handleMenuClick();
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleMenuClick, isMenuOpen]);

  // Handle the link click to close the sidebar
  const handleLinkClick = () => {
    handleMenuClick();
  };

  // Analyze the class to show and hide contents from the sidebar
  const leftDivClasses = `main-left ${isMenuOpen ? 'show-content' : ''}`;

  return (
    <div ref={leftDivRef} className={leftDivClasses}>
      <div className={`context ${isContentVisible ? 'show' : ''}`}>
        <div className='context-profile'>
          <div className='left'>
            <img src={logo} alt='logo'/>
          </div>
          <div className='right'>
            <h3>Social Worker</h3>
          </div>
        </div>
        <ul>
          <li>
            <Link 
              to="/social-worker/" 
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/social-worker/pending-applications" 
              onClick={handleLinkClick}
            >
              Pending Applications
            </Link>
          </li>
          {/* wala pang decision kung anong ilalagay sa announcements page
          <li>
            <Link 
              to="/social-worker/announcements" 
              onClick={handleLinkClick}
            >
              Announcements
            </Link>
          </li>
          */}
          <li>
            <Link 
              to="/social-worker/ticket-module" 
              onClick={handleLinkClick}
            >
              Ticket Module
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
