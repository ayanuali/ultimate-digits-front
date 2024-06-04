import React, { useEffect, useState } from "react";
import PhoneSearchInput from "../../../../utils/inputs/PhoneSearchInput";
import "./SearchResultsScreen.css";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox";
import { generateDiamondNumbers } from "../../../../functions/diamond-numbers/generateDiamondNumbers";

import { useNavigate } from "react-router-dom";
import { generateGoldNumbers } from "../../../../functions/gold-numbers/generateGoldNumbers";
import { generateSilverNumbers } from "../../../../functions/silver-numbers/generateSilverNumbers";
import { generateRandomNumbers } from "../../../../functions/random-numbers/generateRandomNumbers";

import { connectConfig } from "../../../../ConnectKit/Web3Provider";
import { readContract } from "@wagmi/core";

import axios from "axios";
import config from "../../../../config.json";
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

  const generateNumbers = async () => {
    const tempArr = [];
    const nums = await generateDiamondNumbers(queryParam);
    const nums2 = await generateGoldNumbers(queryParam);
    const nums3 = await generateSilverNumbers(queryParam);
    const nums4 = generateRandomNumbers();
    console.log("nums", nums);
    console.log("num2", nums2);
    console.log("num3", nums3);
    generatedNumbers.concat(nums, nums2, nums3, nums4);

    setGeneratedNumbers([...nums, ...nums2, ...nums3, ...nums4]);
  };

  const checkAccFunc = async () => {
    // try {
    //   const addressReturned = async () => {
    //     console.log("Hii..");
    //     await readContract(connectConfig, {
    //       abi: contract_connect.abi,
    //       address: contract_connect.address,
    //       functionName: "checkAccount",
    //       args: [queryParam, (999).toString()],
    //     });
    //     console.log("Hello...");
    //   };
    //   console.log("veendum hello");
    //   var someAddress = await addressReturned();
    //   console.log("aaro address:", someAddress.address);
    //   if (someAddress) {
    //     console.log("addressReturned:", addressReturned);
    //     setAva(false);
    //   } else {
    //     setAva(true);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    try {
      const apiurl = config.backend;
      const res = await axios.post(`${apiurl}/coinbase/getvirtuals`, {
        number: queryParam,
      });

      if (res.status === 204) {
        setAva(true);
      } else {
        setAva(false);
      }
    } catch (error) {
      console.log("errror in checking numnber", error);
    }
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

  return (
    <div className="searchResultsScreen">
      <PhoneSearchInput
        initialValue={queryParam}
        update={updatePage}
        setUpdate={setUpdatePage}
      />

      <div className="searchResultsMain">
        <h3>Search results</h3>
        <p>
          The number you are looking for is{" "}
          {ava ? "available!" : "unavailable!"}
        </p>
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
            onClick={() => {
              console.log(cart);
              localStorage.setItem("in", true);
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
