import React from "react";
import "./ConnectWallet.css";
import MetamaskIcon from "../../../../assets/login-page/order-claim/metamask-icon.png";

const ConnectWallet = ({
  setProceedTo,
  setsigner,
  setwalletaddress,
  setcontract,
}) => {
  //connecting to BNB network
  async function getAccount() {
    

    try {
      // BNB MAINNET REQUEST FOR ACCOUNTS ... TO CONNECT TO METAMASK
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (switchError) {
      var next = 56;
      // This error code indicates that the chain has not been added to MetaMask.{Uncomment to use}
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + next.toString(16),
                chainName: "BNB Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"] /* ... */,
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }
  }

  return (
    <div className="connectWallet" style={{ marginTop: "8.2rem" }}>
      <h1>Connect your wallet</h1>
      <p>
        Once minted your wallet address will be set as the phone number owner.
      </p>

      <button className="blueRoundedBtn" onClick={getAccount}>
        Connect your metamask wallet
        <img src={MetamaskIcon} />
      </button>
      <button
        className="transparentRoundedBtn"
        onClick={() => setProceedTo("mintNumber")}
      >
        Create a Metamask wallet
        <img src={MetamaskIcon} />
      </button>
    </div>
  );
};

export default ConnectWallet;
