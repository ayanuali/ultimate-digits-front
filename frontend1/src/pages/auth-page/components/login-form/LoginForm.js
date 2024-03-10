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
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "rsuite";
import FullScreenLoader from "./FullScreenLoader";
import udIcon from "../../../../assets/ud-square-logo.png";
// import coinbase from "../../../../assets/home-page/coinbase.svg";
import coinbase from "../../../../assets/coinbase.svg";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import axios from "axios";
import { getAccount } from '@wagmi/core';
import { createPublicClient, getContract, http, createWalletClient } from 'viem';
import { bscTestnet, sepolia } from 'viem/chains';
import { connectConfig } from "../../../../ConnectKit/Web3Provider";
import { CustomButton } from "../../../../ConnectKit/ConnectKitButton";


import { setUserData } from "../../../../services/wallet/UserSlice";

const LoginForm = ({
  setProceedTo,
  setsigner,
  setwalletaddress,
  setcontract,
  setUser,

  log,
  setNav,
}) => {
  const { waas, user, isCreatingWallet, wallet, isLoggingIn } =
    useWalletContext();
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userr, "befie redux");

  console.log("addressfrom redux", userr);

  // const updateUserInfo = (address, rootId) => {
  //   console.log(address, rootId);
  //   dispatch(setUser({ address: address, rootId: rootId }));
  // };
  //function to initialise and declare variables
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState(true);
  const [openPhone, setOpenPhone] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkUser = async (rootId, address) => {
    try {
      const res = await axios.post("http://localhost:8080/coinbase/verify", {
        rootId: rootId,
      });

      console.log(res);
      if (res.status === 200) {
        const temp = res.data.user;
        console.log(temp);
        dispatch(
          setUserData({ ...userr, address: temp.address, phno: temp.phone })
        );

        setUser({
          isLoggedIn: true,
          email: "",
          phoneNumber: temp.phone,
          address: temp.address,
        });
        console.log(userr, "after redux");
        setLoading(false);
        navigate("/real-number");
      } else if (res.status === 204) {
        dispatch(setUserData({ ...userr, rootId: rootId, address: address }));
        setLoading(false);

        navigate("/selection-page");
      }
    } catch (error) {
      console.log("error checking users", error);
    }
  };

  const handleLogin = async () => {
    console.log("logging in");
    setLoading(true);
    console.log("user", user);
    const res1 = await waas.logout();
    console.log(res1);
    const res = await waas.login();

    console.log(res);

    console.log("wallet", wallet);
    console.log("waas", waas);
    console.log("user", user);
    console.log("isCreatingWallet", isCreatingWallet);

    if (res.hasWallet === false) {
      console.log("wallet not created");
      const wallet = await res.create();
      console.log("wallet", wallet);
      console.log("waas", waas);

      const address = await wallet.addresses.for(ProtocolFamily.EVM);
      console.log(`Got address: ${address.address}`);
      // const privateKeys = await wallet.exportKeysFromHostedBackup(passcode);
      const privateKeys = await wallet.backup;
      console.log("private keys", privateKeys);
      dispatch(
        setUserData({
          address: address.address,
          rootId: wallet.rootContainerID,
          privKey: privateKeys,
        })
      );

      navigate("/wallet");
      return;
      if (res) {
        dispatch(
          setUserData({ address: address.address, rootId: res.rootContainerID })
        );

        navigate("/wallet");
      }
    }
    if (res.hasWallet === true) {
      console.log("wallet created already");
      const res2 = await res.restoreFromHostedBackup();
      console.log(res2);

      console.log("wallet", wallet);
      console.log("waas", waas);

      const address = await res2.addresses.for(ProtocolFamily.EVM);
      console.log(`Got address: ${address.address}`);
      if (res) {
        // updateUserInfo(address.address, res2.rootContainerID);
        // console.log("beofre redux", address.address, res2.rootContainerID);
        // dispatch(
        //   setUserData({
        //     address: address.address,
        //     rootId: res2.rootContainerID,
        //   })
        // );

        // console.log(userr, "after redux");

        // navigate("/selection-page");

        checkUser(res2.rootContainerID, address.address);
      }
    }
  };

  // Logout the user.
  const handleLogout = async () => {
    console.log("logging out");
    const res = await waas.logout();
    console.log(res);
  };

  const coinbaseThings = async () => {
    if (!user || wallet || isCreatingWallet) return;

    // NOTE: This will trigger a reflow of you component, and `wallet` will be set
    // to the created or restored wallet.

    console.log("user", user);
    if (user.hasWallet) {
      const res = await user.restoreFromHostedBackup();
      console.log(res);
      console.log("wallet", wallet);

      const address = await res.addresses.for(ProtocolFamily.EVM);
      console.log(`Got address: ${address.address}`);

      if (res) {
        // updateUserInfo(address.address, res.rootContainerID);
        // dispatch(
        //   setUserData({ address: address.address, rootId: res.rootContainerID })
        // );
        // console.log(userr, "after redux");

        // navigate("/selection-page");

        checkUser(res.rootContainerID, address.address);
      }
    } else {
      user.create(/* optional user-specified passcode */);
    }
  };

  useEffect(() => {
    // If the user is not yet logged in, the wallet is already loaded,
    // or the wallet is loading, do nothing.
    coinbaseThings();
  }, [user, wallet, isCreatingWallet]);
  useEffect(() => {
    setNav("2");
  }, []);

  // Get the query parameter string
  const queryString = window.location.search;

  const account = getAccount(connectConfig);
  const publicClient = createPublicClient({
    chain: bscTestnet,
    transport: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
  })

  async function connectWalletAndSetupContract() {
    setOpenPhone(false);
    setOpenEmail(false);
    try {
      const contract = getContract({
        address: config.address_nft,
        abi: conABI,
        // 1a. Insert a single client
        client: publicClient,

      })
      if (contract && setProceedTo) {
        setcontract(contract);
        console.log(`Contract connected: ${contract.address}`);

        setUser({ isLoggedIn: true, email: "", phoneNumber: "" });
        console.log("FinalLog:", log);

        console.log(account.chainId, ":chainId");

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

  //function to connect to BNB network
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

    // try {
    //   // BNB MAINNET REQUEST FOR ACCOUNTS ... TO CONNECT TO METAMASK
    //   await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: "0x38" }],
    //   });
    // } catch (switchError) {
    //   var next = 56;
    //   // This error code indicates that the chain has not been added to MetaMask.{Uncomment to use}
    //   if (switchError.code === 4902) {
    //     try {
    //       await window.ethereum.request({
    //         method: "wallet_addEthereumChain",
    //         params: [
    //           {
    //             chainId: "0x" + next.toString(16),
    //             chainName: "BNB Smart Chain",
    //             nativeCurrency: {
    //               name: "BNB",
    //               symbol: "BNB",
    //               decimals: 18,
    //             },
    //             rpcUrls: ["https://bsc-dataseed.binance.org/"] /* ... */,
    //           },
    //         ],
    //       });
    //     } catch (addError) {
    //       console.log(addError);
    //     }
    //   }
    // }
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
      <CustomButton onSuccess={connectWalletAndSetupContract} />
      <button
        className="loginWrapperTranspBtn"
        onClick={handleLogin}
        style={{ color: "#3D4043" }}
      >
        <img src={udIcon} />
        Continue with Ultimate Wallet
      </button>

      <FullScreenLoader loading={loading} content="Loading..." />

      <div className="powered">
        <img src={coinbase} alt="coinbase" />
      </div>

      <div className="companyrights">© Ultimate Digits 2024</div>
    </div>
  );
};

export default LoginForm;
