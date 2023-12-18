import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../img/banner.png';
import Navbar from '../pages/navbar';
import Logo from '../img/dswd.png';
import Emote from '../img/emote.png';
import WaveLeft from '../img/wave-left.png';
import WaveRight from '../img/wave-right.png';
import Wavy from '../img/wavy.svg';
import Footer from '../pages/footer';

function ForgotPassword(){
  useEffect(() => {
    document.title = "Forgot Password - Solo Parent's Application System";
    window.scrollTo(0, 0);
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return(
    <>
      <div className="banner-page">
        <Navbar/>
        <img src={Banner} className="banner-img" alt="banner-img"/>
        <div className="banner-context">
            <p>home/forgot password</p>
            <h2>Welcome back! 🌟 It's time to reconnect and catch up.</h2>
        </div>
      </div>
      <div className='login-page'>
        <div className='left'>
          <img src={WaveLeft} alt='wave-side'/>
        </div>
        <div className='middle'>
          <form method='post' action='/submit'>
            <img src={Logo} className='logo' alt='logo'/>
            <h2>Solo Parent Portal</h2>
            <label>
              Email
              <input 
                type='text' 
                placeholder='Email' 
                name='email' 
                id='email'
                className='username' 
                autoFocus 
                required/>
            </label>
            <button type='submit' className='btn'>Send code</button>
            <Link to='/login'>Already have an account?</Link>
          </form>
        </div>
        <div className='right'>
          <img src={WaveRight} alt='wave-side'/>
        </div>
      </div>
      <img src={Wavy} alt='wavy' className='wavy'/>
      <div className='wavy-banner'>
        <h1>Register an account today</h1>
        <Link to='/register'>Take me there</Link>
      </div>
      <Footer/>
    </>
  );
}

export default ForgotPassword;