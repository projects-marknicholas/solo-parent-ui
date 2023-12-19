import { Link } from 'react-router-dom';
import Instagram from '../img/instagram.svg';
import Facebook from '../img/facebook.svg';
import Twitter from '../img/twitter.svg';
import Tiktok from '../img/tiktok.svg';
import Youtube from '../img/youtube.svg';
import Pinterest from '../img/pinterest.svg';

function Footer(){
  return(
    <>
      <footer>
        <div className='flex'>
          <div className="left">
            <h1>Don't Miss Out</h1>
            <p>Sign up for the latest solo parent news and events.</p>
            <form method='post' action='/submit'>
              <div className='footer-form'>
                <label>
                  Email
                  <input type='email' placeholder='Enter your email address' name='email' id='email' required/>
                </label>
                <label>
                  <button type='submit'>Sign up</button>
                </label>
              </div>
            </form>
            <small>
              By signing up, you understand and agree that your data will be collected and used subject
              to our Privacy Policy and Terms of use.
            </small>
            <div className='social-grid'>
              <div className='social-item'>
                <img src={Instagram} alt='img'/>
              </div>
              <div className='social-item'>
                <img src={Facebook} alt='img'/>
              </div>
              <div className='social-item'>
                <img src={Twitter} alt='img'/>
              </div>
              <div className='social-item'>
                <img src={Tiktok} alt='img'/>
              </div>
              <div className='social-item'>
                <img src={Youtube} alt='img'/>
              </div>
              <div className='social-item'>
                <img src={Pinterest} alt='img'/>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="link-item">
              <h3>Links</h3>

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
                  <Link to='/register'>Register</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </ul>
            </div>
            <div className="link-item">
              <h3>title</h3>

              <ul>
                <li>
                  <Link to=''>link</Link>
                </li>
                <li>
                  <Link to=''>link</Link>
                </li>
                <li>
                  <Link to=''>link</Link>
                </li>
              </ul>
            </div>
            <div className="link-item">
              <h3>security</h3>

              <ul>
                <li>
                  <Link to='/privacy-policy'>Privacy Policy</Link>
                </li>
                <li>
                  <Link to='/terms-and-conditions'>Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='left'>
            © 2023 {/*University*/} - Developed by {/*Developer name*/}
          </div>
          <div className='right'>
            {/*Other description*/} Thankyou
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;