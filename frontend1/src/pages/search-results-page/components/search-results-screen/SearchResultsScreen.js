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
    const nums = generateDiamondNumbers(queryParam);
    const nums2 = generateGoldNumbers(queryParam);
    const nums3 = generateSilverNumbers(queryParam);
    const nums4 = generateRandomNumbers();


    try {
      const res = await axios.post(`http://localhost:8080/degen/generateNumbers`,{
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
    try {
      const addressReturned = async () => {
        console.log("Hii..");
        await readContract(connectConfig, {
          abi: contract_connect.abi,
          address: contract_connect.address,
          functionName: "checkAccount",
          args: [queryParam, (999).toString()],
        });
        console.log("Hello...");
      };
      console.log("veendum hello");
      var someAddress = await addressReturned();
      console.log("aaro address:", someAddress.address);
      if (someAddress) {
        console.log("addressReturned:", addressReturned);
        setAva(false);
      } else {
        setAva(true);
      }
    } catch (e) {
      console.log(e);
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
