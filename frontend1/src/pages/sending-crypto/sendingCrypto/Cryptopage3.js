import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage3.css";
import { useNavigate } from "react-router-dom";
export default function Cryptopage3({
  amount,
  currenWallet,
  signer,
  toAddress,
  type,
  toNumber,
  code,
  setNav,
}) {
  //setting the navigation bar
  setNav(false);
  const navigate = useNavigate();

  //declaring variables andd functions
  var servicecharge = 0.01 * amount;
  var serviceCharge = parseFloat(servicecharge).toFixed(4);
  var totalfinalamount = 1.01 * amount;

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
          </div>
          <div className="cp3-content">
            <div className="text" style={{ marginTop: "-5px" }}>
              Final Amount
            </div>
            <div className="sub-text" style={{ marginTop: "-15px" }}>
              Please review the final amount that you will be paying
            </div>
            <div className="cp3-box">
              <div className="selection">
                <label>Amount</label>
                <select className="blockchain" disabled>
                  <option></option>
                  <option>{amount}</option>
                </select>
              </div>
              <div className="selection">
                <label>
                  Ultimate digits service charge (Ultimate digits service charge
                  (1%))
                </label>
                <input
                  type="number"
                  className="blockchain"
                  placeholder={servicecharge}
                  disabled
                />
              </div>
              <div className="selection">
                <label>Total final amount</label>
                <input
                  type="number"
                  className="blockchain"
                  placeholder={totalfinalamount}
                  disabled
                />
              </div>
            </div>
            <div className="cp3-btn">
              <button>Pay Via Metamask</button>
              <button
                disabled
                style={{ opacity: 0.3, backgroundColor: "transparent" }}
              >
                Pay using ultimate digits wallet
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pop-up">
        <div className="cp3-pop">
          <div className="cp3-tickIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M18 25.5L22.5 30L30 19.5M42 24C42 26.536 40.74 28.78 38.814 30.136C39.0215 31.3215 38.9403 32.5396 38.5771 33.6871C38.214 34.8346 37.5797 35.8777 36.728 36.728C35.8777 37.5797 34.8346 38.214 33.6871 38.5771C32.5396 38.9403 31.3215 39.0215 30.136 38.814C29.4444 39.7989 28.5257 40.6028 27.4576 41.1573C26.3895 41.7119 25.2035 42.001 24 42C21.464 42 19.22 40.74 17.864 38.814C16.6785 39.0213 15.4604 38.94 14.313 38.5769C13.1655 38.2138 12.1224 37.5796 11.272 36.728C10.4202 35.8777 9.78596 34.8346 9.42285 33.6871C9.05973 32.5396 8.97849 31.3215 9.186 30.136C8.20105 29.4444 7.39724 28.5257 6.84265 27.4576C6.28806 26.3895 5.99902 25.2035 6 24C6 21.464 7.26 19.22 9.186 17.864C8.97849 16.6785 9.05973 15.4604 9.42285 14.3129C9.78596 13.1654 10.4202 12.1223 11.272 11.272C12.1224 10.4204 13.1655 9.78619 14.313 9.42309C15.4604 9.05998 16.6785 8.97866 17.864 9.186C18.5557 8.20117 19.4744 7.39745 20.5425 6.84288C21.6106 6.2883 22.7965 5.99919 24 6C26.536 6 28.78 7.26 30.136 9.186C31.3215 8.97866 32.5396 9.05998 33.687 9.42309C34.8345 9.78619 35.8776 10.4204 36.728 11.272C37.5796 12.1224 38.2138 13.1655 38.5769 14.313C38.94 15.4604 39.0213 16.6785 38.814 17.864C39.7989 18.5556 40.6028 19.4743 41.1573 20.5424C41.7119 21.6105 42.001 22.7965 42 24Z"
                fill="#489D5D"
              />
              <path
                d="M18 25.5L22.5 30L30 19.5M42 24C42 26.536 40.74 28.78 38.814 30.136C39.0215 31.3215 38.9403 32.5396 38.5772 33.6871C38.214 34.8346 37.5797 35.8777 36.728 36.728C35.8777 37.5797 34.8346 38.214 33.6871 38.5771C32.5396 38.9403 31.3215 39.0215 30.136 38.814C29.4444 39.7989 28.5257 40.6028 27.4576 41.1573C26.3895 41.7119 25.2035 42.001 24 42C21.464 42 19.22 40.74 17.864 38.814C16.6785 39.0213 15.4604 38.94 14.313 38.5769C13.1655 38.2138 12.1224 37.5796 11.272 36.728C10.4202 35.8777 9.78596 34.8346 9.42285 33.6871C9.05973 32.5396 8.97849 31.3215 9.186 30.136C8.20105 29.4444 7.39724 28.5257 6.84265 27.4576C6.28806 26.3895 5.99902 25.2035 6 24C6 21.464 7.26 19.22 9.186 17.864C8.97849 16.6785 9.05973 15.4604 9.42285 14.3129C9.78596 13.1654 10.4202 12.1223 11.272 11.272C12.1224 10.4204 13.1655 9.78619 14.313 9.42309C15.4604 9.05998 16.6785 8.97866 17.864 9.186C18.5557 8.20117 19.4744 7.39745 20.5425 6.84288C21.6106 6.2883 22.7965 5.99919 24 6C26.536 6 28.78 7.26 30.136 9.186C31.3215 8.97866 32.5396 9.05998 33.687 9.42309C34.8345 9.78619 35.8776 10.4204 36.728 11.272C37.5796 12.1224 38.2138 13.1655 38.5769 14.313C38.94 15.4604 39.0213 16.6785 38.814 17.864C39.7989 18.5556 40.6028 19.4743 41.1573 20.5424C41.7119 21.6105 42.001 22.7965 42 24Z"
                stroke="#489D5D"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="25" cy="27" r="9" fill="#489D5D" />
              <path
                d="M17.25 24.4481L23.0999 30.298L31.8748 17.1357"
                stroke="white"
                stroke-width="2.43746"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="cp3-content" style={{ marginTop: "-20px" }}>
            <div className="text" style={{ marginTop: "-5px" }}>
              Transaction complete
            </div>
            <div className="sub-text">
              Congratulations on your successful {amount} BUSD transaction to +
              {{ type } == "Virtual" ? "+999" : `+${code}`} {toNumber}! We've
              sent a confirmation text message and receipt to +
              {{ type } == "Virtual" ? "+999" : `+${code}`} {toNumber} for their
              reference. Enjoy hassle-free transactions with Ultimate Digits.
            </div>
            <div className="cp3-btn" style={{ marginTop: "-15px" }}>
              <button
                onClick={() => {
                  navigate("/sending-crypto/paymentRealNumber");
                }}
              >
                Go back to payments
              </button>
              <button
                onClick={() => {
                  navigate("/sending-crypto/confirmPayment");
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
