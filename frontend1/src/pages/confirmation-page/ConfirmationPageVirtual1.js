import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import "./ConfirmationPageVirtual1.css";
// import nftLogo from "../../assets/ud-logo.png";
// import {address_NFT,abi_NFT} from "../../../../abi/Nft.js";
import "../auth-page/components/login-form/FullScreenLoader.css";
import { address_NFT, abi_NFT } from "../../abi/Nft.js";
import nftLogo from "../../assets/ud-logo.png";
import { UserContext } from "../../Hook.js";
import { useNavigate } from "react-router-dom";
import { useWriteContract } from "wagmi";
import { toViem } from "@coinbase/waas-sdk-viem";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import config from "../../config.json";
import {
  createPublicClient,
  http,
  getContract,
  createWalletClient,
} from "viem";
import { bscTestnet, sepolia } from "viem/chains";
import {
  getAccount,
  readContract,
  writeContract,
  switchChain,
} from "@wagmi/core";
import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "@wagmi/core";


import { connectConfig } from "../../ConnectKit/Web3Provider.jsx";
import axios from "axios";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { waitForTransactionReceipt, sendTransaction } from "@wagmi/core";
import FullScreenLoader from "../auth-page/components/login-form/FullScreenLoader.js";
import TwitterShareButton from "./twitter.jsx";

export default function ConfirmationPageVirtual1({
  setProceedTo,
  number,
  signer,
  contract_connect,
  cartArray,
}) {
  const { user, wallet } = useWalletContext();

  const userr = useSelector((state) => state.user);
  console.log(userr, "before redux");

  // Get the query parameter string
  const queryString = window.location.search;
  const navigate = useNavigate();
  const info = useContext(UserContext);
  const { tokenId, setTokenId } = info;
  const [add, setadd] = useState("");
  const [tid, settid] = useState("");
  const [nftMinted, setNftMinted] = useState(false);
  const [balanceVal, setBalanceVal] = useState(0);

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("Loading.....")

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");
  console.log(cartParam);
  console.log(typeof cartParam);
  const flag = 0;

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.RPC_URL),
  });

  const account = getAccount(connectConfig);


  const getingBalance = async () => {
    const balance = await getBalance(connectConfig, {
      address: userr.address,
    });
    console.log("blance", balance);
    console.log("val", balance.formatted);
    setBalanceVal(balance.formatted);
    console.log("sy,", balance.symbol);
    console.log("value", balance.value);
  };


  useEffect(() => {
    getingBalance();
  }, []);


  const handleBack = () => {
    navigate("/")
  }


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="confirmationPageVirtual1">
        <div className="cpv1-nft">
          <div className="nft-logo">
            <img
              src={nftLogo}
              alt="image"
              width={120}
              style={{ width: "10rem" }}
            ></img>
            <div className="nft-number" style={{ color: "white" }}>
              {`+999 DEGEN ${cartArray}`}
            </div>
          </div>
        </div>
     
        {nftMinted && (
          <div className="cpv2-btn2" style={{ margin: "4 rem" }}>
            <button disabled>NFT Generated</button>
          </div>
        )}
        <div className="row-token">
          <h5 style={{ color: "white" }}>{add}</h5>
          <h5 style={{ color: "white" }}>{tid}</h5>
        </div>
        <div className="cpv1-content" style={{ marginTop: "3rem" }}>
          <div className="text">Purchase successful</div>
          <div className="sub-text">
            Congratulations! Your have successfully purchased a <br></br> DEGEN web3
            phone number.
          </div>
        </div>
        {/* <div className="cpv2-btn" style={{ marginTop: "-1.8rem" }}>
        { !nftMinted &&   <button  disabled style={{"background":"#f2f2f2", "color": "#a9a9a9", "cursor": "not-allowed"}}
            // onClick={async () => {
            //   PerformAction();
            //   // await NFT_Gen()
            // }}
          >
            Mint then Link your number to a wallet
          </button>}
         { nftMinted && <button 
            onClick={async () => {
              PerformAction();
              // await NFT_Gen()
            }}
          >
            Link your number to a wallet
          </button>}
        </div> */}

        <ToastContainer />


     
          {/* <div className="cpv2-btn" style={{ margin: "4 rem" }}>
            <button
           
            >
Flaunt on X to win additional rewards            </button>
          </div> */}


<TwitterShareButton
text="OMG! Just got my first Ethereum mobile number by @ultimatedigits on @degentokenbase. Tip me $DEGEN to my digits!"
url=""
hashtags={['DEGEN', 'ethereum']}
/>



          <div className="cpv2-btn" style={{ margin: "4 rem" }}>
            <button onClick={handleBack}
           
            >
Mint more      
</button>
    </div>
        

        {/* <FullScreenLoader loading={loading} content={content} /> */}

      </div>
    </div>
  );
}
