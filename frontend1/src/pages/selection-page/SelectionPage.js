import React, { useEffect, useState } from "react";
import "./SelectionPage.css";
import currentImg from "../../assets/selection1.png";
import virtualImg from "../../assets/selection2.png";
import { useNavigate } from "react-router";
import freeImg from "../../assets/free-img.png";
import { useSelector, useDispatch } from "react-redux";
import { connectConfig } from "../../ConnectKit/Web3Provider";
import { getBalance } from "@wagmi/core";

export default function SelectionPage({ setNav }) {
  //function setting navigation bar
  const [balanceVal, setBalanceVal] = useState(0);

  setNav("1");
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userr, "befie redux");
  const navigate = useNavigate();

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

  useEffect(() => {
    getingBalance();
  }, []);

  const handleNavigate = () => {
    navigate("virtual-number/home");
    return
    if (userr.rootId !== "ncw") {
      if (balanceVal > 0) {
        navigate("virtual-number");
      } 
    } else  {
      if(balanceVal > 0){
        navigate("virtual-number/home");
      }
      else {
        // alert("Insufficient balance");
        navigate("/walletaf");
      }
    }
  };

  return (
    <div className="selectionPage" style={{ marginTop: "-1.4rem" }}>
      <div className="sp-content">
        <div className="text">Let’s get you started</div>
        <div className="sub-text">Supercharge your phone number for Web3</div>
      </div>
      <div className="sp-box">
        <div className="sp-current">
          <div className="virtual-image" style={{ marginTop: "-20px" }}>
            <img src={currentImg} alt="iphone"></img>
          </div>
          <div className="current-text">
            <div className="text-img">
              <img
                src={freeImg}
                alt="free"
                style={{ width: 60, borderRadius: "3px" }}
              ></img>
            </div>
            <div style={{ marginTop: "-1.4rem" }}>
              <div className="text">Current number</div>
              <div className="sub-text">
                Verify the number with a secure OTP sent to your actual mobile
                number
              </div>
              <div className="virtual-btn">
                <button
                  onClick={() => {
                    navigate("/real-number");
                  }}
                  style={{ marginTop: "-12px" }}
                >
                  <span style={{ verticalAlign: 4 }}>
                    Use your current number{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    `{" "}
                    <path
                      d="M13.9763 9.16744L9.50625 4.69743L10.6848 3.51892L17.1666 10.0008L10.6848 16.4825L9.50625 15.304L13.9763 10.8341H3.83325V9.16744H13.9763Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-current">
          <div className="virtual-image" style={{ marginTop: "-20px" }}>
            <img src={virtualImg} alt="iphone"></img>
          </div>
          <div className="current-text" style={{ marginTop: "3.25rem" }}>
            <div className="text">Virtual number</div>
            <div className="sub-text">
              Get a personalized 10-digit virtual number of your choice as an
              Ethereum NFT
            </div>
            <div className="virtual-btn">
              <button onClick={handleNavigate} style={{ marginTop: "-12px" }}>
                <span style={{ verticalAlign: 4 }}>Get a virtual number </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  `{" "}
                  <path
                    d="M13.9763 9.16744L9.50625 4.69743L10.6848 3.51892L17.1666 10.0008L10.6848 16.4825L9.50625 15.304L13.9763 10.8341H3.83325V9.16744H13.9763Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
