import React from "react";
import "./ConfirmationPageReal1.css";
import metaMaskLogo from "../../assets/Metamask.png";

export default function ConfirmationPageReal1({ setProceedTo }) {
  return (
    <div className="confirmationPageReal1">
      <div className="cpr1-navbar">
        -------------- Navbar comes here -----------------
      </div>
      <div className="cpr1-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M39.273 24C39.273 22.9874 38.8707 22.0162 38.1547 21.3001C37.4386 20.5841 36.4675 20.1818 35.4548 20.1818H29.0912C29.0912 21.532 28.5548 22.8269 27.6001 23.7816C26.6454 24.7364 25.3505 25.2727 24.0003 25.2727C22.6501 25.2727 21.3552 24.7364 20.4004 23.7816C19.4457 22.8269 18.9094 21.532 18.9094 20.1818H12.5457C11.5331 20.1818 10.5619 20.5841 9.84586 21.3001C9.12981 22.0162 8.72754 22.9874 8.72754 24M39.273 24V34.1818C39.273 35.1945 38.8707 36.1656 38.1547 36.8817C37.4386 37.5977 36.4675 38 35.4548 38H12.5457C11.5331 38 10.5619 37.5977 9.84586 36.8817C9.12981 36.1656 8.72754 35.1945 8.72754 34.1818V24M39.273 24V18.9091M8.72754 24V18.9091M39.273 18.9091C39.273 17.8964 38.8707 16.9253 38.1547 16.2092C37.4386 15.4932 36.4675 15.0909 35.4548 15.0909H12.5457C11.5331 15.0909 10.5619 15.4932 9.84586 16.2092C9.12981 16.9253 8.72754 17.8964 8.72754 18.9091M39.273 18.9091V13.8182C39.273 12.8055 38.8707 11.8344 38.1547 11.1183C37.4386 10.4023 36.4675 10 35.4548 10H12.5457C11.5331 10 10.5619 10.4023 9.84586 11.1183C9.12981 11.8344 8.72754 12.8055 8.72754 13.8182V18.9091"
            stroke="#5293FF"
            stroke-width="2.54545"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="cpr1-content">
        <div className="text" style={{ textAlign: "center" }}>
          Link your web3 wallet to your verified <br></br> phone number for
          effortless transactions
        </div>
        <div className="sub-text">
          This is the wallet from which crypto will be sent or received{" "}
          <br></br> when someone uses your verified number for transactions
        </div>
      </div>
      <div className="cpr1-input">
        <div className="cpr1-btn1">
          <button
            className="btn-1"
            onClick={() => {
              setProceedTo("mintProgress");
            }}
          >
            <img
              src={metaMaskLogo}
              width={30}
              style={{ width: "2vw" }}
              alt="logo"
            ></img>
            &nbsp;&nbsp;
            <span style={{ verticalAlign: 27 }}>
              Connect your metamask wallet
            </span>
          </button>
        </div>
        <div className="separation">
          <hr className="hr-line"></hr>
          <span>OR</span>
          <hr className="hr-line"></hr>
        </div>
        <div className="cpr1-btn-text">Don’t have a web3 wallet?</div>
        <div className="cpr1-btn2">
          <button className="btn-1">
            Create Your Wallet with a Single Click
          </button>
        </div>
      </div>
    </div>
  );
}
