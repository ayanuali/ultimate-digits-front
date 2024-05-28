import React, { useState, useEffect } from "react";
import "./ConfirmationPageReal.css";
import metaMaskLogo from "../../assets/Metamask.png";
import OR from "../../assets/OR.png";
import { ethers } from "ethers";
import config from "../../config.json";
import conABI from "../../abi/abi1.json";
import sponsor from "../../assets/home-page/sponsors.svg";
import { useNavigate } from "react-router-dom";
import { useWalletContext, useEVMAddress } from "@coinbase/waas-sdk-web-react";
import { v4 as uuidv4 } from "uuid";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { getAccount } from '@wagmi/core'
import { Connector, useConnect } from 'wagmi'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { createConfig, http } from '@wagmi/core'
import {  sepolia, bscTestnet } from '@wagmi/core/chains'

const configg = createConfig({
  chains: [bscTestnet, sepolia],
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.bnbchain.org:8545'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})

export default function ConfirmationPageRealRename({
  setCode,
  setwaddress,
  setsigner,
  setContract_connect,
  setNumber,
}) {
  //declaring variables
  const navigate = useNavigate();
  const { address } = useAccount()

  const { waas, user, isLoggingIn, wallet, isCreatingWallet } =
    useWalletContext();
    const account = getAccount(configg)
    const { connectors, connect } = useConnect()

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();

  const [error, setError] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const [uuidval, setUuidval] = useState("");






  const naddress = useEVMAddress(wallet);
  

  const handleLogin = () => {
console.log("connecting scw", account,openConnectModal)
  }


  useEffect(()=>{
console.log(account)


if(address)
  navigate("/selection-page")



  },[account])







  return (
    <div className="confirmationPageReal1" style={{ marginTop: "-2.4rem" }}>
      <div className="cpr1-icon" style={{ marginBottom: "1.6rem" }}>
        <svg
          width="144"
          height="48"
          viewBox="0 0 144 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75 19L80 24M80 24L75 29M80 24H56"
            stroke="#5293FF"
            stroke-width="2.55"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.75 8.25H18.375C17.4799 8.25 16.6215 8.60558 15.9885 9.23851C15.3556 9.87145 15 10.7299 15 11.625V36.375C15 37.2701 15.3556 38.1285 15.9885 38.7615C16.6215 39.3944 17.4799 39.75 18.375 39.75H29.625C30.5201 39.75 31.3785 39.3944 32.0115 38.7615C32.6444 38.1285 33 37.2701 33 36.375V11.625C33 10.7299 32.6444 9.87145 32.0115 9.23851C31.3785 8.60558 30.5201 8.25 29.625 8.25H26.25M21.75 8.25V10.5H26.25V8.25M21.75 8.25H26.25M21.75 36.375H26.25"
            stroke="#5293FF"
            stroke-width="2.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M135.272 24C135.272 22.9874 134.87 22.0162 134.154 21.3001C133.438 20.5841 132.466 20.1818 131.454 20.1818H125.09C125.09 21.532 124.554 22.8269 123.599 23.7816C122.644 24.7364 121.349 25.2727 119.999 25.2727C118.649 25.2727 117.354 24.7364 116.399 23.7816C115.445 22.8269 114.908 21.532 114.908 20.1818H108.545C107.532 20.1818 106.561 20.5841 105.845 21.3001C105.129 22.0162 104.727 22.9874 104.727 24M135.272 24V34.1818C135.272 35.1945 134.87 36.1656 134.154 36.8817C133.438 37.5977 132.466 38 131.454 38H108.545C107.532 38 106.561 37.5977 105.845 36.8817C105.129 36.1656 104.727 35.1945 104.727 34.1818V24M135.272 24V18.9091M104.727 24V18.9091M135.272 18.9091C135.272 17.8964 134.87 16.9253 134.154 16.2092C133.438 15.4932 132.466 15.0909 131.454 15.0909H108.545C107.532 15.0909 106.561 15.4932 105.845 16.2092C105.129 16.9253 104.727 17.8964 104.727 18.9091M135.272 18.9091V13.8182C135.272 12.8055 134.87 11.8344 134.154 11.1183C133.438 10.4023 132.466 10 131.454 10H108.545C107.532 10 106.561 10.4023 105.845 11.1183C105.129 11.8344 104.727 12.8055 104.727 13.8182V18.9091"
            stroke="#5293FF"
            stroke-width="2.54545"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="cpr1-content">
        {error ? (
          <div
            className="text"
            style={{ textAlign: "center", color: "yellow" }}
          >
            Join Now to Attach a Number
          </div>
        ) : (
          ""
        )}
        <div className="text" style={{ textAlign: "center" }}>
          Link your web3 wallet to your <br></br> verified phone number for{" "}
          <br></br> effortless transactions
        </div>
      </div>
      <div className="cpr1-input">
        <div
          className="cpr1-btn1"
          style={{ marginTop: "2rem", marginBottom: "-0.4rem" }}
        >
{/* { connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))} */}
  
       {/* <button className="btn-1" onClick={openConnectModal}>
            <img
              src={metaMaskLogo}
              style={{ width: "30px", marginTop: "4px" }}
              alt="logo"
            ></img>
            &nbsp;&nbsp;
            <span style={{ verticalAlign: 29 }}>
              Connect your metamask wallet
            </span>
          </button> */}


          <div>
            <ConnectButton />
          </div>
  {/* {!openConnectModal &&         <button className="btn-1" onClick={openConnectModal}>
            <img
              src={metaMaskLogo}
              style={{ width: "30px", marginTop: "4px" }}
              alt="logo"
            ></img>
            &nbsp;&nbsp;
            <span style={{ verticalAlign: 29 }}>
             Connected
            </span>
          </button>} */}
        </div>
        <div className="separation">
          <div className="emailInputBottomLine">
            <div />
            OR
            <div />
          </div>
        </div>
        <br />
        <br />
        <div
          className="cpr1-btn-text"
          style={{ marginTop: "-3rem", marginBottom: "1rem" }}
        >
          Don’t have a web3 wallet?
        </div>
        <div className="cpr1-btn2">
          <button className="btn-1" onClick={handleLogin}>
            Continue With Ultimate Wallet
          </button>
        </div>
      </div>
      <div className="sponsors">
        <div
          className="sponsor-text"
          style={{
            color: "#D8E4FD",
            letterSpacing: "5px",
            wordSpacing: "3px",
            marginTop: "-1.6rem",
          }}
        >
          WALLET SUPPORT COMING SOON
        </div>
        <div style={{ textAlign: "center" }}>
          <img
            src={sponsor}
            alt="img"
            style={{ width: "50rem", textAlign: "center" }}
          ></img>
        </div>
      </div>

      <>
      {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )}
    </>
      <div className="cpr1-footer">
        <div className="copyright">&copy; Ultimate Digits 2024.</div>
      </div>
    </div>
  );
}
