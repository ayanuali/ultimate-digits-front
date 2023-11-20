import React from "react";
import "./LandingPage.css";
import topLogo from "../../assets/ud-logo.png";
import iPhone from "../../assets/iPhone.png";
import iPhoneBack from "../../assets/iPhoneBack.png";
import ellipse from "../../assets/Ellipse.png";
import { useNavigate } from "react-router";
import border from "../../assets/iPhoneBack.png";
import iphone from "../../assets/landing-page/iphone.svg";
export default function LandingPage({ setNav, setLog }) {
  //function to set navigation bar
  const navigate = useNavigate();
  setNav("2");

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-heading">Your Web3 Mobile Number</div>
        <div className="landing-subheading">
          Join the revolution of seamless web3 communication
        </div>
        <div className="landing-btn">
          <button
            className="signup-btn"
            onClick={() => {
              setLog(true);
              navigate("/signup");
            }}
          >
            Join Now
          </button>
          <button
            className="login-btn"
            onClick={() => {
              setLog(false);
              navigate("/signup");
            }}
          >
            Login
          </button>
        </div>
        <div className="bottompart">
          <img className="ellipse" src={ellipse} alt="img"></img>
          <div className="mobile" style={{ backgroundcolor: `transparent` }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={iphone}
                alt="img"
                style={{ width: "20rem", textAlign: "center" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
