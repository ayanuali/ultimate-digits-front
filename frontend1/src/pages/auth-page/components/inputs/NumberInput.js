import React, { useState } from "react";

import { Magic } from "magic-sdk";
import { checkUser, loginUserPhone } from "../../../../services/magic";
import { redirect, useNavigate } from "react-router-dom";

import "./EmailInput.css";
import Loader from "../../../../utils/loaders/Loader";
import FullScreenLoader from "../login-form/FullScreenLoader";
import { countries } from "../../../../constants";

const PhoneInput = ({ setProceedTo, openEmail, user, setUser, log }) => {
  //function to declare and initialize various variables
  const navigate = useNavigate();
  const [phoneNumber, setNumber] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [code, setCode] = useState("1");
  const [place, setPlace] = useState("+1 (555) 000-0000");
  const [content, setContent] = useState("Loading....");

  // handling the phone number log in
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!phoneNumber) {
      setLoading(false);
      setError("Number is Invalid");
      return;
    }
    console.log(phoneNumber);
    console.log(typeof phoneNumber);
    loginUserPhone(`+${code}${phoneNumber}`)
      .then(async (res1) => {
        console.log(res1);
        checkUser(setUser)
          .then(async (res) => {
            console.log(res);
            console.log(user.isLoggedIn == false);
            if (res1) {
              // setProceedTo("claimOrder");
              log ? navigate("/selection-page") : navigate(`/login`);
              // window.location.reload()
            } else {
              window.location.reload();
            }
            setLoading(false);
          })
          .catch(async (e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        setError("Unable to log in");
        console.error(e);
      });
  };

  //function to  change number
  const handleChangeNumber = (event) => {
    const value = event.target.value;
    // Regular expression to match only numeric input (allowing negative numbers and decimals)
    const reg = /^-?\d*(\.\d+)?$/;

    if (value === "" || reg.test(value)) {
      setNumber(value);
    }
  };

  return (
    <form className="emailInput" onSubmit={handleSubmit}>
      <div className="input-area">
        <div className="emailInputWrapper">
          Phone number
          <div className="type">
            <div className="select">
              <select
                id="code"
                onChange={(e) => {
                  setCode(e.target.value);
                  if (e.target.value == "91") setPlace("+91 5555-785678");
                  else if (e.target.value == "971")
                    setPlace("+971 056 678 8989");
                  else
                    setPlace(
                      "Enter mobile number without country code"
                    );
                }}
              >
                {/* <option></option>    */}
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              id="numb"
              type="phonenumber"
              placeholder={
                "Enter Only your Phone number without Country Code or Space"
              }
              value={phoneNumber}
              onChange={handleChangeNumber}
            ></input>
          </div>
        </div>
      </div>
      <FullScreenLoader loading={loading} content={content} />

      <div className="emailInputBtnBox">
        {loading ? (
          <Loader />
        ) : (
          <button className="blueRoundedBtn" type="submit">
            Continue
          </button>
        )}
      </div>
    </form>
  );
};

export default PhoneInput;
