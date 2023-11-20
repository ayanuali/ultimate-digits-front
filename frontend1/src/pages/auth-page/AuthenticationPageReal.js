import { React, useState } from "react";
import "./AuthenticationPageReal.css";
import config from "../../config.json";
export default function AuthenticationPageReal({ setProceedTo, number, code }) {
  //funtion to declare various variables
  const [confirmationcode, setconfirmationcode] = useState("");
  const [error, setError] = useState(false);

  //function to resend otp on mobile number
  const resend = async () => {
    console.log(code);
    console.log(number);
    setError(false);

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
        console.log(await res.json());
        setProceedTo("Authenticate");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //function to verify the otp created
  const check = async () => {
    fetch(`${config.backend}/twilio-sms/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        countryCode: code,
        phoneNumber: number,
        otp: confirmationcode,
      }),
    })
      .then(async (res) => {
        var data = await res.json();
        console.log(data.status);
        if (data.status == "approved") {
          setProceedTo("ConfirmationPageReal");
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="authenticationPageReal">
      <div className="apr-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M18.375 20.25C18.375 20.4158 18.3091 20.5747 18.1919 20.6919C18.0747 20.8092 17.9158 20.875 17.75 20.875C17.5842 20.875 17.4253 20.8092 17.3081 20.6919C17.1908 20.5747 17.125 20.4158 17.125 20.25C17.125 20.0842 17.1908 19.9253 17.3081 19.8081C17.4253 19.6908 17.5842 19.625 17.75 19.625C17.9158 19.625 18.0747 19.6908 18.1919 19.8081C18.3091 19.9253 18.375 20.0842 18.375 20.25ZM18.375 20.25H17.75M24.625 20.25C24.625 20.4158 24.5591 20.5747 24.4419 20.6919C24.3247 20.8092 24.1658 20.875 24 20.875C23.8342 20.875 23.6753 20.8092 23.5581 20.6919C23.4408 20.5747 23.375 20.4158 23.375 20.25C23.375 20.0842 23.4408 19.9253 23.5581 19.8081C23.6753 19.6908 23.8342 19.625 24 19.625C24.1658 19.625 24.3247 19.6908 24.4419 19.8081C24.5591 19.9253 24.625 20.0842 24.625 20.25ZM24.625 20.25H24M30.875 20.25C30.875 20.4158 30.8091 20.5747 30.6919 20.6919C30.5747 20.8092 30.4158 20.875 30.25 20.875C30.0842 20.875 29.9253 20.8092 29.8081 20.6919C29.6908 20.5747 29.625 20.4158 29.625 20.25C29.625 20.0842 29.6908 19.9253 29.8081 19.8081C29.9253 19.6908 30.0842 19.625 30.25 19.625C30.4158 19.625 30.5747 19.6908 30.6919 19.8081C30.8091 19.9253 30.875 20.0842 30.875 20.25ZM30.875 20.25H30.25M7.75 25.2667C7.75 27.9333 9.62167 30.2567 12.2617 30.645C14.0733 30.9117 15.9033 31.1167 17.75 31.26V39L24.7233 32.0283C25.0686 31.6844 25.5328 31.4863 26.02 31.475C29.2727 31.395 32.5175 31.1178 35.7367 30.645C38.3783 30.2567 40.25 27.935 40.25 25.265V15.235C40.25 12.565 38.3783 10.2433 35.7383 9.855C31.8516 9.28453 27.9284 8.99877 24 9C20.0133 9 16.0933 9.29167 12.2617 9.855C9.62167 10.2433 7.75 12.5667 7.75 15.235V25.265V25.2667Z"
            stroke="#5293FF"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="apr-content">
        <div className="text">
          Let’s verify your phone number<br></br>
        </div>
        <div className="sub-text">
          We’ve sent a confirmation code to &nbsp;
          <span className="hardcode" style={{ color: "#5293FF" }}>
            +{code} {number}
          </span>
        </div>
      </div>
      <div className="apr-input" style={{ marginTop: "-3vh" }}>
        <div className="small-text2">
          <div className="text2" style={{ marginBottom: "3px" }}>
            Confirmation code
          </div>
        </div>
        <div className="input-area2">
          <div className="type2">
            <input
              type="number"
              onChange={(e) => {
                setconfirmationcode(e.target.value);
              }}
              placeholder="Enter the 6 digit confirmation code"
            ></input>
          </div>
        </div>
        <div id="wrongCode"></div>
        <div className="small-btn">
          <div
            className="resend"
            style={{
              marginTop: "0.9rem",
              marginBottom: "-1rem",
              fontSize: "12px",
            }}
          >
            <button onClick={resend}>Resend code</button>
          </div>
        </div>
        {error ? <div style={{ textAlign: "center" }}>Incorrect otp</div> : ""}
        <div className="apr-btn">
          <button className="btn" onClick={check}>
            Continue
          </button>
        </div>
      </div>
      <div className="apr-footer">
        <div className="copyright">&copy; Ultimate Digits 2023.</div>
      </div>
    </div>
  );
}
