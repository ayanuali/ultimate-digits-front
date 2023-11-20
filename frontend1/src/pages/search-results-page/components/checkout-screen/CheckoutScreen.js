import React, { useEffect, useState } from "react";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox";
import "./CheckoutScreen.css";
import CheckedIcon from "../../../../assets/search-results-page/icons/checked-small.svg";
import { useNavigate } from "react-router-dom";

const CheckoutScreen = ({ cartArray, setCartArray }) => {
  const navigate = useNavigate();

  //function to set variables
  const [currentCart, setCurrentCart] = useState([]);

  useEffect(() => {
    setCurrentCart(cartArray);
  }, []);

  return (
    <div className="checkoutScreenWrapper">
      <div className="checkoutScreenTitle">
        <h2>Your Cart</h2>
        <p>
          Your phone number is almost registered. Please review your number and
          make sure everything is correct.
        </p>
      </div>

      <div className="checkoutScreenClaimBox">
        <div className="searchResultsTableCol">
          {cartArray.map((number, i) => (
            <PhoneNumberBox
              number={number}
              added={true}
              cart={currentCart}
              setCart={setCurrentCart}
              key={i}
            />
          ))}
        </div>

        <button
          className="blueRoundedBtn"
          onClick={() => navigate(`/signup?cart=${currentCart}`)}
        >
          claim my number
        </button>
      </div>

      <div className="checkoutScreenBtm">
        <img src={CheckedIcon} />
        <div className="checkoutScreenBtmRow">
          Cart
          <div />
          Pay
          <div />
          <span>Mint</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
