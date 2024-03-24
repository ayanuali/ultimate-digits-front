import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import "./ConfirmationPageVirtual1.css";
// import nftLogo from "../../assets/ud-logo.png";
// import {address_NFT,abi_NFT} from "../../../../abi/Nft.js";
import { address_NFT, abi_NFT } from "../../abi/Nft.js";
import nftLogo from "../../assets/ud-logo.png";
import { UserContext } from "../../Hook.js";
import { useNavigate } from "react-router-dom";
import { useWriteContract } from "wagmi";
import { toViem } from "@coinbase/waas-sdk-viem";

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

import { connectConfig } from "../../ConnectKit/Web3Provider.jsx";
import axios from "axios";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { waitForTransactionReceipt, sendTransaction } from "@wagmi/core";

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

  async function NFT_Gen() {
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0xAA36A7' }], // chainId must be in hexadecimal numbers
    // });

    const contract = getContract({
      address: address_NFT,
      abi: abi_NFT,
      // 1a. Insert a single client
      client: publicClient,
    });

    try {
      await switchChain(connectConfig, { chainId: sepolia.id });

      // const writeTransactionConfig = {
      //   ...connectConfig,
      //   chains: [sepolia], // Use the Sepolia chain for the write transaction
      // };

      const transaction = async () => {
        if (userr.rootId === "ncw") {
          await writeContract(connectConfig, {
            abi: contract.abi,
            address: contract.address,
            functionName: "mint",
            args: [
              "https://gateway.pinata.cloud/ipfs/QmT9CDDA13KzXHVenpw5njnJt7bVnuMQP63jJ6Ujwt6RHb",
            ],
          });
        } else {
          console.log("user", user);
          console.log("wallet", wallet);
          const address = await wallet.addresses.for(ProtocolFamily.EVM);
          console.log("address", address);

          const walletClient = createWalletClient({
            account: toViem(address),
            chain: bscTestnet,
            transport: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
          });
          console.log("walletClient", walletClient);
          const hash = await walletClient.writeContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "mint",
            args: [
              "https://gateway.pinata.cloud/ipfs/QmT9CDDA13KzXHVenpw5njnJt7bVnuMQP63jJ6Ujwt6RHb",
            ],
          });
          console.log("hash", hash);
        }
      };
      await transaction();

      console.log("minting called");

      // const readTransactionConfig = {
      //   ...connectConfig,
      //   chains: [sepolia], // Use the Sepolia chain for the read transaction
      // };

      const number = await readContract(connectConfig, {
        abi: abi_NFT,
        address: address_NFT,
        functionName: "getTokenCounter",
      });

      console.log("tokenCounter:", number);
      setTokenId(parseInt(number));
      setadd(`Address : ${address_NFT}`);
      settid(`TokenId : ${parseInt(number)}`);
      console.log(parseInt(number) + " the nft minting number ");
      // if (transaction) {
      // } else {
      //   console.log("Your transaction didn't get through");
      // }
    } catch (error) {
      console.error("Error processing NFT_gen:", error);
    }
  }

  //NFT Generation
  // async function NFT_en() {
  //   await window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: '0xAA36A7' }], // chainId must be in hexadecimal numbers
  //   });
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   //   console.log(provider);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = await provider.getSigner();
  //   const contract = new ethers.Contract(address_NFT, abi_NFT, signer);
  //   console.log(provider)
  //   console.log(signer)
  //   const transaction = await contract.mint("https://gateway.pinata.cloud/ipfs/QmT9CDDA13KzXHVenpw5njnJt7bVnuMQP63jJ6Ujwt6RHb")
  //   transaction.wait().then((res) => {
  //     console.log(res)
  //   });
  //   const number = await contract.getTokenCounter()
  //   setTokenId(parseInt(number));
  //   setadd(`Address : ${address_NFT}`)
  //   settid(`TokenId : ${parseInt(number)}`)
  //   console.log(parseInt(number) + " the nft minting number ")
  // }

  async function PerformAction() {
    // Your action here
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
    // })
    await switchChain(connectConfig, { chainId: bscTestnet.id });
    var check = 0;
    console.log(contract_connect);

    // const hash = await walletClient.writeContract({
    //      address: contract_connect.address,
    //      abi: contract_connect.abi,
    //      functionName: 'SettingUniqueId',
    //      args: [number, "999"],
    //    })

    cartArray.map(async (number, i) => {
      console.log("UID creation");
      var transaction = async () => {
        if (userr.rootId === "ncw") {
          await writeContract(connectConfig, {
            abi: contract_connect.abi,
            address: contract_connect.address,
            functionName: "SettingUniqueId",
            args: [number, "999"],
          });
        } else {
          console.log("user", user);
          console.log("wallet", wallet);
          const address = await wallet.addresses.for(ProtocolFamily.EVM);
          console.log("address", address);

          const walletClient = createWalletClient({
            account: toViem(address),
            chain: bscTestnet,
            transport: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
          });
          console.log("walletClient", walletClient);
          const hash = await walletClient.writeContract({
            address: contract_connect.address,
            abi: contract_connect.abi,
            functionName: "SettingUniqueId",
            args: [number, "999"],
          });
          console.log("hash", hash);
        }
      };
      await transaction();
      console.log("user", userr);

      console.log("settingUIDtransaction got through");
      check++;
      console.log(check);

      try {
        const res = await axios.post(
          "http://localhost:8080/coinbase/map-phno",
          {
            phoneNumber: number,
            address: userr.address,
            countryCode: "999",
            rootId: "ncw",
            type: "virtual",
          }
        );

        if (res.status === 200 || res.status === 201) {
          console.log("Mapping successful");

          if (check === cartArray.length) {
            navigate(
              `/selection-page/my-numbers/confirm-page?number=${number}`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }

      // if (transaction) {

      // } else {
      //   console.error("error");
      //   console.log("another transaction didn't get through");
      // }
    });
    console.log(cartArray.length);
  }

  async function PerfomAction() {
    // Your action here
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }], // chainId must be in hexadecimal numbers
    });
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
            onClick={async () => {
              // PerformAction();
              await NFT_Gen();
            }}
          >
            Generate NFT
          </button>
        </div>
        <div className="row-token">
          <h5 style={{ color: "white" }}>{add}</h5>
          <h5 style={{ color: "white" }}>{tid}</h5>
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
            onClick={async () => {
              PerformAction();
              // await NFT_Gen()
            }}
          >
            Link your number to a wallet
          </button>
        </div>
      </div>
    </div>
  );
}
