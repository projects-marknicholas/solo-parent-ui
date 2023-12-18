import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../img/banner.png';
import Navbar from '../pages/navbar';
import Wave from '../img/wave.png';
import Wavy from '../img/wavy.svg';
import Footer from '../pages/footer';
import New from './forms/register';

function Register() {
  useEffect(() => {
    document.title = "Register - Solo Parent's Application System";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    {/* Banner */}
    <div className="banner-page">
      <Navbar/>
      <img src={Banner} className="banner-img" alt="banner-img"/>
      <div className="banner-context">
          <p>home/register</p>
          <h2>Hi <img src={Wave} alt='wave'/>, let's get familiar</h2>
      </div>
    </div>
    <New/>
    {/* Wavy svg*/}
    <img src={Wavy} alt='wavy' className='wavy'/>

    {/* Footer banner & section*/}
    <div className='wavy-banner'>
      <h1>Login your account today</h1>
      <Link to='/login'>Take me there</Link>
    </div>
    <Footer/>
    </>
  );
}

export default Register;
