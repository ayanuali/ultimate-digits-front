import React, { useState } from "react";

import Check from "../../../../assets/login-page/order-claim/check-icon.svg";
import CheckEmpty from "../../../../assets/login-page/order-claim/empty-check.svg";
import WalletIcon from "../../../../assets/login-page/order-claim/wallet-icon.png";
import MetamaskIcon from "../../../../assets/login-page/order-claim/metamask-icon.png";

import { useNavigate } from "react-router-dom";

import "./ClaimOrder.css";

const ClaimOrder = ({ setProceedTo, price }) => {
  const navigate = useNavigate();

  // Get the query parameter string
  const queryString = window.location.search;

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");

  const [state, setState] = useState("");

  return (
    <div className="claimOrder">
      <div className="claimOrderTitle">
        <h1>Choose payment method</h1>
        <p>All transactions are secure and encrypted</p>
      </div>

      <div
        className={
          state === "card"
            ? "claimOrderChoseBox activeBorder"
            : "claimOrderChoseBox"
        }
        // onClick={() => setState("card")}
      >
        <div className="claimOrderChoseBoxHover" />
        <div className="claimOrderChoseBoxWrapper">
          <img src={state === "card" ? Check : CheckEmpty} />
          <div className="claimOrderChoseBoxMain">
            <img src={WalletIcon} />
            <h3>Pay with card (coming soon)</h3>
            <p>
              Payment will be completed via credit card, your NFTs will be
              stored in a custodial wallet.
            </p>
          </div>
        </div>
      </div>

      <div
        className={
          state === "crypto"
            ? "claimOrderChoseBox activeBorder"
            : "claimOrderChoseBox"
        }
        onClick={() => setState("crypto")}
      >
        <div className="claimOrderChoseBoxWrapper">
          <img src={state === "crypto" ? Check : CheckEmpty} />

          <div className="claimOrderChoseBoxMain">
            <img src={MetamaskIcon} />
            <h3>Pay with crypto</h3>
            <p>
              Payment will be completed using your Metamask wallet. Please make
              sure that you have enough balance available in your wallet.
            </p>
          </div>
        </div>
      </div>

      <button
        className="blueRoundedBtn"
        onClick={() => setProceedTo("connectWallet")}
        style={{ marginBottom: "1rem" }}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default ClaimOrder;
