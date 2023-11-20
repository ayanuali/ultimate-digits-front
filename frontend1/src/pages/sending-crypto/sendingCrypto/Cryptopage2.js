import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage2.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import config from "../../../config.json"

export default function Cryptopage2({
  amount,
  currentWallet,
  signer,
  toAddress,
  type,
  toNumber,
  code,
  setNav,
  number,
  tocode,
}) {
  //function to set navigation bar
  setNav(false);
  const navigate = useNavigate();

  //variable and function declaration
  var servicecharge = 0.01 * amount;
  var serviceCharge = parseFloat(servicecharge * 0.0046790195017).toFixed(5);
  var totalfinalamount = 1.01 * amount;

  //function to send confirmation message of transaction
  async function confirmcall() {
    fetch(`${config.backend}/twilio-sms/send-msg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        amount: `${totalfinalamount}`,
        phoneNumber: `+${code}${toNumber}`,
        number: `+${tocode} ${number}`,
      }),
    })
      .then(async (res) => {
        console.log(await res.json());
        navigate("/sending-crypto/last-page");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //function allowing transaction to take place
  async function sendTransaction() {
    console.log(totalfinalamount);
    console.log(number);

    // send to which address ?
    const toaddress = toAddress;
    const a = parseFloat(amount * 0.0046790195017).toFixed(5);
    let amt = ethers.parseUnits(a.toString());
    const transacamount = "0x" + amt.toString(16);
    let amt1 = ethers.parseUnits(serviceCharge.toString());
    const transacamount1 = "0x" + amt1.toString(16);

    try {
      signer
        .sendTransaction({
          to: toaddress,
          value: transacamount,
        })
        .then((txHash) => {
          console.log(txHash.hash);
          try {
            signer
              .sendTransaction({
                //address of app owner
                to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
                value: transacamount1,
              })
              .then((txHash) => {
                console.log(txHash.hash);
                if (type == "Real") {
                  confirmcall();
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="cryptopage2">
      <SidebarPayment />
      <div className="cp2-main">
        <div className="cp2-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Sending Crypto
          </div>
        </div>
        <div className="cp2-content">
          <div className="text" style={{ marginTop: "-5px" }}>
            Final Amount
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Please review the final amount that you will be paying
          </div>
          <div className="cp2-box">
            <div className="selection">
              <label>Amount</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{amount}</span>
              </div>
            </div>
            <div className="selection">
              <label>Ultimate digits Convenience Fee</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{servicecharge}</span>
              </div>
            </div>
            <div className="selection">
              <label>Total final amount</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{totalfinalamount}</span>
              </div>
            </div>
          </div>
          <div className="cp2-btn">
            <button onClick={sendTransaction}>Pay Via Metamask</button>
            <button
              disabled
              style={{ opacity: 0.3, backgroundColor: "transparent" }}
            >
              Pay using ultimate digits wallet
            </button>
          </div>
          <div className="text" style={{ marginTop: "-5px" }}>
            Receiver's Details
          </div>
          <div className="cp2-box" style={{ marginTop: "-15px" }}>
            <div className="box1">
              <div className="text" style={{ marginTop: "-3px" }}>
                {type} phone number
              </div>
              <div className="sub-text">
                {{ type } == "Virtual" ? "+999" : "+91"} {toNumber}
              </div>
            </div>
            <div className="box2">
              <div className="text" style={{ marginTop: "-3px" }}>
                Connected wallet
              </div>
              <div className="sub-text">{toAddress}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
