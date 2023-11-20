import React, { useEffect, useState } from "react";
import PhoneSearchInput from "../../../../utils/inputs/PhoneSearchInput";
import "./SearchResultsScreen.css";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox";
import { generateDiamondNumbers } from "../../../../functions/diamond-numbers/generateDiamondNumbers";

import { useNavigate } from "react-router-dom";
import { generateGoldNumbers } from "../../../../functions/gold-numbers/generateGoldNumbers";
import { generateSilverNumbers } from "../../../../functions/silver-numbers/generateSilverNumbers";
import { generateRandomNumbers } from "../../../../functions/random-numbers/generateRandomNumbers";

const SearchResultsScreen = ({
  setProceedTo,
  setCartArray,
  contract_connect,
}) => {
  const navigate = useNavigate();

  //take initial value from query string
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");

  //update page on pressing search
  const [updatePage, setUpdatePage] = useState(false);

  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const generateNumbers = () => {
    const tempArr = [];
    const nums = generateDiamondNumbers(queryParam);
    const nums2 = generateGoldNumbers(queryParam);
    const nums3 = generateSilverNumbers(queryParam);
    const nums4 = generateRandomNumbers();

    generatedNumbers.concat(nums, nums2, nums3, nums4);

    setGeneratedNumbers([...nums, ...nums2, ...nums3, ...nums4]);
  };

  // Array of added to cart
  const [cart, setCart] = useState([]);
  const [ava, setAva] = useState(true);
  useEffect(() => {
    setQueryParam(searchParams.get("n"));
    generateNumbers();
    console.log(queryParam);
    contract_connect
      .checkAccount(`999${queryParam}`)
      .then((res) => {
        console.log(res);
        setAva(false);
      })
      .catch((e) => {
        console.log(e);
        setAva(true);
      });
  }, [updatePage]);

  return (
    <div className="searchResultsScreen">
      <PhoneSearchInput
        initialValue={queryParam}
        update={updatePage}
        setUpdate={setUpdatePage}
      />

      <div className="searchResultsMain">
        <h3>Search results</h3>
        <p>The number you are looking for is available!</p>
        <div className="searchResultsTableCol">
          <PhoneNumberBox
            number={queryParam}
            cart={cart}
            setCart={setCart}
            showAvailability={true}
            available={ava}
          />
        </div>

        <div className="searchResultsMidBorder" />

        <div className="searchResultsTable">
          Similar numbers
          {/* dropdown */}
          {/* numbers boxes */}
          <div className="searchResultsTableCol">
            {generatedNumbers.map(
              (number, i) =>
                queryParam !== number && (
                  <PhoneNumberBox
                    number={number}
                    cart={cart}
                    setCart={setCart}
                    showAvailability={false}
                    key={i}
                  />
                )
            )}
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="searchResultClaim">
          <button
            className="blueRoundedBtn"
            onClick={() => navigate(`/signup?cart=${cart}`)}
          >
            continue to cart
          </button>
          Your cart
          <div>{`${cart.length}`}</div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsScreen;
