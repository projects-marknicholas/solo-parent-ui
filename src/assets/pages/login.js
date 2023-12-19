import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "./solo-parent/session";
import Banner from "../img/banner.png";
import Navbar from "../pages/navbar";
import Logo from "../img/dswd.png";
import Emote from "../img/emote.png";
import WaveLeft from "../img/wave-left.png";
import WaveRight from "../img/wave-right.png";
import Wavy from "../img/wavy.svg";
import Footer from "../pages/footer";

function Login() {
  const navigate = useNavigate(); // Use history from react-router-dom for navigation
  const { setSessionData } = useSession();

  useEffect(() => {
    document.title = "Login - Solo Parent's Application System";
    window.scrollTo(0, 0);
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(
        "https://solo-parent.vercel.app/api/login",
        {
          username: username,
          password: password,
        }
      );

      // Assuming the server response includes user data
      const userData = response.data.user;

      // Access the userId and soloParentFormId from the userData object
      const Id = userData.Id;
      const userId = userData.userId;
      const soloParentFormId = userData.soloParentFormId;
      const name = userData.name;

      // Now you can use userId and soloParentFormId as needed
      console.log("ID: ", Id);
      console.log("User ID:", userId);
      console.log("Solo Parent Form ID:", soloParentFormId);
      console.log("Name:", name);

      // Set the session data after successful login
      setSessionData({
        Id: Id,
        userId: userId,
        soloParentFormId: soloParentFormId,
        name: name,
      });

      // Handle the response
      alert("Login successful");

      // Redirect the user to another page (for example, dashboard)
      navigate("/solo-parent");
    } catch (error) {
      // Handle login failure
      console.error("Login error:", error);
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <>
      <div className="banner-page">
        <Navbar />
        <img src={Banner} className="banner-img" alt="banner-img" />
        <div className="banner-context">
          <p>home/login</p>
          <h2>
            Welcome back <img src={Emote} alt="emote" />. It’s time to catch up
          </h2>
        </div>
      </div>
      <div className="login-page">
        <div className="left">
          <img src={WaveLeft} alt="wave-side" />
        </div>
        <div className="middle">
          <form onSubmit={handleFormSubmit} className="login-form">
            <img src={Logo} className="logo" alt="logo" />
            <h2>Solo Parent Portal</h2>
            <label>
              Username
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                className="username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </label>
            <label>
              Password
              <div className="pass-d mt-i">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleTogglePasswordVisibility}>
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <button type="submit" className="btn">
              Login
            </button>
            <Link to="/forgot-password">Forgot Password</Link>
          </form>
        </div>
        <div className="right">
          <img src={WaveRight} alt="wave-side" />
        </div>
      </div>
      <img src={Wavy} alt="wavy" className="wavy" />
      <div className="wavy-banner">
        <h1>Register an account today</h1>
        <Link to="/register">Take me there</Link>
      </div>
      <Footer />
    </>
  );
}

export default Login;
