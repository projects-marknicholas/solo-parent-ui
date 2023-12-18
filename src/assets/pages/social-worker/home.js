import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import SocialWorkerHeader from './header';

function SocialWorkerHome() {
  useEffect(() => {
    document.title = "Home | Social Worker";
    //window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pass setIsMenuOpen to Navbar
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <main>
        {/* Pass isMenuOpen and handleMenuClick to Navbar */}
        <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
        <div className="right">
          <div className='admin-navbar'>
            <div className='admin-left'>
              <button onClick={handleMenuClick}>☰</button>
            </div>
            <div className='admin-right'>
              <SocialWorkerHeader/>
            </div>
          </div>
          <div className='home-main'>home</div>
        </div>
      </main>
    </>
  );
}

export default SocialWorkerHome;