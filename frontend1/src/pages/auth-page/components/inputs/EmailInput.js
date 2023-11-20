import React, { useState } from "react";

import { Magic } from "magic-sdk";
import { checkUser, loginUser } from "../../../../services/magic";
import { redirect, useNavigate } from "react-router-dom";

import "./EmailInput.css";
import Loader from "../../../../utils/loaders/Loader";

const EmailInput = ({ setProceedTo, user, setUser, log }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      setError("Email is Invalid");
      return;
    }
    loginUser(email)
      .then(async (res1) => {
        console.log(res1);
        checkUser(setUser).then( async (res) => {
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
        }).catch(async (e) => {
          console.log(e);
        })
        
      })
      .catch((e) => {
        setError("Unable to log in");
        console.error(e);
      });
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form className="emailInput" onSubmit={handleSubmit}>
      <div className="emailInputWrapper">
        Email address
        <input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>

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

export default EmailInput;
