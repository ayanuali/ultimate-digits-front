import React from "react";
import "./PhonePrice.css";
import SimIcon from "../../assets/my-numbers-page/sim-icon.svg";
import { formatPhoneNumber } from "../../functions/formatPhoneNumber";

const PhonePrice = ({ number, tier, price }) => {
  return (
    <div className="phonePrice">
      <div className="phonePriceMain">
        <img src={SimIcon} />
        <div className="phonePriceNum">
          +999 {`${number && formatPhoneNumber(number)}`}
          <div className={`phonePriceNumTier ${tier}Tier`}>
            {`${tier}`} tier
          </div>
        </div>
      </div>
      ${price}
    </div>
  );
};

export default PhonePrice;
