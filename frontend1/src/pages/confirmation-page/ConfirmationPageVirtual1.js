import React, { useState,useContext } from "react";
import { ethers } from "ethers";
import "./ConfirmationPageVirtual1.css";
// import nftLogo from "../../assets/ud-logo.png";
// import {address_NFT,abi_NFT} from "../../../../abi/Nft.js";
import {address_NFT,abi_NFT} from "../../abi/Nft.js";
import nftLogo from "../../assets/ud-logo.png";
import { UserContext } from "../../Hook.js";
import { useNavigate } from "react-router-dom";
export default function ConfirmationPageVirtual1({
  setProceedTo,
  number,
  signer,
  contract_connect,
  cartArray,
}) {
  // Get the query parameter string
  const queryString = window.location.search;
  const navigate = useNavigate();
  const info=useContext(UserContext);
  const {tokenId,setTokenId}=info;
  const [add,setadd]=useState('')
  const [tid,settid]=useState('')
  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");
  console.log(cartParam);
  console.log(typeof cartParam);
  const flag=0;
  //NFT Generation
  async function NFT_Gen()
      {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xAA36A7' }], // chainId must be in hexadecimal numbers
        });
      const provider = new ethers.BrowserProvider(window.ethereum);
      //   console.log(provider);
      await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(address_NFT, abi_NFT, signer);
            console.log(provider)
            console.log(signer)
            const transaction = await contract.mint("https://gateway.pinata.cloud/ipfs/QmT9CDDA13KzXHVenpw5njnJt7bVnuMQP63jJ6Ujwt6RHb")
              transaction.wait().then((res) => {
                console.log(res)
              });
            const number=await contract.getTokenCounter()
            setTokenId(parseInt(number));
            setadd(`Address : ${address_NFT}`)
                settid(`TokenId : ${parseInt(number)}`)
            console.log(parseInt(number)+" the nft minting number ")
      }

  async function PerformAction() {
    // Your action here

    var check = 0;
    console.log(contract_connect);
    cartArray.map(async (number, i) => {
      var transaction = await contract_connect.SettingUniqueId(number, "999");
      transaction
        .wait()
        .then((res) => {
          console.log(res);

          check++;
          console.log(check);
          if (check == cartArray.length) {
            navigate(
              `/selection-page/my-numbers/confirm-page?number=${number}`
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
    console.log(cartArray.length);
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
              {`+999 ${cartArray}`}
            </div>
          </div>
        </div>
        <div className="cpv2-btn" style={{ margin: "4 rem" }}>
          <button
            onClick={async() => {
              {
                // PerformAction();
                await NFT_Gen()
              }
            }}
          >
            Generate NFT
          </button>
        </div>
        <div className="row-token">
        <h5 style={{color:"white"}}>{add}</h5>
            <h5 style={{color:"white"}}>{tid}</h5>
            </div>
        <div className="cpv1-content" style={{ marginTop: "3rem" }}>
          <div className="text">Purchase successful</div>
          <div className="sub-text">
            Congratulations! Your have successfully purchased a <br></br> web3
            phone number.
          </div>
        </div>
        <div className="cpv2-btn" style={{ marginTop: "-1.8rem" }}>
          <button
            onClick={async() => {
              {
                PerformAction();
                // await NFT_Gen()
              }
            }}
          >
            Link your number to a wallet
          </button>
        </div>
      </div>
    </div>
  );
}
