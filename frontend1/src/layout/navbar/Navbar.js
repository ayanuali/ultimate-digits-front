import React, { useEffect } from "react";
import navbarData from "./navbar.data";
import Logo from "../../assets/ud-logo.png";
import "./Navbar.css";
import { checkUser, logoutUser } from "../../services/magic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "../../assets/navbar/phone-icon.svg";
import ArrowDown from "../../assets/navbar/arrow-down.svg";
import { useSelector, useDispatch } from "react-redux";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { setUserData } from "../../services/wallet/UserSlice";
import { getAccount, switchChain, disconnect } from "@wagmi/core";
import { useDisconnect } from "wagmi";

import { ConnectButton } from '@rainbow-me/rainbowkit';


import config from "../../../src/config.json"
import conABI from "../../../src/abi/abi.json"

import  {ethers}  from "ethers";
const Navbar = ({ loggedIn, setLog }) => {
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();

  const [loginStatus, setLoginStatus] = useState(false);
  const [gotAddress, setGotAddress] = useState(false);
  const [gotData, setGotData] = useState(false);

  const [currentAccount, setCurrentAccount] = useState(null);


  const { waas, user, isCreatingWallet, wallet } = useWalletContext();

  const navigate = useNavigate();
  console.log(userr, "before redux");




  useEffect(() => {
    if (userr) {
      if (userr.address) {
        loggedIn = true;
        setLoginStatus(true);
      }
    }
  }, []);

  const handleLogout = async () => {
    console.log("logging out");
    if (user) {
      const res = await waas.logout();
      console.log(res);
      dispatch(setUserData({ rootId: "", address: "", phno: "" }));
      navigate("/");
    }

    dispatch(setUserData({ rootId: "", address: "", phno: "" }));

    navigate("/");
  };

  const handleNavigate = () => {
    if (userr.address !== "") {
      navigate("/");
    } else {
      navigate("/");
    }
  };


  const connectWalletOnLoad = async () => {
    if (window.ethereum) {
        try {
            const provider =  ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setCurrentAccount(accounts[0]);
            checkAndChangeNetwork();
        } catch (error) {
            console.error("Failed to load accounts:", error);
        }
    } else {
        console.error("MetaMask is not installed!");
    }
};

const checkAndChangeNetwork = async () => {
    if (!window.ethereum) return;

    try {
        // Replace with the actual Degen Chain details
        const degenChainId = "2484"; // The chainId must be in hexadecimal
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chainId !== degenChainId) {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: degenChainId }],
            });
        }
    } catch (switchError) {
        console.error("Failed to switch to Unicorn Ultra Chain:", switchError);
        if (switchError.code === 4902) {
            try {
                // Add Degen Chain to MetaMask if it's not there
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '2484',
                        chainName: 'Unicorn Ultra Nebulas Testnet',
                        rpcUrls: ['https://rpc-nebulas-testnet.uniultra.xyz'], // Example RPC URL
                        nativeCurrency: {
                            name: 'U2U',
                            symbol: 'U2U', // Typically 2-4 characters
                            decimals: 18,
                        },
                        blockExplorerUrls: ['https://testnet.u2uscan.xyz']
                    }],
                });
            } catch (addError) {
                console.error("Failed to add Unicorn Ultra Chain:", addError);
            }
        }
    }
};


  const handlesuccess = async () => {
    console.log("connecrted")
    connectWalletOnLoad();
  }

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <img
          src={Logo}
          alt="logo"
          onClick={handleNavigate}
          className="navbarLogo"
        />

   

        <div className="navbarRightSide">
      

<ConnectButton />
        </div>

      </div>
    </div>
  );
};

export default Navbar;
