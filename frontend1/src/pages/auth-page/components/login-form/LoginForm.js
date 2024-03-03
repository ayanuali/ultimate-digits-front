import EmailIcon from "../../../../assets/login-page/email.svg";
import PhoneIcon from "../../../../assets/login-page/phone.svg";
import MetamaskIcon from "../../../../assets/login-page/order-claim/metamask-icon.png";
import EmailInput from "../inputs/EmailInput";
import PhoneInput from "../inputs/NumberInput";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import config from "../../../../config.json";
import conABI from "../../../../abi/abi.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import udIcon from "../../../../assets/ud-square-logo.png";
// import coinbase from "../../../../assets/home-page/coinbase.svg";
import coinbase from "../../../../assets/coinbase.svg";
// import { Web3Provider } from "../../../../Web3Provider";
import { CustomButton } from "./ConnectKitButton";
import { getAccount } from '@wagmi/core';
import { connectConfig } from "../../../../Web3Provider";
import { createPublicClient, getContract, http, createWalletClient } from 'viem';
import { sepolia } from 'viem/chains'




const LoginForm = ({
  setProceedTo,
  setsigner,
  setwalletaddress,
  setcontract,
  setUser,
  user,
  log,
  setNav,
}) => {
  //function to initialise and declare variables
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState(true);
  const [openPhone, setOpenPhone] = useState(false);

  console.log("InitialLog:", log);
  // const publicClient = createPublicClient({
  //   chain: sepolia,
  //   transport: process.env.RPC_URL,
  // });
  const account = getAccount(connectConfig);
  // const client = createWalletClient({
  //   account,
  //   chain: sepolia,
  //   transports: http(`${process.env.RPC_URL}`),

  // })
  // console.log("Client:", client);

  useEffect(() => {
    setNav("2");
  }, []);

  async function connectWalletAndSetupContract() {
    setOpenPhone(false);
    setOpenEmail(false);
    try {
      const contract = getContract({
        address: config.address_nft,
        abi: conABI,
      });
      if (contract) {
        setcontract(contract);
        console.log(`Contract connected: ${contract.address}`);

        setUser({ isLoggedIn: true, email: "", phoneNumber: "" });
        console.log("FinalLog:", log);

        // Navigate based on the `log` state and presence of `setProceedTo` function
        const destination = log ? "/selection-page" : "/login";
        navigate(destination);
      }
    } catch (error) {
      console.error("Error setting up the contract:", error);
    }
  }
  if (account.isConnected === true) {
    console.log("Wallet Address:", account.address);

    setwalletaddress(account.address);
  }

  // useEffect(() => {
  //   if (account.isConnected === true && account.status === "connected") {

  //     connectWalletAndSetupContract();

  //   }

  // },);




  // // Get the query parameter string
  // const queryString = window.location.search;

  // //function to connect to BNB network
  async function getAcccount() {
    //setting the states of phone and email
    setOpenPhone(false);
    setOpenEmail(false);

    try {
      // BNB TESTNET REQUEST FOR ACCOUNTS ... TO CONNECT TO METAMASK
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      var next = 97;
      // This error code indicates that the chain has not been added to MetaMask.{Uncomment to use}
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + next.toString(16),
                chainName: "Smart Chain - Testnet",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://data-seed-prebsc-1-s1.binance.org:8545/",
                ] /* ... */,
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }


    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(provider);

    //This is used to acces the checked in accounts
    provider
      .getSigner()
      .then(async (res) => {
        var walletaddress = res.address;

        console.log(walletaddress);
        setwalletaddress(walletaddress);
        setsigner(res);
        console.log(JSON.stringify(res));

        const contract = new ethers.Contract(config.address_nft, conABI, res);
        setcontract(contract);

        setUser({ isLoggedIn: true, email: "", phoneNumber: "" });

        if (setProceedTo) {
          log ? navigate("/selection-page") : navigate("/login");
        } else {
          log ? navigate("/selection-page") : navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="loginWrapper"
      style={{ textAlign: setProceedTo ? "left" : "center" }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "4rem" }}
      >
        <img src={udIcon} style={{ width: "50px", height: "50px" }} />
      </div>
      <h2 style={{ textAlign: "center", color: "#3D4043" }}>
        Sign up or Log in
      </h2>

      {openEmail ? (
        <EmailInput
          setProceedTo={setProceedTo}
          user={user}
          setUser={setUser}
          log={log}
        />
      ) : (
        <button
          className="loginWrapperTranspBtn"
          onClick={() => {
            setOpenEmail(true);
            setOpenPhone(false);
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={EmailIcon} />
          Sign up with email
        </button>
      )}

      {openPhone ? (
        <PhoneInput
          setProceedTo={setProceedTo}
          openEmail={openEmail}
          user={user}
          setUser={setUser}
          log={log}
        />
      ) : (
        <div>
          {openEmail ? "" : <br />}
          <button
            className="loginWrapperTranspBtn"
            onClick={() => {
              setOpenPhone(true);
              setOpenEmail(false);
            }}
            style={{
              cursor: "pointer",
              marginTop: "-20px",
              marginBottom: "30px",
              color: "#3D4043",
            }}
          >
            <img src={PhoneIcon} />
            Sign up with Phone Number
          </button>
        </div>
      )}
      <div className="emailInputBottomLine">
        <div />
        <span style={{ color: "#3D4043" }}>OR</span>
        <div />
      </div>

      <br />
      <CustomButton />
      <button
        className="loginWrapperTranspBtn"
        onClick={getAccount}
        style={{ color: "#3D4043" }}
      >
        <img src={udIcon} />
        Continue with Ultimate Wallet
      </button>

      <div className="powered">
        <img src={coinbase} alt="coinbase" />
      </div>

      <div className="companyrights">© Ultimate Digits 2024</div>
    </div>
  );
};

export default LoginForm;
