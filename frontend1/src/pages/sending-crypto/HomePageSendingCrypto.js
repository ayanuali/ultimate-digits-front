import Sidebar from "./components/sidebar";
import { useState, useEffect } from "react";
import "./HomePageSendingCrypto.css";
import { resolveAddress } from "ethers";
import { useNavigate } from "react-router-dom";

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

  //setting states ofvarious variables
  const navigate = useNavigate();
  const [nums, setNums] = useState([]);
  const [virtual, setVirtual] = useState([]);
  const [real, setReal] = useState([]);
 
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

  const wallet = urlParams.get("wallet");
  if (wallet != null) {
    console.log(wallet);
    setCurrentWallet(wallet);
  } else {
    console.log(currentWallet);
  }

  //function to achive and view the numbers attached
  async function viewNumbers() {
    console.log(contract_connect);
    const res = await contract_connect.returnNumbers(currentWallet);
    console.log(res);
    console.log(typeof res);
    const numbers = await JSON.parse(
      JSON.stringify(
        res,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    console.log(numbers);
    var real = [];

    numbers.map((number, i) => {
      real.push(number);
    });
    setNums(real);
    console.log(nums);
  }


  viewNumbers();
  useEffect(() => {
    {
      viewNumbers();
    }
  }, []);

  
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
            <button
              className="sending-buy"
              onClick={() => {
                navigate("/selection-page/virtual-number");
              }}
            >
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
            {nums != []
              ? nums.map((number, i) => (
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
                ))
              : ""}
          </div>
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
              <div className="sub-text">{currentWallet}</div>
            </div>

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
              <div className="sub-text">{currentWallet}</div>
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
                <span className="coming-send">Coming soon</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
