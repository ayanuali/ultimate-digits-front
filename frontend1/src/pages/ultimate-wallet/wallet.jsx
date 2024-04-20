import React, { useEffect, useState } from "react";
import "./wallet.css";
import frame from "../../assets/Frame.svg";
import clipboard from "../../assets/clipboard.svg";
import qr from "../../assets/qr.svg";
import { QRCodeSVG } from "qrcode.react";
import { useSelector, useDispatch } from "react-redux";

import eye from "./icons8-eye-50.png"

import { useNavigate } from "react-router-dom";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";

const Wallet = () => {
  const { waas, user, isCreatingWallet, wallet, isLoggingIn } =
    useWalletContext();
  const navigate = useNavigate();
  const [privatekey, setPrivatekey] = useState(
    "asddsagsdgasdgadsgdsgasdgasdgasd23"
  );
  const userr = useSelector((state) => state.user);

  const [showPrivKey, setShowPrivKey] = useState(false);
  const [address, setAddress] = useState("0x1234567890");
  const copyToClipboard = (e) => {
    e.preventDefault();
    const textArea = document.createElement("textarea");
    textArea.value = e.currentTarget.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      console.log(`Copying text command was ${msg}`);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);

    alert("Address copied to clipboard!");
  };

  const showPrivateKey = () => {
    setShowPrivKey(true);
  };
  const handleLink = () => {
    // navigate("/selection-page");
  };

  useEffect(() => {
    setAddress(userr.address);
    setPrivatekey(userr.privKey);
  }, [address, privatekey]);
  return (
    <div className="maincontainer">
      <div>
        {" "}
        <img src={frame} alt="frame" className="frame" />
      </div>
      <div className="headerText">Congrats! Your Ultimate Wallet is ready</div>
      <div className="address" onClick={copyToClipboard}>
        {address}
        <img src={clipboard} alt="clip" />{" "}
      </div>

      <div className="qrbox">
        <QRCodeSVG value={address} size={128} level={"H"} />
      </div>

      <div
        className="privatekey"
        onClick={showPrivKey ? copyToClipboard : showPrivateKey}
      >
        {showPrivKey ? privatekey : <> Show private Key <span>
          <img src={eye} style={{width:"20px", height:"20px" , color:"white", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"0px"}} />
          </span></>}
        {showPrivKey ? <img src={clipboard} alt="clip" /> : ""}
        {}
      </div>

      <div className="link" onClick={handleLink}>
        link Mobile number
      </div>
    </div>
  );
};

export default Wallet;
