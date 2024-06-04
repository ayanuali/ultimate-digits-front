import React from "react";
import checkPrice from "./checkPrice";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";
import checkTier from "./checkTier";

const checkTotalPrice = (arr) => {
  console.log("price checker", arr);
  let totalPrice = 0;
  arr.map((num, index) => {
    console.log("index", index);
    console.log("single num", num);
    // const onep = checkPrice(num);
    console.log("tier", checkTier(num));

    if (checkDiamondNumber(num.toString())) {
      console.log("totalPrice before diamonf", totalPrice);
      console.log("");
      totalPrice += 1;
    } else if (checkGoldNumber(num.toString())) {
      console.log("totalPrice before golf");

      console.log(totalPrice);

      totalPrice += 0.1;
    } else if (checkSilverNumber(num.toString())) {
      console.log(totalPrice);

      totalPrice += 0.01;
    } else {
      console.log("totalPrice before bronze");

      console.log(totalPrice);

      totalPrice += 0.001;
    }

    // console.log("onep", onep);
    // totalPrice = totalPrice + parseFloat(onep);
  });
  console.log("total price", totalPrice);
  return totalPrice;
};

export default checkTotalPrice;
