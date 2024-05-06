import React, { useEffect } from "react";
import "./HomePageReal.css";
import Navbar from "../../layout/navbar/Navbar";
import { useState } from "react";
import config from "../../config.json";
import { useSelector, useDispatch } from "react-redux";
import { getAccount, switchChain, disconnect } from "@wagmi/core";
import { connectConfig } from "../../ConnectKit/Web3Provider";
import { setUserData } from "../../services/wallet/UserSlice";
import { countries } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function HomePageReal({
  setNumber,
  setProceedTo,
  number,
  code,
  setCode,
}) {

  const navigate = useNavigate();

  const account = getAccount(connectConfig);
  const dispatch = useDispatch();

  const userr = useSelector((state) => state.user);

  //function to set variable
  const [place, setPlace] = useState(
    "Enter 10 digit mobile number without country code & space"
  );

  useEffect(() => {
    if (
      userr.address == "" ||
      userr.address == undefined ||
      userr.address == null
    ) {
      dispatch(setUserData({ ...userr, address: account.address }));
    }
  }, []);

  //function to set the number place
  const placecorrect = () => {
    if (code == "91")
      return setPlace(
        "Enter 10 digit mobile number without country code and space"
      );
    else if (code == "971") return setPlace("+971 056 678 8989");
    else return setPlace("+1 (555) 000-0000");
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    // Assuming every country follows a generic placeholder initially.
    // This can be customized for countries with different mobile number rules.
    setPlace("Enter mobile number without country code & space");
    dispatch(setUserData({ ...userr, countryCode: e.target.value }));
  };

  //function to send the otp for mobile number check
  const check = async () => {
    console.log(code);
    console.log(number);

    if (
      userr.address == "" ||
      userr.address == undefined ||
      userr.address == null
    ) {
      alert("Please login first");
      return;
    }
    console.log("here");
    console.log(userr);
    console.log(account.address);

    fetch(`${config.backend}/twilio-sms/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        countryCode: code,
        phoneNumber: number,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
        if (response.message === "Number already exists.") {
          alert("Number already exists.");
          return;
        }

        setProceedTo("Authenticate");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="homePageReal">
        <div
        className="back"
        onClick={() => {
          navigate("/selection-page");
        }}
        style={{ marginTop: "-2rem", width: "5rem" }}
      >
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.16667 0.833344L1 5.00001M1 5.00001L5.16667 9.16668M1 5.00001H11"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="back-text" style={{ marginLeft: "5px" }}>
          Go back
        </span>
      </div>
      <div className="hpr-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M21.5 6.5H17.75C16.7554 6.5 15.8016 6.89509 15.0983 7.59835C14.3951 8.30161 14 9.25544 14 10.25V37.75C14 38.7446 14.3951 39.6984 15.0983 40.4016C15.8016 41.1049 16.7554 41.5 17.75 41.5H30.25C31.2446 41.5 32.1984 41.1049 32.9016 40.4016C33.6049 39.6984 34 38.7446 34 37.75V10.25C34 9.25544 33.6049 8.30161 32.9016 7.59835C32.1984 6.89509 31.2446 6.5 30.25 6.5H26.5M21.5 6.5V9H26.5V6.5M21.5 6.5H26.5M21.5 37.75H26.5"
            stroke="#5293FF"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="hpr-content">
        <div className="text">
          What’s your phone number?<br></br>
        </div>
        <div className="sub-text">
          Which number would you like to use as your web3 identity
        </div>
      </div>
      <div className="hpr-input1" style={{ marginTop: "3rem" }}>
        <div className="text1" style={{ marginBottom: "3px" }}>
          <div className="txtxt1">Phone Number</div>
        </div>
        <div className="input-area1">
          <div className="select1">
            <select
              id="code1"
              style={{ height: "50px" }}
              onChange={handleChange}
              value={code}
            >
              {/* Dynamically render options from the countries list */}
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="type1">
            <input
              type="number"
              placeholder={place}
              value={number}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="hpr-btn">
          <button className="btn" onClick={check}>
            Continue
          </button>
        </div>
      </div>
      <div className="hpr-footer">
        <div className="copyright">&copy; Ultimate Digits 2024.</div>
      </div>
    </div>
  );
}
