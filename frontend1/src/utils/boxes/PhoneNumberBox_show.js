import React, { useEffect, useState } from "react";
import CheckIcon from "../../assets/search-results-page/icons/check-icon.svg";
import CrossIcon from "../../assets/search-results-page/icons/cross-icon.svg";
import SimcardIcon from "../../assets/search-results-page/icons/simcard-icon.svg";
import BinanceIcon from '../../assets/search-results-page/icons/binance-icon.svg';
import { useNavigate } from "react-router-dom";
import "./PhoneNumberBox.css";
import { formatPhoneNumber } from "../../functions/formatPhoneNumber";
import { checkDiamondNumber } from "../../functions/diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "../../functions/gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "../../functions/silver-numbers/silverNumCheckers";
import checkTier from "../../functions/checkTier";
import checkPrice from "../../functions/checkPrice";
import config from '../../config.json'
import conABI from '../../abi/abi1.json'
import {ethers} from 'ethers'
import { UserContext } from "../../Hook";
const PhoneNumberBox = ({
  number,
  cart,
  setCart,
  showAvailability,
  setContract_connect,
  cartArray,
  setcartArray,
  signer,
  contract_connect,
  setProceedTo
}) => {
  const {flag1,setflag1,totaling}=React.useContext(UserContext);
  // state for value adding to card
  const [addedToCard, setAddedToCard] = useState(false);
  const [available,setAvailable] = useState(true);
  const [flag2,setflag2]=useState(flag1)
  // const [price,setprice]=useState(checkPrice(number.toString()));
  let price=checkPrice(number.toString());
  // Initial state for tier category
  const [tier, setTier] = useState("silver");
  const navigate =useNavigate();
  const OnClick = () => {
    setAddedToCard(!addedToCard);

    
      const filteredCart = cart.filter((item) => item !== number);
      setCart(filteredCart);
      const filter = [];
      cartArray.map((num,i)=>{
        if(num != number) filter.push(num);
      });
      console.log(filter);
      setcartArray(filter);
      console.log(cartArray);
      // navigate(`/signup?cart=${filter}`) 
      // window.location.reload(false);
      // setProceedTo("showCart")
  };

  useEffect(() => {
    var data = checkTier(number.toString());
    console.log(data);
    setTier(data);
    // const contract = new ethers.Contract(config.address, conABI, signer);
    //     setContract_connect(contract);
    //     console.log(contract);
    contract_connect.checkAccount(number,"999")
                    .then((res)=>{
                      console.log(res);
                      setAvailable(false);
                    })
                    .catch((e)=>{
                      // console.log(e);
                       setAvailable(true);
                    })
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
      style={{ marginTop: "3vh"}}
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
          <div className="text_bsd">BUSD ${checkPrice(number.toString())}</div>
          </div>

          <button
            className={"transparentRoundedBtn" }
            onClick={OnClick}
            style={{marginTop: '9px'}}
          >
            {`Remove`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberBox;
