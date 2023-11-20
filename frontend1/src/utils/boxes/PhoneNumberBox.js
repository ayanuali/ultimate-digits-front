import React, { useEffect, useState } from "react";
import CheckIcon from "../../assets/search-results-page/icons/check-icon.svg";
import CrossIcon from "../../assets/search-results-page/icons/cross-icon.svg";
import SimcardIcon from "../../assets/search-results-page/icons/simcard-icon.svg";
import BinanceIcon from '../../assets/search-results-page/icons/binance-icon.svg';

import "./PhoneNumberBox.css";
import { formatPhoneNumber } from "../../functions/formatPhoneNumber";
import { checkDiamondNumber } from "../../functions/diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "../../functions/gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "../../functions/silver-numbers/silverNumCheckers";
import checkTier from "../../functions/checkTier";
import checkPrice from "../../functions/checkPrice";

const PhoneNumberBox = ({
  number,
  cart,
  setCart,
  showAvailability,
  available,
}) => {
  // state for value adding to card
  const [addedToCard, setAddedToCard] = useState(false);

  // Initial state for tier category
  const [tier, setTier] = useState("bronze");

  const onClick = () => {
    setAddedToCard(!addedToCard);

    // if current button "remove"
    if (addedToCard) {
      const filteredCart = cart.filter((item) => item !== number);
      setCart(filteredCart);
    }
    // if current button "add to cart"
    else {
      const newCart = [...cart, number];
      setCart(newCart);
    }
  };

  useEffect(() => {
    setTier(checkTier(number));
  }, [number]);

  return (
    <div
      className={
        showAvailability
          ? available
            ? "phoneNumberBox availableBorder"
            : "phoneNumberBox notAvailableBorder"
          : "phoneNumberBox"
      }
    >
      {/* Left Side */}
      <div className="phoneNumberBoxLeft">
        <img
        className="phoneNumberBoxLeftStatusIcon"
          src={
            showAvailability ? (available ? CheckIcon : CrossIcon) : SimcardIcon
          }
        />
        <div className="phoneNumberResult">
          +999 {`${number && formatPhoneNumber(number)}`}
          <div className="phoneNumberResultStatus">
            {showAvailability && (
              <div
                className={
                  available ? "statusDiv greenStatus" : "statusDiv orangeStatus"
                }
              >
                {available ? `Available` : `Unavailable`}
              </div>
            )}
            <div className={`statusDiv ${tier}Tier`}>{`${tier} Tier`}</div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      {(available === true || showAvailability === false) && (
        <div className="phoneNumberBoxRight">
          <div className="phoneNumberBoxRightCurrency">
            <img
              src={BinanceIcon}
              className="phoneNumberBoxRightIcon"
              alt="currency-icon"
            />
          <div className="text_bsd">BUSD ${checkPrice(number)}</div>
          </div>

          <button
            className={addedToCard ? "transparentRoundedBtn" : "blueRoundedBtn"}
            onClick={onClick}
          >
            {addedToCard ? `Remove` : `Add to Cart`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberBox;
