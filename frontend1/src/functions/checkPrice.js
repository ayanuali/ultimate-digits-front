import React from "react";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";

const checkPrice = (number) => {
  if (checkDiamondNumber(number)) {
    return "250";
  }

  if (checkGoldNumber(number)) {
    return "100";
  }

  if (checkSilverNumber(number)) {
    return "50";
  } else {
    return "5";
  }
};

export default checkPrice;