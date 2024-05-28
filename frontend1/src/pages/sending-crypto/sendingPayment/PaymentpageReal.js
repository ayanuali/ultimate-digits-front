import { ethers } from "ethers";
import React from "react";
import SidebarPayment from "../components/sidebarPayment";
import "./PaymentpageR.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BinanceIcon from "../../../assets/search-results-page/icons/binance-icon.svg";
import config from "../../../config.json";
// import { connectConfig } from "../../../ConnectKit/Web3Provider";
import { readContract } from "@wagmi/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function PaymentpageReal({
  currentWallet,
  currentNumber,
  setToNumber,
  toNumber,
  contract_connect,
  setType,
  setToAddress,
  setNav,
  settoCode,
  tocode,
}) {
  //function to set navigation bar and the code id
  setNav(false);
  var tocodes = "971";
  const navigate = useNavigate();

  const userr = useSelector((state) => state.user);
  console.log(userr, "befie redux");

  //function to set states for variuos variables
  const [Normalhistory, setNormalhistory] = useState([]);
  const [place, setPlace] = useState("+1 (555) 000-0000");
  const [dataArray, setdataArray] = useState([]);
  const [dataArray1, setdataArray1] = useState([]);
  const [send, setSent] = useState(true);

  //function to get the numbers attached to an address
  const numberCheck = async () => {
    console.log(contract_connect);
    console.log(Number(toNumber));
    console.log(tocode);
    if (tocode == "91") {
      tocodes = "091";
    } else if (tocode == "1") {
      tocodes = "001";
    }
    console.log(tocodes);
    try {
      // const addressReturned = await readContract(connectConfig, {
      //   abi: contract_connect.abi,
      //   address: contract_connect.address,
      //   functionName: "checkAccount",
      //   args: [toNumber, tocodes],
      // });

      const apiurl = config.backend;

      const res = await axios.post(`${apiurl}/coinbase/getAddress`, {
        phoneNumber: toNumber,
      });
      if (res.status === 200) {
        console.log(res.data);
        console.log(res.data.mapping);
        setToAddress(res.data.mapping.address);
        setType("Real");
        navigate("/sending-crypto/confirmTransaction");
      }
      // if (addressReturned) {
      //   console.log("addressReturned:", addressReturned);
      //   setToAddress(addressReturned);
      //   setType("Real");
      //   navigate("/sending-crypto/confirmTransaction");
      // }
    } catch (e) {
      console.log(e);
      navigate("/sending-crypto/invalid-number");
    }
    // contract_connect
    //   .checkAccount(toNumber, tocodes)
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
    console.log(userr.address);
    console.log(typeof userr.address);
    fetch(
      "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=" +
        userr.address +
        "&startblock=1&endblock=99999999&sort=asc&apikey=" +
        config.api
    )
      .then(async (res) => {
        data1 = await res.json();
        console.log(data1);
        var Normalhistory = data1.result;

        setNormalhistory(Normalhistory);

        const len = Normalhistory.length;

        let o = 0;
        let i = len - 1;
        let p = 0;
        while (o != 5 && p != 5 && i >= 0) {
          console.log(i);

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
            if (Normalhistory[i].to == currentWallet.toLowerCase() && o < 5) {
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
              console.log(amt);
              console.log(dataArray1);
              p++;
              setdataArray1(dataArray1);
            }
          }
          i--;
        }
        while (o != 5 && i != 0) {
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
              if (Normalhistory[i].to == currentWallet.toLowerCase() && o < 5) {
                console.log(i);
                console.log(amt);
                dataArray.push(data);
                console.log(dataArray);
                o++;
                setdataArray(dataArray);
              }
            }
          }
          i--;
        }
        while (p != 5 && i != 0) {
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
              if (Normalhistory[i].to == currentWallet.toLowerCase() && p < 5) {
                console.log(i);
                console.log(amt);
                dataArray1.push(data);
                console.log(dataArray1);
                p++;
                setdataArray1(dataArray1);
              }
            }
          }
          i--;
        }
        console.log(dataArray1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    check();
  }, []);

  //function to add row in transaction history table
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
        <div className="ppr-btn">
          <div className="btn">
            <Link to="/sending-crypto/paymentVirtualNumber">
              <button className="btn1">Virtual Number</button>
            </Link>
          </div>
          <div className="btn" style={{ marginLeft: "1px" }}>
            <button className="btn2">Real Number</button>
          </div>
        </div>
        <div className="pp-input">
          <select
            id="code"
            style={{
              height: "44px",
              border: "1px solid rgba(216, 230, 253, 0.16)",
            }}
            onChange={(e) => {
              settoCode(e.target.value);
              if (e.target.value == "91") setPlace("+91 5555-785678");
              else if (e.target.value == "971") setPlace("+971 056 678 8989");
              else setPlace("+1 (555) 000-0000");
            }}
          >
            {/* <option></option>    */}
            <option value="1">US</option>
            <option value="91">IND</option>
            <option value="971">UAE</option>
          </select>
          <input
            type="number"
            id="num"
            placeholder={place}
            style={{ border: "1px solid rgba(216, 230, 253, 0.16)" }}
            onChange={(e) => {
              setToNumber(e.target.value);
            }}
          ></input>
          <button style={{ height: "44px" }} onClick={numberCheck}>
            Proceed
          </button>
        </div>
        <div className="pp-transaction">
          <div className="text" onClick={check} style={{ marginTop: "-5px" }}>
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
            {/* table showing transaction history */}
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
