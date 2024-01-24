import "./HomePage.css";
import LowerArcImg from "../../assets/home-page/lower-arc.png";
import IphoneImg from "../../assets/home-page/iphone.png";
import Logo from "../../assets/ud-square-logo2.png";
import CheckIcon from "../../assets/virtual/hash.svg";
import bellIcon from "../../assets/virtual/bell.svg";
import rewardIcon from "../../assets/virtual/reward.svg";
import sendCryptoIcon from "../../assets/virtual/sendCrypto.svg";
import privateIcon from "../../assets/virtual/private.svg";
import recieveIcon from "../../assets/virtual/recieve.svg";
import voipIcon from "../../assets/virtual/voip.svg";
import PhoneSearchInput from "../../utils/inputs/PhoneSearchInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = ({ setCode, contract_connect }) => {
  //update page on pressing search
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCode("999");
  }, []);

  return (
    <div className="homePage">
      <div
        className="back"
        onClick={() => {
          navigate("/selection-page");
        }}
        style={{ marginTop: "2rem", width: "5rem" }}
      >
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.16667 0.833344L1 5.00001M1 5.00001L5.16667 9.16668M1 5.00001H11"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="back-text" style={{ marginLeft: "5px" }}>
          Go back
        </span>
      </div>

      <div className="homePageTitle" style={{ marginTop: "5rem" }}>
        <div className="homePageBackgroundGradient" />

        <div style={{ textAlign: "center" }}>
          <img src={Logo} />
        </div>

        <h3>Your Web3 Mobile Number</h3>

        <p>The only wallet address you ever need to share<br />Secured by Ethereum
        </p>
      </div>

      {/* Input Field */}
      <div className="homePageInputWrapper">
        <PhoneSearchInput update={updatePage} setUpdate={setUpdatePage} />
        <p>
          <div style={{ marginTop: "-10px" }}>
            <img src={CheckIcon} />
          </div>
          Enter minimum 10 digits
        </p>
      </div>

      <div className="hp-bottom">
      <div className="hp-row-box">
        <div className="box">
          <div className="box-img">
            <img src={bellIcon} alt="notification"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">Get Web3 Transaction Alerts</div>
            <div className="text-content">
            Get alerts for your wallet activity as text or push notifications
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src={recieveIcon} alt="recieve"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">
              Receive and Send Crypto with Ease
            </div>
            <div className="text-content">
            Make your Ethereum Web3 virtual mobile number your wallet address – flexible, changeable, and safer than traditional Web3 domains!
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src={voipIcon} alt="voip"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">Decentralized VOIP and Messaging</div>
            <div className="text-content">
              Experience the future of communication with our decentralized VOIP
              and messaging platform. Choose who can contact you. Secure,
              private, and crystal clear.
            </div>
          </div>
        </div>
        </div>
        <div className="hp-row-box">
        <div className="box">
          <div className="box-img">
            <img src={rewardIcon} style={{color: "blue"}}alt="Rewarding"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">A Rewarding Revolution</div>
            <div className="text-content">
            Your Ultimate Digits virtual number is a tradeable Ethereum NFT. It makes you eligible for airdrops from our partners, and unlocks other usage-based rewards.
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src={sendCryptoIcon} alt="sendingCrypto"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">
              Receive and Send Crypto with Ease
            </div>
            <div className="text-content">
            Our upcoming fiat settlement integration enables you to choose whether the crypto you send is to be deposited into your friend’s crypto wallet, or paid as fiat money to their bank account. 
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src={privateIcon} alt="voip"></img>
          </div>
          <div className="box-text">
            <div className="text-heading">Private, Flexible and Cutting-Edge</div>
            <div className="text-content">
            Changes to your mobile number, transfer of NFT ownership, and connected wallet changes are handled via zero-knowledge proofs, chain of custody, time-locks and decentralized reporting. Our hashing rule also ensures the privacy of your data on-chain.
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
