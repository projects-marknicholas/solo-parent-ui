import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/dswd.png';

function SystemAdminNavbar({ isMenuOpen, handleMenuClick }) {
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
            <h3>Solo Parents</h3>
            <i>Application No: 123456789</i>
          </div>
        </div>
        <ul>
          <li>
            <Link 
              to="/system-admin/" 
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/system-admin/user-management" 
              onClick={handleLinkClick}
            >
              User Management
            </Link>
          </li>
          <li>
            <Link 
              to="/system-admin/ticket-module" 
              onClick={handleLinkClick}
            >
              Ticket Module
            </Link>
          </li>
          {/* Wala pang kongkretong plano para dito
          <li>
            <Link 
              to="/system-admin/system-bugs" 
              onClick={handleLinkClick}
            >
              Pending Requests for System Bugs
            </Link>
          </li>
          <li>
            <Link 
              to="/system-admin/update-requests" 
              onClick={handleLinkClick}
            >
              Pending Requests for Update
            </Link>
          </li>
          */}
        </ul>
      </div>
    </div>
  );
}

export default SystemAdminNavbar;
