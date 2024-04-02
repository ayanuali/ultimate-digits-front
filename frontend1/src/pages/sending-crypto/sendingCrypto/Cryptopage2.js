import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage2.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import config from "../../../config.json";
import { createWalletClient, http, parseEther } from "viem";
import { baseSepolia, bscTestnet } from "viem/chains";
import { useSelector } from "react-redux";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import { getAccount, readContract, getBalance } from "@wagmi/core";
import { useEffect, useState } from "react";
import { connectConfig } from "../../../ConnectKit/Web3Provider";
import { getContract, createPublicClient, custom } from "viem";

export default function Cryptopage2({
  amount,
  currentWallet,
  signer,
  toAddress,
  type,
  toNumber,
  code,
  setNav,
  number,
  tocode,
}) {
  const { user, wallet } = useWalletContext();
  const [balanceVal, setBalanceVal] = useState(0);

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

  console.log("reallt ipmpotat", user, wallet);

  const userr = useSelector((state) => state.user);
  console.log(userr, "before redux");
  //function to set navigation bar
  setNav(false);
  const navigate = useNavigate();

  //variable and function declaration
  var servicecharge = 0.01 * amount;

  var totalfinalamount = 1.01 * amount;

  //function to send confirmation message of transaction
  async function confirmcall() {
    console.log("confirm call");
    console.log(totalfinalamount);
    console.log(number);
    console.log(toNumber);
    console.log(code);
    console.log(tocode);
    fetch(`${config.backend}/twilio-sms/send-msg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        amount: `${totalfinalamount}`,
        phoneNumber: `+${code}${toNumber}`,
        number: `+${tocode} ${number}`,
      }),
    })
      .then(async (res) => {
        console.log(await res.json());
        navigate("/sending-crypto/last-page");
      })
      .catch((e) => {
        console.log(e);
        navigate("/sending-crypto/last-page");
      })
      .finally(() => {
        navigate("/sending-crypto/last-page");
      });
  }

  //function allowing transaction to take place
  async function sendTransaction() {
    console.log(totalfinalamount);
    console.log(number);
    if(totalfinalamount > balanceVal){
      alert("Insufficient Balance")
      return
    }
    fetch(
      `https://api.coinlayer.com/live?access_key=${config.convert_api}&symbols=BNB`
    )
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        let exchangeRate = data.rates["BNB"];
        var serviceCharge = parseFloat(
          servicecharge * (1 / exchangeRate).toFixed(10)
        ).toFixed(10);
        // send to which address ?
        const toaddress = toAddress;
        const a = parseFloat(amount * 0.0046790195017).toFixed(5);
        let amt = ethers.parseUnits(a.toString());
        const transacamount = "0x" + amt.toString(16);
        let amt1 = ethers.parseUnits(serviceCharge.toString());
        const transacamount1 = "0x" + amt1.toString(16);

        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        //This is used to acces the checked in accounts
        // provider
        //   .getSigner()

        if (!user && !wallet) {
          try {
            provider.getSigner().then(async (res) => {
              res
                .sendTransaction({
                  to: toaddress,
                  value: transacamount,
                })
                .then((txHash) => {
                  console.log(txHash.hash);
                  try {
                    res
                      .sendTransaction({
                        //address of app owner
                        to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
                        value: transacamount1,
                      })
                      .then((txHash) => {
                        console.log(txHash.hash);
                        if (type == "Real") {
                          confirmcall();
                        }
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  } catch (err) {
                    console.log(err);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          } catch (err) {
            console.log(err);
          }
        }

        if (user && wallet) {
          try {
            console.log("address", userr.address);
            console.log("user", user);
            console.log("wallet", wallet);
            const address = await wallet.addresses.for(ProtocolFamily.EVM);
            console.log("address", address);
            const walletClient = createWalletClient({
              account: toViem(address),
              chain: bscTestnet,
              transport: http(
                "https://data-seed-prebsc-1-s1.binance.org:8545/"
              ),
            });
            console.log("walletClient", walletClient);

            console.log("full address from wallet ", toViem(address));

            const ress = await walletClient
              .sendTransaction({
                account: toViem(address),
                to: toaddress,
                value: transacamount,
              })
              .then(async (txHash) => {
                console.log("Transaction hash:", txHash);
                try {
                  const res = await walletClient
                    .sendTransaction({
                      account: toViem(address),
                      to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
                      value: transacamount1, // transaction amount
                    })
                    .then((txHash) => {
                      console.log("Transaction hash:", txHash.hash);

                      confirmcall();
                    })
                    .catch((e) => {
                      console.log(e);
                      navigate("/sending-crypto/last-page");
                    });
                } catch (error) {
                  console.log(error);
                  navigate("/sending-crypto/last-page");
                }
              });

            console.log("Transaction hash:", res);
          } catch (error) {
            console.log(error);
            // navigate("/sending-crypto/last-page");
          }
        }
      })
      .catch((e) => console.log(e));


  }

  useEffect(()=>{
    getingBalance()
  },[])
  return (
    <div className="cryptopage2">
      <SidebarPayment />
      <div className="cp2-main">
        <div className="cp2-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Sending Crypto
          </div>
        </div>
        <div className="cp2-content">
          <div className="text" style={{ marginTop: "-5px" }}>
            Final Amount
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Please review the final amount that you will be paying
          </div>
          <div className="cp2-box">
            <div className="selection">
              <label>Amount</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{amount}</span>
              </div>
            </div>
            <div className="selection">
              <label>Ultimate digits Convenience Fee</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{servicecharge}</span>
              </div>
            </div>
            <div className="selection">
              <label>Total final amount</label>

              <div className="blockchain-binance">
                <img className="binance-icon" src={BinanceIcon}></img>
                <span className="text">{totalfinalamount}</span>
              </div>
            </div>
          </div>
          <div className="cp2-btn">
            {!user && !wallet && (
              <button onClick={sendTransaction}>Pay Via Metamask</button>
            )}

            {user && wallet && userr.rootId !== "ncw" && (
              <button onClick={sendTransaction}>
                Pay using ultimate digits wallet
              </button>
            )}
          </div>
          <div className="text" style={{ marginTop: "-5px" }}>
            Receiver's Details
          </div>
          <div className="cp2-box" style={{ marginTop: "-15px" }}>
            <div className="box1">
              <div className="text" style={{ marginTop: "-3px" }}>
                {type} phone number
              </div>
              <div className="sub-text">
                {{ type } == "Virtual" ? "+999" : "+91"} {toNumber}
              </div>
            </div>
            <div className="box2">
              <div className="text" style={{ marginTop: "-3px" }}>
                Connected wallet
              </div>
              <div className="sub-text">{toAddress}</div>
            </div>
            <div className="box2">
              <div className="text" style={{ marginTop: "-3px" }}>
               Balance
              </div>
              <div className="sub-text">{balanceVal} TBNB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
