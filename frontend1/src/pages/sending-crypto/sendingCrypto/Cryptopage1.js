import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage1.css";
import { Link } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";

export default function Cryptopage1({
  amount,
  setAmount,
  currentWallet,
  toNumber,
  type,
  setNav,
}) {

  //function to set the navigation bar
  setNav(false);

  return (
    <div className="cryptopage1">
      <SidebarPayment />
      <div className="cp1-main">
        <div className="cp1-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Sending Crypto
          </div>
        </div>
        <div className="cp1-content">
          <div className="text" style={{ marginTop: "-5px" }}>
            Transaction in progress
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            You are about to send crypto to {type == "Virtual" ? "+999" : "+91"}{" "}
            {toNumber}
          </div>
          <div className="cp1-box">
            <div className="box1">
              <div className="text" style={{ marginTop: "-3px" }}>
                {type} phone number
              </div>
              <div className="sub-text">
                {type == "Virtual" ? "+999" : "+91"} {toNumber}
              </div>
            </div>
            <div className="box2">
              <div className="text" style={{ marginTop: "-3px" }}>
                Connected wallet
              </div>
              <div className="sub-text">{currentWallet}</div>
            </div>
            <div className="selection">
              <label>Select Blockchain</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">Binance</span>
              </div>
            </div>
            <div className="selection">
              <label>Select Token</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">BUSD</span>
              </div>
            </div>
            <div className="selection">
              <label>Enter Amount</label>

              <input
                type="number"
                className="blockchain"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="cp1-btn">
            <Link to="/sending-crypto/confirmPayment">
              <button>Confirm Transaction</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
