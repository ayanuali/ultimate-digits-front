import React from "react";
import ProgressIcon from "../../../../assets/login-page/mint-progress/progress.svg";
import "./MintProgress.css";

import { useNavigate } from "react-router-dom";

const MintProgress = ({ setProceedTo }) => {
  const navigate = useNavigate();

  // Get the query parameter string
  const queryString = window.location.search;

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");

  // Split the cart parameter string at each comma and convert each element to a number
  const cartArray = cartParam.split(",").map(Number);
  return (
    <div className="mintProgress">
      <div className="mintProgressHeader">
        <div style={{marginTop: '-16px', marginRight: '10px'}}><img src={ProgressIcon} /></div>
        <h1>Minting in progress</h1>
      </div>
      <p>
        Your number is now being deployed into the blockchain and your
        crypto-wallet. The transaction is being completed on the Skale
        blockchain. When the transaction is complete your domain will show on
        the blockchain.
      </p>
      <button
        className="blueRoundedBtn"
        onClick={() => navigate(`/selection-page/my-numbers?cart=${cartParam}`)}
      >
        Dismiss
      </button>
    </div>
  );
};

export default MintProgress;
