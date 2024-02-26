import React from "react";
import "./wallet.css";
import frame from "../../assets/Frame.svg";
import clipboard from "../../assets/clipboard.svg";
import qr from "../../assets/qr.svg";
const Wallet = () => {
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
  return (
    <div className="maincontainer">
      <div>
        {" "}
        <img src={frame} alt="frame" className="frame" />
      </div>
      <div className="headerText">Congrats! Your Ultimate Wallet is ready</div>
      <div className="address" onClick={copyToClipboard}>
        0xhshvhvsf728snskm101jkamxsmx xjjbbwo0192{" "}
        <img src={clipboard} alt="clip" />{" "}
      </div>

      <div className="qrbox">
        <img src={qr} alt="qr" className="qr" />
      </div>

      <div className="privatekey">Show private Key</div>

      <div className="link">link Mobile number</div>
    </div>
  );
};

export default Wallet;
