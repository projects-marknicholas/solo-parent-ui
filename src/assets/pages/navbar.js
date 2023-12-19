import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/dswd.png';

function Navbar() {
  // Change css if screen is scrolled
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Display mobile nav if menu is clicked
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const navClass = scrolled ? 'nav scrolled' : 'nav';

  return (
    <nav className={navClass}>
      <div className='left'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/contact-us'>Contact Us</Link>
          </li>
          <li>
            <button onClick={toggleMobileMenu}>☰</button>
          </li>
        </ul>
      </div>
      <div className='middle'>
        <img src={logo} alt='logo' className='logo' />
      </div>
      <div className='right'>
        <Link to='/register' className='get-started'>
          Get Started
        </Link>
        <Link to='/login' className='login'>
          Login
        </Link>
      </div>
      <div className='mobile' style={{ display: mobileMenuVisible ? 'block' : 'none' }}>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about-us'>About Us</Link>
          </li>
          <li>
            <Link to='/contact-us'>Contact Us</Link>
          </li>
          <li>
            <Link to='/register' className='get-started'>Get Started</Link>
          </li>
          <li>
            <Link to='/login' className='login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
