import React, { useState, useContext, useEffect } from "react";
import "./ConfirmationPageVirtual1.css";

import "../auth-page/components/login-form/FullScreenLoader.css";
import nftLogo from "../../assets/ud-logo.png";
import { UserContext } from "../../Hook.js";
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import LinkIcon from "../../assets/assets/linkicon.png"
import { ToastContainer, toast } from 'react-toastify';

import {
  createPublicClient,
  http,
  getContract,
  createWalletClient,
} from "viem";
import { bscTestnet, sepolia } from "viem/chains";

import { useSelector } from "react-redux";



import TwitterShareButton from "./twitter.jsx";

export default function ConfirmationPageVirtual1({
  setProceedTo,
  number,
  signer,
  contract_connect,
  cartArray,
}) {

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


  const [link, setLink] = useState("");

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");
  console.log(cartParam);
  console.log(typeof cartParam);






  const getingBalance = async () => {
 
  };


  useEffect(() => {
    getingBalance();
    const asd = localStorage.getItem("link");
    setLink(asd);
  }, []);






  useEffect(() => {
    // This function intercepts the back navigation by replacing it with the desired path
    const handleBackNavigation = () => {
        // Using navigate with replace:true to avoid adding new entries to the history stack
        navigate('/', { replace: true });
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
        window.removeEventListener('popstate', handleBackNavigation);
    };
}, [navigate]);



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div className="confirmationPageVirtual1">
        <div>
     <div style={{display:"flex", gap:"20px"}} >

     {
          cartArray.map((val,index)=>(
            <div  className="cpv1-nft" >
            <div className="nft-logo" key={index}>
            <img
              src={nftLogo}
              alt="image"
              width={120}
              style={{ width: "10rem" }}
            ></img>
            <div className="nft-number" style={{ color: "white" }}>
           <b>   {`+999 AVAX ${val}`} </b>
            </div>
          </div>
          </div>
          ))
         }
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
        <div className="cpv1-content" style={{ marginTop: "1rem" }}>
          <div className="text">Purchase successful</div>
          <div className="sub-text">
            Congratulations! You have successfully purchased a <br></br> AVAX web3
            phone number.
          </div>
        </div>
   

        <ToastContainer />


     


<TwitterShareButton
text="LFG! Just got my first Ethereum mobile number by @ultimatedigits on @avax for free! Get yours today 👉🏻 "
url="https://unicorn.ultimatedigits.com"
hashtags={[ '']}
/>



          {/* <div className="cpv2-btn" style={{ margin: "4 rem" }}>
            <button onClick={handleBack}
           
            >
Mint more      
</button>


    </div> */}
<a href={`https://avascan.info/blockchain/c/tx/${link}`} target="_blank">
    <div style={{marginTop:"20px", display:"flex", justifyContent:"center", alignItems:"flex-end", gap:"5px"}}>


<div style={{color:"#D8E4FD", fontSize:"12px", textDecoration:"underline" , display:"flex", justifyContent:"center", alignItems:"center"}}>View Transaction
</div>  

<div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
  <img src={LinkIcon} alt="link" />
  </div> 



 </div>
 </a>
 <div className="cpv1-content1" style={{ marginTop: "1rem" }}>
          <div className="text">       Congratulations!</div>
          <div className="sub-text">
      You are Eligible for an airdrop of $U2U as well as $ULT tokens <br></br>
            
          
          </div>
          <div className="sub-text">
            
          
         <span>   Visit <a style={{color:"white"}} href="https://airdrop.ultimatedigits.com/" target="_blank">airdrop.ultimatedigits.com</a> to claim!</span>
          </div>
        </div>

        {/* <FullScreenLoader loading={loading} content={content} /> */}

      </div>
    </div>
  );
}
