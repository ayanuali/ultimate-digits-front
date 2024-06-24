import SidebarPayment from "../components/sidebarPayment";
import "./Cryptopage2.css";
import { ethers, toBigInt } from "ethers";
import { useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import config from "../../../config.json";
import {
  createWalletClient,
  http,
  parseEther,
  createPublicClient,
  getContract,
} from "viem";
import { baseSepolia, bscTestnet, base } from "viem/chains";
import { useSelector } from "react-redux";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import {
  getAccount,
  readContract,
  getBalance,
  prepareTransactionRequest,
  sendTransaction,
  writeContract,
} from "@wagmi/core";
import { useEffect, useState } from "react";
import { connectConfig } from "../../../ConnectKit/Web3Provider";
import { custom } from "viem";
import { sign } from "viem/accounts";
import abi from "./abi.json";
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

  const payment_contract = "0x1eD80Fa9F46EC7716ab178006871F464Af5Ab3cF";

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
  const publicClient = createPublicClient({
    chain: base,
    transport: http("https://mainnet.base.org"),
  });

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
  async function sendTransactionpay() {
    console.log(totalfinalamount);
    console.log(number);

    console.log("user", user);
    console.log("wallet", user);
    if (totalfinalamount > balanceVal) {
      alert("Insufficient Balance");
      return;
    }
    const account = getAccount(connectConfig);

    const provider =
      window.ethereum != null
        ? new ethers.BrowserProvider(window.ethereum)
        : ethers.getDefaultProvider();
    console.log("provider", provider);

    //signer

    const signer = await provider.getSigner();

    console.log("signer", signer);
    // const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    // console.log(provider);
    const toaddress = toAddress;

    // const transacamount = parseEther(totalfinalamount.toString());
    // console.log("transacor", transacamount);
    const transacamount1 = amount * 0.001; // 0.1% of totalfinalamount
    console.log("transacti1", transacamount1);
    const transacamount1String = parseEther(transacamount1.toFixed(18)); // Ensures proper format without scientific notation
    console.log("instrinf", transacamount1String);
    const total = Number(amount) + Number(transacamount1);
    console.log("total", total);
    const n1 = total.toFixed(18);
    console.log("n1", n1);
    const totl = parseEther(n1.toString());
    console.log("totl", totl);

    const contract = getContract({
      address: payment_contract,
      abi: abi,
      // 1a. Insert a single client
      client: publicClient,
    });
    const tos = [toaddress, "0x40A0F869B582a01493D1588073ED79c2dD67791c"];
    const amounts = [parseEther(amount), transacamount1String];
    console.log(
      amount,
      typeof amount,
      transacamount1,
      typeof transacamount1,
      transacamount1String,
      total
    );

    if (Number(amount) + transacamount1 === Number(total)) {
      console.log("sum checj");
    } else {
      console.log("fucked");
    }
    if (!user && !wallet) {
      try {
        console.log("signing transaction for", totl);
        const cont = new ethers.Contract(payment_contract, abi, signer);
        console.log("contract instance", cont);

        const res = await cont.sendMultiple(tos, amounts, {
          value: totl,
        });
        console.log("res", res);
        confirmcall();
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
          chain: base,
          transport: http("https://mainnet.base.org"),
        });
        console.log("walletClient", walletClient);

        console.log("full address from wallet ", toViem(address));

        try {
          const hash = await walletClient.writeContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "sendMultiple",
            args: [tos, amounts],
            value: totl,
          });

          confirmcall();
        } catch (error) {
          console.log("error hererer", error);
        }

        // console.log("Transaction hash:", res);
      } catch (error) {
        console.log(error);
        // navigate("/sending-crypto/last-page");
      }
    }
  }

  useEffect(() => {
    getingBalance();
  }, []);
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
              <button onClick={sendTransactionpay}>Pay Via Metamask</button>
            )}

            {user && wallet && userr.rootId !== "ncw" && (
              <button onClick={sendTransactionpay}>
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
              <div className="sub-text">{balanceVal} ETH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
