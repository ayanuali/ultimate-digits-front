import React, { useEffect, useState } from "react";
import PhoneSearchInput from "../../../../utils/inputs/PhoneSearchInput";
import "./SearchResultsScreen.css";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox";
import { generateDiamondNumbers } from "../../../../functions/diamond-numbers/generateDiamondNumbers";

import { useNavigate } from "react-router-dom";
import { generateGoldNumbers } from "../../../../functions/gold-numbers/generateGoldNumbers";
import { generateSilverNumbers } from "../../../../functions/silver-numbers/generateSilverNumbers";
import { generateRandomNumbers } from "../../../../functions/random-numbers/generateRandomNumbers";

import { readContract } from "@wagmi/core";
import axios from "axios";

const SearchResultsScreen = ({
  setProceedTo,
  setCartArray,
  contract_connect,
  types
}) => {
  const navigate = useNavigate();

  //take initial value from query string
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");

  //update page on pressing search
  const [updatePage, setUpdatePage] = useState(false);

  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const generateNumbers = async () => {
    const tempArr = [];
    const nums = generateDiamondNumbers(queryParam);
    const nums2 = generateGoldNumbers(queryParam);
    const nums3 = generateSilverNumbers(queryParam);
    const nums4 = generateRandomNumbers();


    try {
      const res = await axios.post(`https://degenbackend.ultimatedigits.com/unicorn/generateNumbers`,{
        number:queryParam
      })
console.log("res",res)

if(res.status === 200){
  const sfdas = res.data.similarNumbers;
  setGeneratedNumbers([...sfdas ]);

}
  
    } catch (error) {
      console.log("sjbai",error)
    }

    // generatedNumbers.concat(nums, nums2, nums3, nums4);

    // setGeneratedNumbers([...nums, ]);
  };

  const checkAccFunc = async () => {

  };

  // Array of added to cart
  const [cart, setCart] = useState([]);
  const [ava, setAva] = useState(true);
  useEffect(() => {
    setQueryParam(searchParams.get("n"));
    generateNumbers();
    console.log("queryParam", queryParam);
    checkAccFunc();
  }, [updatePage]);


  const handleGoBack = () => {
    navigate("/")

  }

  return (
    <div className="searchResultsScreen">

       <div
        className="back"
        onClick={
          handleGoBack
        }
        style={{ marginTop: "2rem", width: "5rem" }}
      >
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.16667 0.833344L1 5.00001M1 5.00001L5.16667 9.16668M1 5.00001H11"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="back-text" style={{ marginLeft: "5px" }}>
          Go back
        </span>
      </div>
      <PhoneSearchInput
      dis={true}
        initialValue={queryParam}
        update={updatePage}
        setUpdate={setUpdatePage}
      />

      <div className="searchResultsMain">
        <h3>Search results</h3>
     {types &&  <><p>The number you are looking for is Available!</p>
        <div className="searchResultsTableCol">
          <PhoneNumberBox
            number={queryParam}
            cart={cart}
            setCart={setCart}
            showAvailability={true}
            available={ava}
          />
        </div>
        </>  
        }
     {!types &&  <><p>The number you are looking for is unavailable!</p>
        {/* <div className="searchResultsTableCol">
          <PhoneNumberBox
            number={queryParam}
            cart={cart}
            setCart={setCart}
            showAvailability={true}
            available={ava}
          />
        </div> */}
        </>  
        }

        <div className="searchResultsMidBorder" />

        <div className="searchResultsTable">
          Other available numbers
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
            onClick={() => {
              console.log(cart);
              navigate(`/signup?cart=${cart}`);
            }}
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
