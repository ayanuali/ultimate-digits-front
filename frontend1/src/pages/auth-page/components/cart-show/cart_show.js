import { ethers } from "ethers";
import React from "react";
import { useContext, useState } from "react";
import { Web3Storage } from "web3.storage";
import { UserContext } from "../../../../Hook.js";
import { abi_NFT, address_NFT } from "../../../../abi/Nft.js";
import conABI from "../../../../abi/abi.json";
import config from "../../../../config.json";
import checkTotalPrice from "../../../../functions/checkTotalPrice";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox_show";
import LoadPage from "../../../../utils/loaders/LoadPage";
import "./cart_show.css";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http, parseEther } from "viem";
import { baseSepolia, bscTestnet, sepolia } from "viem/chains";
import { Address } from "@coinbase/waas-sdk-web";
import { connectConfig } from "../../../../ConnectKit/Web3Provider.jsx";
import { CommonButton } from "../../../../ConnectKit/CommonConnectKitButton.js";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import "../login-form/FullScreenLoader.css"
import { useSelector } from "react-redux";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
// import {
//   useSendTransaction,
//   useWaitForTransactionReceipt
// } from 'wagmi';
import {
  getAccount,
  waitForTransactionReceipt,
  sendTransaction,
} from "@wagmi/core";
import { parseUnits } from "viem";
import { getContract, createPublicClient, custom } from "viem";
import FullScreenLoader from "../login-form/FullScreenLoader.js";
import { mint, multipleMint } from "../../../../blockchain/integration.js";
import { Await } from "react-router-dom";
import axios from "axios";
import { toast , ToastContainer} from "react-toastify";

function CartShow({
  cartArray,
  setProceedTo,
  setcartArray,
  contract_connect,
  setContract_connect,
  signer,
  number,
  walletaddress,
  setwalletaddress,
  setcontract,
}) {
  const { user, wallet } = useWalletContext();

  const userr = useSelector((state) => state.user);
  console.log(userr, "before redux");
  //initializing and declaring various variables
  const [cart, setCart] = useState([]);
  const { flag1, setflag1 } = React.useContext(UserContext);
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");
  // const [tokenId,setTokenId]=useState("");
  const { tokenId, setTokenId } = React.useContext(UserContext);
  console.log(tokenId);
  const data = {
    address: walletaddress,
    number: number,
    "contract'address": config.address_nft,
  };
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const i = 0;

  const publicClient = createPublicClient({
    chain: bscTestnet,
    transport: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
  });

  // const { sendTransaction } = useSendTransaction();

  // const handleTransactionReceipt = async (receipt) => {
  //   if (receipt) {
  //     console.log("Transaction receipt:", receipt);
  //     // Set up contract
  //     const contract = getContract({
  //       address: config.address_nft,
  //       abi: conABI,
  //       client: publicClient,
  //     });

  //     if (contract) {
  //       setcontract(contract);
  //       console.log("Contract set-up done:", contract);
  //       console.log("Wallet address:", account.address);
  //       setwalletaddress(account.address);
  //       setLoad(false);
  //       setProceedTo("purchaseConfirmation");
  //     }
  //   }
  // };
  const account = getAccount(connectConfig);


  console.log("aefefdsfcadsfasf",queryParam)


  async function uploadJSONToPinata(jsonData) {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const headers = {
      "Content-Type": "application/json",
      pinata_api_key: "66b871c91c1137d97b82",
      pinata_secret_api_key:
        "71ad43206bd6b413d1bdcb0d839e3cc52f09591f1940e7bddefc4fe1947d335f",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonData),
    });
  
    if (!response.ok) {
      throw new Error(`IPFS pinning error: ${response.statusText}`);
    }

    console.log(response);

    const Injson = await response.json();

    console.log("Vwefasfasd",Injson)

        //    const res = await mint({uri:Injson.Injson})
        // console.log("mint",res)

  
    return Injson.IpfsHash;
  }


  async function buyNumber() {
    setLoad(true);
console.log("arry",cartArray)

    // const json = {
    //   "name":"Ultimate Digits X Degen",
    //   "description":" This is a ITU-compliant, 10-digit, limited-edition DEGEN mobile number on Base and Ethereum. To learn more, visit www.ultimatedigits.com",
    //   "image":"https://gateway.pinata.cloud/ipfs/QmaTtKUBUhcuNXwcy9WYo4dmdndh6Z6a7aHwXLcMv78RTW",
    //   "attributes": [
    //     {
    //       "color": "Blue",
    //       "value": number
    //     }
    //   ],
    // }

    try {
      const responses = await Promise.all(cartArray.map(async (number) => {
        const json = {
          "name":"Ultimate Digits Degen Mobile Number",
          "description":" This is a ITU-compliant, 10-digit, limited-edition DEGEN mobile number on Base and Ethereum. To learn more, visit www.ultimatedigits.com",
          "image":"https://gateway.pinata.cloud/ipfs/QmaTtKUBUhcuNXwcy9WYo4dmdndh6Z6a7aHwXLcMv78RTW",
          "attributes": [
            {
              "color": "Blue",
              "value": "33436" + number
            }
          ],
        }
        return await uploadJSONToPinata(json);
      }));
      console.log("responses", responses);

      try {
        const resp = await multipleMint({uri:responses});
        console.log("resp",resp.hash);
        localStorage.setItem("link",resp.hash)
        setLoad(false)
      } catch (error) {
        setLoad(false)
  
        toast.warn("Check network and Balance")

        console.log("error",error)

        return

      }

      try {
        const res = await axios.post('https://degen-backend.vercel.app/degen/setMintedBulk',{
          numbers:cartArray
        })

        console.log("resdss",res)

        if(res.status === 200 || res.status === 201){
          setProceedTo("purchaseConfirmation")
          setLoad(false);
        }
      } catch (error) {
        toast("number already bought")
        setLoad(false);
        console.log("eriir",error)
      }

    
      
      
    } catch (error) {
      console.log("error",error)
      setLoad(false);
      return;
    }

 

  }

  //funcion to ensure virtual number purchase
  //funcion to ensure virtual number purchase

  return cartArray.length != 0 ? (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="cart_show">
          <div className="searchResultsTable2">
            {/* Similar numbers */}
            {/* dropdown */}
            {/* numbers boxes */}
            <div className="searchResultsTableCol2">
              {cartArray.map(
                (number, i, ava) =>
                  queryParam !== number && (
                    <div className="each">
                      <PhoneNumberBox
                        number={number}
                        cart={cart}
                        setCart={setCart}
                        showAvailability={true}
                        available={true}
                        contract_connect={contract_connect}
                        signer={signer}
                        cartArray={cartArray}
                        setcartArray={setcartArray}
                        setContract_connect={setContract_connect}
                        setProceedTo={setProceedTo}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
          <button
            className="cartCheckout"
            onClick={async () => {
              // await NFT_Gen();
              buyNumber();
            }}
          >
            Complete my Purchase
          </button>
          <p style={{ color: "white" }}>
            Please do NOT click ANY button on Ultimate Digits while your
            transaction is being completed
          </p>
          {error ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vh",
                color: "white",
                fontSize: "large",
              }}
            >
              Insufficient Balance
            </p>
          ) : (
            false
          )}
          {load ? (
          <FullScreenLoader loading={load} content={"Completing Purchase"} />
          ) : (
            false
          )}
        </div>
      </div>
      <ToastContainer />

    </div>

  ) : (
    ""
  );
}
export default CartShow;
