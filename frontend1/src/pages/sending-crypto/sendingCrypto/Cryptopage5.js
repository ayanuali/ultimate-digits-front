import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage5.css";
import { useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import { useState } from "react";
import config from "../../../config.json";
export default function Cryptopage5({
  amount,
  currenWallet,
  signer,
  toAddress,
  type,
  toNumber,
  code,
  setNav,
  tocode,
  number,
}) {
  //function to set navigation bar
  setNav(false);
  const navigate = useNavigate();

  //function and variable declaration along with setstates
  var servicecharge = 0.01 * amount;
  var serviceCharge = parseFloat(servicecharge).toFixed(4);
  var totalfinalamount = 1.01 * amount;
  const [invite, setInvite] = useState(false);

  //function to send confirmation message of a transaction
  async function ConfirmCall() {
    fetch(`${config.backend}/twilio-sms/send-Link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phoneNumber: `+${code}${toNumber}`,
        number: `+${tocode} ${number}`,
      }),
    })
      .then(async (res) => {
        console.log(await res.json());
        setInvite(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className="cryptopage3" style={{ opacity: 0.2 }}>
        <SidebarPayment />
        <div className="cp3-main">
          <div className="cp3-navbar">
            <div className="text" style={{ marginTop: "-5px" }}>
              Sending Crypto
            </div>
          </div>
          <div
            className="text"
            style={{ paddingLeft: "25px", fontSize: "20px" }}
          >
            Receiver's Details
          </div>
          <div className="cp3-box" style={{ paddingLeft: "25px" }}>
            <div className="box1">
              <div className="text" style={{ marginTop: "-3px" }}>
                {type} phone number
              </div>
              <div className="sub-text">
                {{ type } == "Virtual" ? "+999" : `${code}`} {toNumber}
              </div>
            </div>
            <div className="box2">
              <div className="text" style={{ marginTop: "-3px" }}>
                Connected wallet
              </div>
              <div className="sub-text">{currenWallet}</div>
            </div>
            <div className="selection">
              <label>Select Blockchain</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">Base</span>
              </div>
            </div>
            <div className="selection">
              <label>Select Token</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">ETH</span>
              </div>
            </div>
            <div className="selection">
              <label>Enter Amount</label>
              <input
                type="number"
                className="blockchain"
                placeholder={amount}
              />
            </div>
            <div className="cp1-btn">
              <button>Confirm Transaction</button>
            </div>
          </div>
        </div>
      </div>
      <div className="pop-up">
        <div className="cp3-pop">
          <div className="cp3-tickIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="30"
              viewBox="0 0 33 30"
              fill="none"
            >
              <path
                d="M16.4999 12.2596V18.1473M1.89373 23.4477C0.534066 25.8028 2.23443 28.7451 4.95217 28.7451H28.0475C30.7637 28.7451 32.4641 25.8028 31.106 23.4477L19.5599 3.4328C18.2002 1.07774 14.7995 1.07774 13.4398 3.4328L1.89373 23.4477ZM16.4999 22.8574H16.5108V22.87H16.4999V22.8574Z"
                stroke="#EC4E4E"
                stroke-width="2.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="cp3-content" style={{ marginTop: "-20px" }}>
            <div className="text" style={{ marginTop: "-5px" }}>
              Number Not Valid!
            </div>
            <div className="sub-text">
              {invite
                ? `Invite has been sent to +${
                    `${type}` == "Virtual" ? "999" : `${code}`
                  } ${toNumber}. Once they register with the app, you can send them the required amount.`
                : `We are sorry , but it seems that the +${
                    `${type}` == "Virtual" ? "999" : `${code}`
                  } ${toNumber} is not associated with a registered user. Pleasee try again using a registered number or considered sharing the invite link with your friend.`}
            </div>
            <div className="cp3-btn" style={{ marginTop: "-15px" }}>
              {invite ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    ConfirmCall();
                  }}
                >
                  Copy URL of Ultimate Digits
                </button>
              )}
              <button
                onClick={() => {
                  navigate(-1);
                }}
                style={{ backgroundColor: "transparent" }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
