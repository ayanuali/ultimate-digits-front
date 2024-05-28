import SidebarPayment from "../components/sidebarPayment";
import "./PaymentpageV.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import config from "../../../config.json";
import { readContract } from "@wagmi/core";
// import { connectConfig } from "../../../ConnectKit/Web3Provider";

export default function PaymentpageVirtual({
  currentWallet,
  setToNumber,
  toNumber,
  contract_connect,
  setType,
  setToAddress,
  setNav,
  settoCode,
  tocode,
}) {
  //setting the navigation bar and code identity
  setNav(false);
  settoCode("999");
  const navigate = useNavigate();

  //setting variable states
  const [Normalhistory, setNormalhistory] = useState([]);
  const [dataArray, setdataArray] = useState([]);
  const [dataArray1, setdataArray1] = useState([]);
  const [send, setSent] = useState(true);

  //function to get the transaction history of the attached address
  const numberCheck = async () => {
    console.log(contract_connect);
    console.log(Number(toNumber));
    if (tocode != "971") {
      settoCode(`0${tocode}`);
    }

    try {
      // const addressReturned = await readContract(connectConfig, {
      //   abi: contract_connect.abi,
      //   address: contract_connect.address,
      //   functionName: "checkAccount",
      //   args: [toNumber, "999"]
      // });
      // if (addressReturned) {
      //   console.log("addressReturned:", addressReturned);
      //   setToAddress(addressReturned);
      //   setType("Real");
      //   navigate("/sending-crypto/confirmTransaction");
      // }

    }
    catch (e) {
      console.log(e);
      navigate("/sending-crypto/invalid-number");

    }
    // contract_connect
    //   .checkAccount(toNumber, "999")
    //   .then((res) => {
    //     console.log(res);
    //     setToAddress(res);
    //     setType("Real");
    //     navigate("/sending-crypto/confirmTransaction");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     navigate("/sending-crypto/invalid-number");
    //   });
  };
  async function check() {
    var data1;
    console.log(currentWallet);
    console.log(typeof currentWallet);
    fetch(
      "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=" +
      currentWallet +
      "&startblock=1&endblock=99999999&sort=asc&apikey=" +
      config.api
    )
      .then(async (res) => {
        data1 = await res.json();
        var Normalhistory = data1.result;
        setNormalhistory(Normalhistory);
        console.log(Normalhistory);
        const len = Normalhistory.length;
        let o = 0;
        let i = len - 1;
        let p = 0;
        while ((o != 5 && p != 5) || i != 0) {
          var amt = Normalhistory[i].value;
          if (amt != "0") {
            let data = { date1: "", payment: 0, status: "", url: "" };

            var date = new Date(Number(Normalhistory[i].timeStamp) * 1000);
            data.date1 = date.toDateString();

            data.payment = (
              (Number(amt) / Number("1000000000000000000")) *
              213.7199897
            ).toFixed(5);
            data.status = "Success";
            var hash = Normalhistory[i].hash;
            data.url = `https://testnet.bscscan.com/tx/${hash}`;
            if (
              Normalhistory[i].to == currentWallet.toLowerCase() &&
              o < 5
            ) {
              console.log(i);
              console.log(amt);
              dataArray.push(data);
              console.log(dataArray);
              o++;
              setdataArray(dataArray);
            } else if (
              Normalhistory[i].from == currentWallet.toLowerCase() &&
              p < 5
            ) {
              dataArray1.push(data);
              console.log("second: " + i);
              console.log(amt);
              console.log(dataArray1);
              p++;
              setdataArray1(dataArray1);
            }
          }
          i--;
        }
        while (o != 5 && i != 0) {
          var amt = Normalhistory[i].value;
          if (amt != "0") {
            let data = { date1: "", payment: 0, status: "", url: "" };

            var date = new Date(Number(Normalhistory[i].timeStamp) * 1000);
            data.date1 = date.toDateString();

            data.payment = (
              (Number(amt) / Number("1000000000000000000")) *
              213.7199897
            ).toFixed(5);
            data.status = "Success";
            var hash = Normalhistory[i].hash;
            data.url = `https://testnet.bscscan.com/tx/${hash}`;
            if (
              Normalhistory[i].to == currentWallet.toLowerCase() &&
              o < 5
            ) {
              console.log(i);
              console.log(amt);
              dataArray.push(data);
              console.log(dataArray);
              o++;
              setdataArray(dataArray);
            }
          }
          i--;
        }
        while (p != 5 && i != 0) {
          var amt = Normalhistory[i].value;
          if (amt != "0") {
            let data = { date1: "", payment: 0, status: "", url: "" };

            var date = new Date(Number(Normalhistory[i].timeStamp) * 1000);
            data.date1 = date.toDateString();

            data.payment = (
              (Number(amt) / Number("1000000000000000000")) *
              213.7199897
            ).toFixed(5);
            data.status = "Success";
            var hash = Normalhistory[i].hash;
            data.url = `https://testnet.bscscan.com/tx/${hash}`;
            if (
              Normalhistory[i].to == currentWallet.toLowerCase() &&
              p < 5
            ) {
              console.log(i);
              console.log(amt);
              dataArray1.push(data);
              console.log(dataArray1);
              p++;
              setdataArray1(dataArray1);
            }
          }
          i--;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    check();
  }, []);

  //function to attach the rows in the transaction history table
  const tableCheck = ({ date1, payment, status, url }) => {
    return (
      <tr style={{ color: "white" }}>
        <td id="date-0">{date1}</td>
        <td className="amount-paymentR">
          <img src={BinanceIcon}></img>
          {payment}
        </td>
        <td className="status">{status}</td>
        <td id="action-0">
          <a href={url}>View on blockchain</a>
        </td>
      </tr>
    );
  };

  return (
    <div className="paymentpage">
      <SidebarPayment />
      <div className="pp-main">
        <div className="pp-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Payments
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Start sending people crypto through their numbers
          </div>
        </div>
        <div className="pp-btn">
          <div className="btn1" style={{ zIndex: 100 }}>
            <button
              className="btn-b"
              style={{ width: "125px", border: "5px solid #121735;" }}
            >
              Virtual Number
            </button>
          </div>
          <div className="btn" style={{ zIndex: 50 }}>
            <Link to="/sending-crypto/paymentRealNumber">
              <button
                className="btn2"
                style={{
                  background: "#121735",
                  paddingLeft: "30px",
                  width: "150px",
                }}
              >
                Real Number
              </button>
            </Link>
          </div>
        </div>
        <div className="pp-input">
          <input
            type="text"
            id="code"
            value="+999"
            style={{
              width: "61px",
              border: "1px solid rgba(216, 230, 253, 0.16)",
            }}
            disabled
          />
          <input
            className="inp2"
            type="number"
            placeholder="+999 93567 94703"
            onChange={(e) => {
              setToNumber(e.target.value);
            }}
            style={{}}
          ></input>
          <button style={{ height: "44px" }} onClick={numberCheck}>
            Proceed
          </button>
        </div>
        <div className="pp-transaction">
          <div className="text" style={{ marginTop: "-5px" }}>
            Transaction history
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Track all of your past transactions here
          </div>
          <div className="button-2">
            <button
              className="trsc"
              style={{ color: "white" }}
              onClick={() => {
                setSent(false);
                console.log(send);
              }}
            >
              Received
            </button>
            <button
              className="trsc"
              style={{ color: "white" }}
              onClick={() => {
                setSent(true);
              }}
            >
              Sent
            </button>
          </div>
          <div className="container">
            {/* table for transaction history */}
            {send ? (
              <table style={{ width: "58rem" }}>
                <tr className="col-1">
                  <th>Transaction Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                <tbody>{dataArray1.map(tableCheck)}</tbody>
              </table>
            ) : (
              <table style={{ width: "58rem" }}>
                <tr className="col-1">
                  <th>Transaction Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                <tbody>{dataArray.map(tableCheck)}</tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
