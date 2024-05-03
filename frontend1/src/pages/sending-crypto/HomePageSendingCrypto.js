import Sidebar from "./components/sidebar";
import { useState, useEffect } from "react";
import "./HomePageSendingCrypto.css";
import { resolveAddress } from "ethers";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  parseEther } from "viem";
import { useEVMAddress } from "@coinbase/waas-sdk-web-react";

import { getAccount, readContract, getBalance } from "@wagmi/core";
import { connectConfig } from "../../ConnectKit/Web3Provider";
import axios from "axios";
import { setUserData } from "../../services/wallet/UserSlice";
import { toViem } from "@coinbase/waas-sdk-viem";
import config from "../../config.json";
import {
  createPublicClient,
  http,
  getContract,
  createWalletClient,
} from "viem";

import { sendTransaction } from "@wagmi/core";
import { bscTestnet, sepolia } from "viem/chains";
import { writeContract, switchChain } from "@wagmi/core";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
export default function HomePageSendingCrypto({
  setNav,
  setCurrentNumber,
  setCurrentWallet,
  currentNumber,
  currentWallet,
  contract_connect,
}) {
  //setting the navigation bar
  setNav("3");
  const { user, wallet } = useWalletContext();

  const userr = useSelector((state) => state.user);
  console.log(userr, "befie redux");
  const dispatch = useDispatch();

  //setting states ofvarious variables
  const navigate = useNavigate();
  const [nums, setNums] = useState([]);
  const [virtual, setVirtual] = useState([]);
  const [real, setReal] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [balanceVal, setBalanceVal] = useState(0);
  const [haveReal, setHaveReal] = useState(false);

  //setting the number and wallet attached to the user
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const number = urlParams.get("number");
  if (number != null) {
    console.log(number);
    setCurrentNumber(number);
  } else {
    console.log(currentNumber);
  }

  const wallett = urlParams.get("wallet");
  if (wallett != null) {
    console.log(wallett);
    setCurrentWallet(wallett);
  } else {
    console.log(currentWallet);
  }

  const account = getAccount(connectConfig);

  //function to achive and view the numbers attached
  // async function viewNumbers() {
  //   console.log(contract_connect);

  //   // contract_connect.returnNumbers(currentWallet);
  //   const res = await readContract(connectConfig, {
  //     abi: contract_connect.abi,
  //     address: contract_connect.address,
  //     functionName: "returnNumbers",
  //     args: [account.address],
  //   });
  //   console.log(res);
  //   console.log(typeof res);
  //   const numbers = await JSON.parse(
  //     JSON.stringify(
  //       res,
  //       (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  //     )
  //   );
  //   console.log(numbers);
  //   var real = [];

  //   numbers.map((number, i) => {
  //     real.push(number);
  //   });
  //   setNums(real);
  //   console.log(nums);
  // }

  // if (userr.rootId === "ncw") {
  //   viewNumbers();
  // }
  const getAccounts = async () => {
    const balance = await getBalance(connectConfig, {
      address: userr.address,
    });

    console.log("blance", balance);
    if (userr.address === account.address) {
      try {
        const apiurl = config.backend;
        const res = await axios.post(`${apiurl}/coinbase/getPhno`, {
          address: account.address,
        });
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data.mapping.virtuals);
          setVirtual(res.data.mapping.virtuals);
          setReal(res.data.mapping.phone);
          console.log(nums);
          console.log(res.data.mapping.phone);
          console.log(res.data.mapping.countryCode);
          setCountryCode(res.data.mapping.countryCode);
          if (
            res.data.mapping.phone === undefined
           
          ) {
            setHaveReal(true);
          }
          dispatch(
            setUserData({
              ...userr,
              rootId: res.data.mapping.rootId,
              phno: res.data.mapping.phone,
              virtuals: res.data.mapping.virtuals,
            })
          );
        }
        if (res.status === 204) {
          alert("no mapping exist");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("calling conbase data");
        const apiurl = config.backend;
        const res = await axios.post(`${apiurl}/coinbase/getPhno`, {
          address: userr.address,
        });
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data.mapping.virtuals);
          setVirtual(res.data.mapping.virtuals);
          setReal(res.data.mapping.phone);
          console.log(nums);

          console.log(res.data.mapping.phone);
          console.log(res.data.mapping.countryCode);
          setCountryCode(res.data.mapping.countryCode);
          if (
            res.data.mapping.phone === undefined
          ) {
            console.log("no real number")
            setHaveReal(true);
          }
          dispatch(
            setUserData({
              ...userr,
              rootId: res.data.mapping.rootId,
              phno: res.data.mapping.phone,
              virtuals: res.data.mapping.virtuals,
            })
          );
        }
        if (res.status === 204) {
          alert("no mapping exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addressNew = useEVMAddress(wallet);


  const handleTest1 = async() => {
   try {
    const { hash } = await sendTransaction(connectConfig, {
      account: account.address,
      to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
      value: 1,
    });

    console.log("Transaction hash:", hash);
   } catch (error) {
    console.log("Aasdasdasdsadas",error)
   }
  }


  const handleTest = async() => {
    console.log("test")

console.log("Add",addressNew)
console.log("Acc",account)

    const account = toViem(addressNew);


    const walletClient = createWalletClient({
      account,
      chain: bscTestnet,
      transport: http(),
    });
    console.log("walletClient", walletClient);

    try {


      const request = await walletClient.prepareTransactionRequest({
        account,
        to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
        value: 1, 
        
        
      })
      console.log("Transaction hash:", request);

      const signature = await walletClient.signTransaction(request)

      console.log("sign",signature)


    } catch (error) {
      console.log("error in this in prepare ",error)
    
    }


  }

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
    // if (userr.rootId === "ncw") {
    //   viewNumbers();
    // }
    getingBalance();

    getAccounts();
  }, []);

  const handleNavigate = () => {
    console.log("balance", balanceVal);
    console.log("real", haveReal);
    // if (haveReal === true) {
    //   navigate("/selection-page");
    // } else {
    //   if (balanceVal != 0) {
    //     navigate("/selection-page/virtual-number");
    //   } else {
    //     alert("You have insufficient balance");
    //   }
    // }

    if (balanceVal != 0) {
      navigate("/selection-page/virtual-number");
    } else {
      alert("You have insufficient balance");
      navigate("/walletaf2")
    }
  };

  const handleNavigateReal = () => {
    dispatch(setUserData({ ...userr, updateReal: true }));
    navigate("/real-number");
  };

  return (
    <div className="homepage">
      <Sidebar />
      <div className="hp-main">
        <div className="hp-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Home
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Explore endless possibilities with your phone number in Web3
          </div>
        </div>
        <div className="hp-content hp-navbar">
          <div className="text button-buy" style={{ marginTop: "-5px" }}>
            Your Numbers
            {haveReal === true && (
              <button className="sending-buy" onClick={handleNavigateReal}>
                Link Your Real Number
                <span style={{ margin: "5px" }}>
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.78109 5.33327L5.20509 1.75726L6.14789 0.814453L11.3334 5.99993L6.14789 11.1853L5.20509 10.2425L8.78109 6.6666H0.666687V5.33327H8.78109Z"
                      fill="#5F6A85"
                    />
                  </svg>
                </span>
              </button>
            )}
            <button className="sending-buy" onClick={handleNavigate}>
              Buy A Number
              <span style={{ margin: "5px" }}>
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.78109 5.33327L5.20509 1.75726L6.14789 0.814453L11.3334 5.99993L6.14789 11.1853L5.20509 10.2425L8.78109 6.6666H0.666687V5.33327H8.78109Z"
                    fill="#5F6A85"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            View and manage your numbers
          </div>
          <div className="hp-box">
            {nums != [] &&
              nums.map((number, i) => (
                <div className="box2">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.670776 5.5H16.5041C16.9644 5.5 17.3375 5.8731 17.3375 6.33333V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V5.5ZM1.50411 0.5H14.0041V3.83333H0.670776V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5ZM11.5041 9.66667V11.3333H14.0041V9.66667H11.5041Z"
                      fill="#5F6A85"
                    />
                  </svg>
                  <span className="text4">Number {i + 1}</span>
                  <span className="sub-text2">
                    +
                    {number[0] == "0"
                      ? number[1] == "0"
                        ? number.substr(2)
                        : number.substr(1)
                      : number}
                  </span>
                  <span
                    className={`sub-text2 ${
                      number[0] == "0" ? "real" : "virtual"
                    }-send`}
                  >
                    {number[0] == "0" ? "Real" : "Virtual"} Number
                  </span>
                </div>
              ))}
          </div>

          <div className="hp-box">
            {virtual.map((data, index) => (
              <div className="box2">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.670776 5.5H16.5041C16.9644 5.5 17.3375 5.8731 17.3375 6.33333V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V5.5ZM1.50411 0.5H14.0041V3.83333H0.670776V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5ZM11.5041 9.66667V11.3333H14.0041V9.66667H11.5041Z"
                    fill="#5F6A85"
                  />
                </svg>
                <span className="text4">Number {index + 1} </span>
                <span className="sub-text2">
                  +{999} <span>{""}</span> <span key={index}>{data}</span>
                </span>
                <span
                  className={`sub-text2 
              virtual-send`}
                >
                  Virtual Number
                </span>
              </div>
            ))}
          </div>
          {real && (
            <div
              className="hp-box"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="box2">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.670776 5.5H16.5041C16.9644 5.5 17.3375 5.8731 17.3375 6.33333V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V5.5ZM1.50411 0.5H14.0041V3.83333H0.670776V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5ZM11.5041 9.66667V11.3333H14.0041V9.66667H11.5041Z"
                    fill="#5F6A85"
                  />
                </svg>
                <span className="text4">Number </span>
                <span className="sub-text2">
                  +{countryCode}
                  {real}
                </span>
                <span className="sub-text2 real-send">Real Number</span>
              </div>
            </div>
          )}
        </div>
        <div className="hp-content">
          <div className="text button-buy" style={{ marginTop: "-5px" }}>
            Connected wallets
            <button className="sending-buy" disabled>
              Load Another Wallet
              <span style={{ margin: "5px" }}>
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.78109 5.33327L5.20509 1.75726L6.14789 0.814453L11.3334 5.99993L6.14789 11.1853L5.20509 10.2425L8.78109 6.6666H0.666687V5.33327H8.78109Z"
                    fill="#5F6A85"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            You can view wallets connected to your phone
          </div>
          <div className="hp-box">
            {userr.rootId === "ncw" ? (
              <div className="box1">
                <svg
                  style={{ marginTop: "15px" }}
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.670776 5.5H16.5041C16.9644 5.5 17.3375 5.8731 17.3375 6.33333V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V5.5ZM1.50411 0.5H14.0041V3.83333H0.670776V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5ZM11.5041 9.66667V11.3333H14.0041V9.66667H11.5041Z"
                    fill="#5F6A85"
                  />
                </svg>
                <div className="text">Metamask Wallet</div>
                <div className="sub-text">{userr.address}</div>
                <div className="sub-text">{balanceVal} TBNB</div>
              </div>
            ) : (
              <div className="box1">
                <svg
                  style={{ marginTop: "15px" }}
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.670776 5.5H16.5041C16.9644 5.5 17.3375 5.8731 17.3375 6.33333V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V5.5ZM1.50411 0.5H14.0041V3.83333H0.670776V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5ZM11.5041 9.66667V11.3333H14.0041V9.66667H11.5041Z"
                    fill="#5F6A85"
                  />
                </svg>
                <div className="text">Ultimate Digits Wallet</div>
                <div className="sub-text">{userr.address}</div>
                <div className="sub-text">{balanceVal} TBNB</div>
                <span
                  className="sub-text2 "
                  style={{
                    marginBottom: "15px",
                    color: "rgba(95, 106, 133, 1)",
                    fontWeight: "bold",
                  }}
                >
                  Manage{" "}
                  <span style={{ margin: "10px" }}>
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.78109 5.33327L5.20509 1.75726L6.14789 0.814453L11.3334 5.99993L6.14789 11.1853L5.20509 10.2425L8.78109 6.6666H0.666687V5.33327H8.78109Z"
                        fill="#5F6A85"
                      />
                    </svg>
                  </span>{" "}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>

          {/* <button onClick={handleTest}>test</button>
          <button onClick={handleTest1}>test1</button> */}

        </div>
      </div>
    </div>
  );
}
