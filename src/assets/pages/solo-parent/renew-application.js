import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import SoloParentHeader from './header';
import Renew from '../forms/renew';

function SoloParentRenewApplication(){
  useEffect(() => {
    document.title = "Renew Application | Solo Parent";
    //window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pass setIsMenuOpen to Navbar
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    <>
    <main>
      <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick}/>
      <div className="right">
        <div className='admin-navbar'>
          <div className='admin-left'>
            <button onClick={handleMenuClick}>☰</button>
          </div>
          <div className='admin-right'>
            <SoloParentHeader/>
          </div>
        </div>
        <div className='home-main'>
          {/* Renew Application start*/}
          <div className='form-banner container'>
            <h2>Renew Application</h2>
          </div>
          <Renew/>
          {/* Renew Application end*/}
        </div>
      </div>
    </main>
    </>
  );
}

export default SoloParentRenewApplication;