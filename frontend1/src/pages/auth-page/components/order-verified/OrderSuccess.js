import React from "react";
import Logo from "../../../../assets/ud-square-logo2.png";
import { useNavigate } from "react-router-dom";

import "./OrderSuccess.css";

const OrderSuccess = ({ email }) => {
  const navigate = useNavigate();

  // Get the query parameter string
  const queryString = window.location.search;

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");

  // Split the cart parameter string at each comma and convert each element to a number
  const cartArray = cartParam.split(",").map(Number);

  return (
    <div className="orderSuccess">
      <div className="orderSuccessTop">
        <img src={Logo} />
        <h2>Thank you for your order</h2>
        <p>
          We’ve emailed your receipt to
          <span>{email}</span>
        </p>
      </div>

      <button
        className="blueRoundedBtn"
        onClick={() => navigate(`/my-numbers?cart=${cartParam}`)}
      >
        Go to my numbers
      </button>
    </div>
  );
};

export default OrderSuccess;
