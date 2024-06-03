import React from "react";
import checkPrice from "./checkPrice";

const checkTotalPrice = (arr) => {
  console.log("price checker", arr);
  let totalPrice = 0;
  arr.map((num) => {
    console.log("single num", num);
    const onep = checkPrice(num);
    console.log("onep", onep);
    totalPrice = totalPrice + parseFloat(onep);
  });
  console.log("total price", totalPrice);
  return totalPrice;
};

export default checkTotalPrice;
