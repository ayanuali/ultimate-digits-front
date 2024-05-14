import "./HomePage.css";
import LowerArcImg from "../../assets/home-page/lower-arc.png";
import IphoneImg from "../../assets/home-page/iphone.png";
import Logo from "../../assets/ud-square-logo2.png";
import DegenLogo from "../../assets/assets/degenlogo.png";
import Unicornlogo from "../../assets/assets/u2u.jpeg"
import Chain from "../../assets/assets/chain.png";
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


import { mint } from "../../blockchain/integration";
import PhoneNumberInput from "./PhonenumberInput";
const HomePage = ({ setCode, contract_connect }) => {


  //update page on pressing search
  const [updatePage, setUpdatePage] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();

  

  const handleMint = async() => {
    try {
      const res = await mint({uri:"hi"});
      console.log("res",res)
    } catch (error) {
      console.log("minting issue", error)
    }
  }



  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Set initial code and remove event listener on cleanup
    setCode("999");
    return () => window.removeEventListener('resize', handleResize);
}, [setCode]);

  return (
    <div className="homePage">
       {isMobile && (
                <div className="overlay">
                    Please open this page in a desktop browser for the best experience.
                </div>
            )}

      <div className="homePageTitle" style={{ marginTop: "5rem" }}>
        <div className="homePageBackgroundGradient" />

     <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>

     <div style={{ textAlign: "center" }}>
          <img src={Logo} />
        </div>
        <div style={{ textAlign: "center", width:"20px", marginRight:"0px",  }} >
          <img src={Chain} style={{    width: "20px",
    height: "20px",
    marginTop: "0px",
    marginBottom: "0px"
}}  />
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={Unicornlogo} />
        </div>

     </div>

        <h3>Your Unicorn Ultra Mobile Number</h3>

        <p>
        Your custom mobile number. Your Web3 identity. <br /> The only wallet address you ever need to share.          <br />
        </p>
      </div>

      <div style={{display: "flex", gap:"10px", border:"1px solid white", borderRadius:"11px", padding:"3px", marginBottom:"50px", alignItems:"center"}}>

        <div style={{ backgroundColor: "rgba(171, 123, 254, 0.2)", padding:"5px", borderRadius:"8px"}}>
<span style={{color:"white"}}>+999 U2U SEVENTH
</span>        </div>

        <div>

        <span style={{color:"white"}}> = 
</span> 
        </div>

        <div style={{ backgroundColor: "rgba(171, 123, 254, 0.2)", padding:"5px", borderRadius:"8px", color:"white"}}>
+999 828 7383684

        </div>


      </div>

      {/* Input Field */}
      <div className="homePageInputWrapper">
        <PhoneSearchInput update={updatePage} setUpdate={setUpdatePage} onSub= {handleMint} />
        <p>
          <div style={{ marginTop: "-10px" }}>
            {/* <img src={CheckIcon} /> */}
          </div>
          Enter 7 digits
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
                Get alerts for your wallet activity as text or push
                notifications
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
                Make your Ethereum Web3 virtual mobile number your wallet
                address – flexible, changeable, and safer than traditional Web3
                domains!
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-img">
              <img src={voipIcon} alt="voip"></img>
            </div>
            <div className="box-text">
              <div className="text-heading">
                Decentralized VOIP and Messaging
              </div>
              <div className="text-content">
                Experience the future of communication with our decentralized
                VOIP and messaging platform. Choose who can contact you. Secure,
                private, and crystal clear.
              </div>
            </div>
          </div>
        </div>
        <div className="hp-row-box">
          <div className="box">
            <div className="box-img">
              <img
                src={rewardIcon}
                style={{ color: "blue" }}
                alt="Rewarding"
              ></img>
            </div>
            <div className="box-text">
              <div className="text-heading">A Rewarding Revolution</div>
              <div className="text-content">
                Your Ultimate Digits virtual number is a tradeable Ethereum NFT.
                It makes you eligible for airdrops from our partners, and
                unlocks other usage-based rewards.
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
                Our upcoming fiat settlement integration enables you to choose
                whether the crypto you send is to be deposited into your
                friend’s crypto wallet, or paid as fiat money to their bank
                account.
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-img">
              <img src={privateIcon} alt="voip"></img>
            </div>
            <div className="box-text">
              <div className="text-heading">
                Private, Flexible and Cutting-Edge
              </div>
              <div className="text-content">
                Changes to your mobile number, transfer of NFT ownership, and
                connected wallet changes are handled via zero-knowledge proofs,
                chain of custody, time-locks and decentralized reporting. Our
                hashing rule also ensures the privacy of your data on-chain.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
