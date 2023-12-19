import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import SoloParentHeader from './header';
import Update from '../forms/update';

function SolotParentUpdateStatus(){
  useEffect(() => {
    document.title = "Update Status | Solo Parent";
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
            {/* Update Status start*/}
            <div className='form-banner container'>
              <h2>Update Status</h2>
            </div>
            <Update/>
            {/* Update Status end*/}
          </div>
        </div>
      </main>
    </>
  );
}

export default SolotParentUpdateStatus;