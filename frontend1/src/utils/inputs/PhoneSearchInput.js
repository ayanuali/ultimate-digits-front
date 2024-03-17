import React, { useState, useRef } from "react";
import TelephoneIcon from "../../assets/home-page/icons/telephone.png";

import { useNavigate } from "react-router-dom";

import "./PhoneSearchInput.css";
import { formatPhoneNumber } from "../../functions/formatPhoneNumber";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../services/wallet/UserSlice";

const PhoneSearchInput = ({ initialValue, update, setUpdate }) => {
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userr, "befie redux");
  const navigate = useNavigate();

  const ref = useRef(null);

  const handleFocus = () => {
    ref.current.focus();
  };

  //fake value
  const [value, setValue] = useState(
    initialValue ? formatPhoneNumber(initialValue) : ""
  );

  //value for submission
  const [phoneValue, setPhoneValue] = useState("");

  function handleChange(event) {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    // Format the numeric value with spaces
    const formattedValue = formatPhoneNumber(numericValue);

    // Update state with the formatted value
    setValue(formattedValue);

    // Update state for real value
    setPhoneValue(numericValue);
  }

  const onSearch = () => {
    setUpdate(!update);
    console.log("searching");
    console.log(phoneValue);
    dispatch(setUserData({ ...userr, phno: phoneValue }));
    navigate(`/search-results?n=${phoneValue}`);
  };

  return (
    <>
      <div className="phoneSearchInputSwitch">
        {/* <div className="phoneSearchInputSwitchBtn switchActive">
      Standard
    </div>
    <div className="phoneSearchInputSwitchBtn">
      Phone words
    </div> */}
      </div>
      <div className="phoneSearchInput">
        <div className="phoneSearchInputIcon">
          <img src={TelephoneIcon} alt="icon" />
        </div>
        <div className="phoneSearchInputBox" onClick={handleFocus}>
          Phone number
          <div className="phoneSearchInputBoxRow" onClick={handleFocus}>
            +999
            <input
              type="text"
              value={value}
              onChange={handleChange}
              maxLength={12}
              ref={ref}
              placeholder="123 456 7890"
            />
          </div>
        </div>
        <button
          onClick={onSearch}
          disabled={phoneValue.length < 10 ? true : false}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default PhoneSearchInput;
