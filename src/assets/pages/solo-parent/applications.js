import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import SoloParentHeader from './header';
import New from '../forms/new';
import Renew from '../forms/renew';
import Update from '../forms/update';
import MonthlyAllowance from './allowance';
import ReliefDistribution from './relief-distribution';
import Loan from './loan';

function SoloParentApplications() {
  useEffect(() => {
    document.title = 'Home | Solo Parent';
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [activeTab, setActiveTab] = useState('new');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <main>
        <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
        <div className="right">
          <div className='admin-navbar'>
            <div className='admin-left'>
              <button onClick={handleMenuClick}>☰</button>
            </div>
            <div className='admin-right'>
              <SoloParentHeader />
            </div>
          </div>
          <div className='home-main'>
            <div className='applications-div container'>
              <div className='choose-form'>
                <div className='choose-btns'>
                  <button
                    className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                    onClick={() => handleTabClick('new')}
                  >
                    New Application
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'renew' ? 'active' : ''}`}
                    onClick={() => handleTabClick('renew')}
                  >
                    Renew Application
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => handleTabClick('update')}
                  >
                    Request Update
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'allowance' ? 'active' : ''}`}
                    onClick={() => handleTabClick('allowance')}
                  >
                    Get Monthly Allowance
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'loan' ? 'active' : ''}`}
                    onClick={() => handleTabClick('loan')}
                  >
                    Apply for Loan
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'relief' ? 'active' : ''}`}
                    onClick={() => handleTabClick('relief')}
                  >
                    Get Relief Distribution Application
                  </button>
                </div>
              </div>
              <div className={`tab-content ${activeTab === 'new' ? 'active' : ''}`}>
                <New/>
              </div>
              <div className={`tab-content ${activeTab === 'renew' ? 'active' : ''}`}>
                <Renew/>
              </div>
              <div className={`tab-content ${activeTab === 'update' ? 'active' : ''}`}>
                <Update/>
              </div>
              <div className={`tab-content ${activeTab === 'allowance' ? 'active' : ''}`}>
                <MonthlyAllowance/>
              </div>
              <div className={`tab-content ${activeTab === 'loan' ? 'active' : ''}`}>
                <Loan/>
              </div>
              <div className={`tab-content ${activeTab === 'relief' ? 'active' : ''}`}>
                <ReliefDistribution/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SoloParentApplications;
