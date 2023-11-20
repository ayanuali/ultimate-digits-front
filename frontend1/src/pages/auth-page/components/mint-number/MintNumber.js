import React from "react";
import "./MintNumber.css";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { formatPhoneNumber } from "../../../../functions/formatPhoneNumber";
import checkTotalPrice from "../../../../functions/checkTotalPrice";

const MintNumber = ({ setProceedTo, cartArray, walletaddress, signer }) => {
  // function to navigate
  const navigate = useNavigate();

  //function to buy virtual number
  async function buynumber() {
    // send to which address ?
    const toaddress = "0x9217aBD6cD0a54ef915944Ff4bE80A6915EE9086";
    var amount = parseInt(checkTotalPrice(cartArray)) * 0.0041336988687793;
    let amt = ethers.parseUnits(amount.toString());
    const transacamount = "0x" + amt.toString(16);

    console.log(amt);

    try {
      signer
        .sendTransaction({
          to: toaddress,
          value: transacamount,
        })
        .then((txHash) => {
          console.log(txHash.hash);
          setProceedTo("purchaseConfirmation");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mintNumber" style={{ marginTop: "8.2rem" }}>
      <h1>Mint your number</h1>
      <p>
        You are minting the following numbers:
        {cartArray.map((number, i) => (
          <span
            className="mintNumberSpanNumber"
            style={{ marginLeft: "0px" }}
            key={i}
          >
            +999 {`${number && formatPhoneNumber(number.toString())}`}
          </span>
        ))}{" "}
        {<br />}
        Number owner will be assigned to the following wallet address:
        <span> {`${walletaddress}`}</span>
      </p>

      <button className="blueRoundedBtn" onClick={buynumber}>
        Confirm
      </button>
      <a onClick={() => navigate(-1)}>Cancel</a>
    </div>
  );
};

export default MintNumber;
