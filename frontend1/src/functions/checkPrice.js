import React from "react";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";

const checkPrice = (number) => {
  console.log("called with", number);
  if (checkDiamondNumber(number)) {
    console.log("returning", 1);
    return "1";
  }

  if (checkGoldNumber(number)) {
    console.log("returning", 0.1);

    return "0.1";
  }

  if (checkSilverNumber(number)) {
    console.log("returning", 0.01);

    return "0.01";
  } else {
    console.log("returning", 0.001);

    return "0.001";
  }
};

export default checkPrice;
