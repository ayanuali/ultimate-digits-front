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
import { useWalletContext } from "@coinbase/waas-sdk-web-react";

const LoginForm = ({
  setProceedTo,
  setsigner,
  setwalletaddress,
  setcontract,
  setUser,

  log,
  setNav,
}) => {
  const { waas, user, isCreatingWallet, wallet } = useWalletContext();

  //function to initialise and declare variables
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState(true);
  const [openPhone, setOpenPhone] = useState(false);

  const handleLogin = async () => {
    console.log("logging in");
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
    }
    if (res.hasWallet === true) {
      console.log("wallet created already");
      const res2 = await res.restoreFromHostedBackup();
      console.log(res2);

      console.log("wallet", wallet);
      console.log("waas", waas);
    }
  };

  // Logout the user.
  const handleLogout = async () => {
    console.log("logging out");
    const res = await waas.logout();
    console.log(res);
  };

  useEffect(() => {
    // If the user is not yet logged in, the wallet is already loaded,
    // or the wallet is loading, do nothing.
    if (!user || wallet || isCreatingWallet) return;

    // NOTE: This will trigger a reflow of you component, and `wallet` will be set
    // to the created or restored wallet.

    console.log("user", user);
    if (user.hasWallet) {
      const res = user.restoreFromHostedBackup();
      console.log(res);
      console.log("wallet", wallet);
    } else {
      user.create(/* optional user-specified passcode */);
    }
  }, [user, wallet, isCreatingWallet]);
  useEffect(() => {
    setNav("2");
  }, []);

  // Get the query parameter string
  const queryString = window.location.search;

  //function to connect to BNB network
  async function getAccount() {
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
      <button
        className="loginWrapperTranspBtn"
        onClick={getAccount}
        style={{ color: "#3D4043" }}
      >
        <img src={MetamaskIcon} />
        Continue with Metamask
      </button>
      <button
        className="loginWrapperTranspBtn"
        onClick={handleLogin}
        style={{ color: "#3D4043" }}
      >
        <img src={udIcon} />
        Continue with Ultimate Wallet
      </button>
      <button
        className="loginWrapperTranspBtn"
        onClick={handleLogout}
        style={{ color: "#3D4043" }}
      >
        <img src={udIcon} />
        Log out with Ultimate Wallet
      </button>

      <div className="powered">
        <img src={coinbase} alt="coinbase" />
      </div>

      <div className="companyrights">© Ultimate Digits 2024</div>
    </div>
  );
};

export default LoginForm;
