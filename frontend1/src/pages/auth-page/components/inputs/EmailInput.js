import React, { useState } from "react";

import { Magic } from "magic-sdk";
import { checkUser, loginUser } from "../../../../services/magic";
import { redirect, useNavigate } from "react-router-dom";

import "./EmailInput.css";
import Loader from "../../../../utils/loaders/Loader";
import FullScreenLoader from "../login-form/FullScreenLoader";
const EmailInput = ({ setProceedTo, user, setUser, log }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [content, setContent] = useState("Loading....");
  const emailToUuid = async (email) => {
    // Encode the email to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(email);

    // Hash the email using SHA-1
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);

    // Convert the buffer to an array of bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert the bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Format the first 16 bytes of the hash as a UUID
    const uuid = `${hashHex.substring(0, 8)}-${hashHex.substring(
      8,
      12
    )}-${hashHex.substring(12, 16)}-${hashHex.substring(
      16,
      20
    )}-${hashHex.substring(20, 32)}`;

    return uuid;
  };
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
        console.log("checing here", res1);
        const uuid = await emailToUuid(email);

        console.log(uuid);
        localStorage.setItem("uuid", uuid);
        const uuidlocal = localStorage.getItem("uuid");
        console.log("after", uuidlocal);
        checkUser(setUser)
          .then(async (res) => {
            console.log(res);
            console.log(user.isLoggedIn == false);
            if (res1) {
              // setProceedTo("claimOrder");
              console.log("log", log);
              // log ? navigate("/selection-page") : navigate(`/login`);
              navigate(`/login`);
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

export default EmailInput;
