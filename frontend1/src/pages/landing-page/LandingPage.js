import React, { useState } from "react";
import "./LandingPage.css";
// import topLogo from "../../assets/ud-logo.png";
import iPhone from "../../assets/iPhone.png";
import iPhoneBack from "../../assets/iPhoneBack.png";
import ellipse from "../../assets/Ellipse.png";
import { useNavigate } from "react-router";
import border from "../../assets/iPhoneBack.png";
import iphone from "../../assets/landing-page/iphone.svg";
import topLogo from "../../assets/ud-logo.png";
import heroImage from "../../assets/heroImage.svg";
import LoginForm from "../auth-page/components/login-form/LoginForm";

export default function LandingPage({ setNav, log }) {
  //function to set navigation bar
  const navigate = useNavigate();
  const [proceedTo, setProceedTo] = useState("showCart");
  const [signer, setsigner] = useState({});
  const [walletaddress, setwalletaddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [contract, setcontract] = useState({});
  const [currentWallet, setCurrentWallet] = useState("");
  const [user, setUser] = useState({
    isLoggedIn: null,
    email: "",
    phoneNumber: "",
  });

  setNav("0");

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="imageSection">
          <div className="icon">
            <img src={topLogo} className="img-logo" alt="topLogo" />
          </div>

          <div>
            <div className="heroText">
              Your Mobile Number → Your <br /> Crypto Wallet and Web3 Identity
            </div>

            <div style={{ backgroundcolor: `transparent` }}>
              <div style={{ textAlign: "center", marginTop: "80px" }}>
                <img
                  src={heroImage}
                  alt="img"
                  style={{ width: "40rem", textAlign: "center" }}
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="formSection">
          <LoginForm
            setProceedTo={setProceedTo}
            setsigner={setsigner}
            setwalletaddress={setwalletaddress}
            setcontract={setcontract}
            setUser={setUser}
            user={user}
            log={log}
            setNav={setNav}
          />
        </div>
      </div>
    </div>
  );
}
