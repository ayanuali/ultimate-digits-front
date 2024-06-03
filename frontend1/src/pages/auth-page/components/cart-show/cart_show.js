import { ethers } from "ethers";
import React from "react";
import { useContext, useState } from "react";
import { Web3Storage } from "web3.storage";
import { UserContext } from "../../../../Hook.js";
import { abi_NFT, address_NFT } from "../../../../abi/Nft.js";
import conABI from "../../../../abi/abi.json";
import config from "../../../../config.json";

import { useEVMAddress } from "@coinbase/waas-sdk-web-react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { useSendTransaction } from "wagmi";
import checkTotalPrice from "../../../../functions/checkTotalPrice";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox_show";
import LoadPage from "../../../../utils/loaders/LoadPage";
import "./cart_show.css";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount, signTransaction } from "viem/accounts";
import { baseSepolia, bscTestnet, sepolia } from "viem/chains";
import { Address } from "@coinbase/waas-sdk-web";
import { connectConfig } from "../../../../ConnectKit/Web3Provider.jsx";
import { CommonButton } from "../../../../ConnectKit/CommonConnectKitButton.js";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import "../login-form/FullScreenLoader.css";
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
  prepareTransactionRequest,
} from "@wagmi/core";
import { parseUnits } from "viem";
import { getContract, createPublicClient, custom } from "viem";
import FullScreenLoader from "../login-form/FullScreenLoader.js";
import { toast, ToastContainer } from "react-toastify";
import Wallet from "../../../ultimate-wallet/wallet.jsx";
import WalletAf from "../../../ultimate-wallet/wallet1.jsx";

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

  const addressNew = useEVMAddress(wallet);
  // let history = useHistory();
  // const {
  //   data: hash,
  //   sendTransaction,
  //   isSuccess,
  //   isPending,
  // } = useSendTransaction();
  const userr = useSelector((state) => state.user);
  console.log(userr, "before redux");
  //initializing and declaring various variables
  const [cart, setCart] = useState([]);
  const { flag1, setflag1 } = React.useContext(UserContext);
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");
  const [noBalance, setNoBalance] = useState(false);
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
    chain: baseSepolia,
    transport: http(),
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
  const navigate = useNavigate();

  async function buyNumber() {
    setLoad(true);
    // Send to which address?
    const toaddress = "0x8c22767417E7B21C4D535478F6fB65F29EbE5ae4";
    var amount;

    try {
      // Calculate transaction amount
      amount = flag1
        ? (parseInt(checkTotalPrice(cartArray)) - 5) * 0.0046790195017
        : parseInt(checkTotalPrice(cartArray)) * 0.0046790195017;
      setflag1("0");

      // Convert amount to Wei
      const someAmt = parseInt(0.0046790195017 * 10);
      const amt = parseEther(someAmt.toString());
      console.log("AMT:", amt);

      // Call sendTransaction
      if (amt !== 0) {
        // Call sendTransaction
        console.log("transaction sending started");
        if (userr.rootId === "ncw") {
          try {
            console.log("guess here;s the problem");
            // const { hash } = await sendTransaction(connectConfig, {
            //   account: account.address,
            //   to: toaddress,
            //   value: amt,
            // });

            // console.log("Transaction hash:", hash);

            const request = await prepareTransactionRequest(connectConfig, {
              account,
              to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
              value: ethers.parseEther("0.000000000000001"),
            });
            console.log("Transaction hash:", request);

            // const signature = await signTransaction(connectConfig, {
            //   account,
            //   to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
            //   value: ethers.parseEther("0.000000000000001"),
            // });

            // console.log("sign", signature);

            // const send = await sendTransaction(connectConfig, {
            //   account,
            //   to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
            //   value: ethers.parseEther("0.000000000000001"),
            // });
            // console.log(send);

            const to = "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540";
            const value = "0.000000000000001";

            // await  sendTransaction({ to, value: amt });
            //   if (isPending) {
            //     setTimeout(2000000);
            //   }

            //   if (isSuccess) {
            //     setTimeout(100000);
            //   }

            const res = await sendTransaction(connectConfig, {
              to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
              value: parseEther("0.000001"),
            });
            // setLoad(false);
          } catch (error) {
            console.log("asfasfasfsafasf", error);
            setLoad(false);
            return;
          }

          // Wait for transaction receipt using the callback function
          // const receipt = async () => {

          //   await waitForTransactionReceipt(connectConfig, {
          //     hash,
          //     // You can add other options like confirmations, onReplaced, etc. if needed
          //   });
          // }
          // const txReceipt = await receipt();
        } else {
          console.log("address", userr.address);
          console.log("user", user);
          console.log("wallet", wallet);
          const address = await wallet.addresses.for(ProtocolFamily.EVM);
          console.log("address", address);
          const add = JSON.parse(localStorage.getItem("address"));
          console.log("address", add);
          const walletClient = createWalletClient({
            account: toViem(address),
            chain: baseSepolia,
            transport: http(),
          });
          console.log("walletClient", walletClient);
          console.log(
            "signing a message with address " + userr.address + "..."
          );
          const signature = await walletClient.signMessage({
            message: "hello from waas!",
          });
          console.log(`Got signature: ${signature}`);
          console.log("full address", userr.fulladdress);
          // console.log("full address", toViem(userr.fulladdress));
          console.log("full address from wallet ", toViem(address));

          console.log("issue guess 1:");

          console.log("moments before desctruction", amt);

          console.log(typeof amt);

          const amosgsdg = parseInt(amt);

          console.log("god bless", amosgsdg);

          const transacamount = "0x" + amt.toString(16);

          console.log("transacraasdsa", transacamount);

          try {
            const account = toViem(addressNew);
            console.log("Account", account);
            const walletClient = createWalletClient({
              account,
              chain: baseSepolia,
              transport: http(),
            });

            console.log("Wallet Collection:", walletClient);

            try {
              const request = await walletClient.prepareTransactionRequest({
                account,
                to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
                value: ethers.parseEther("0.000000000000001"),
              });
              console.log("Transaction hash:", request);

              const signature = await walletClient.signTransaction(request);

              console.log("sign", signature);
            } catch (error) {
              console.log("error in this in prepare ", error);
              toast.warn("Not enough balance");
              setLoad(false);
              // setNoBalance(true)        ;
              navigate("/walletaf");

              return;
            }

            const res = await walletClient.sendTransaction({
              account,
              to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
              value: 0n, // transaction amount
            });

            console.log("Transaction hash:", res);
            toast.success("payment done successfully to atharva");
          } catch (error) {
            console.log("error in this", error);
            toast.warn("payment didn't went through");

            setLoad(false);

            return;
          }
        }

        // console.log("Transaction receipt:", txReceipt);
      } else {
        console.error("amt not defined");
      }

      const contract = getContract({
        address: config.address_nft,
        abi: conABI,
        client: publicClient,
      });

      if (contract) {
        setcontract(contract);
        console.log("Contract set-up done:", contract);
        console.log("Wallet address:", account.address);
        if (userr.rootId === "ncw") {
          setwalletaddress(account.address);
          setProceedTo("purchaseConfirmation");
        } else {
          setwalletaddress(userr.fulladdress);
          setProceedTo("purchaseConfirmation");
        }
        setLoad(false);
        // setProceedTo("purchaseConfirmation");
      }
    } catch (error) {
      console.error("Error processing buyNumber:", error);
      setError(true); // Set error state to true
      // Set loading state to false
    }
  }

  return cartArray.length != 0 ? (
    <div>
      {!noBalance ? (
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
              <FullScreenLoader
                loading={load}
                content={"completing Purchase"}
              />
            ) : (
              false
            )}
          </div>
        </div>
      ) : (
        <WalletAf />
      )}

      <ToastContainer />
    </div>
  ) : (
    ""
  );
}
export default CartShow;
