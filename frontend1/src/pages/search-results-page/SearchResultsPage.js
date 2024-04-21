import React, { useState } from "react";
import SearchResultsScreen from "./components/search-results-screen/SearchResultsScreen";
import CheckoutScreen from "./components/checkout-screen/CheckoutScreen";
import "./SearchResultsPage.css";

const SearchResultsPage = ({ contract_connect, types }) => {
  //function to set variables
  const [proceedTo, setProceedTo] = useState("searchResults");
  const [cartArray, setCartArray] = useState([]);

  //function to set the searching cart side screen flow
  const flowHandler = (type) => {
    switch (type) {
      case "searchResults":
        return (
          <SearchResultsScreen types={types}
            setProceedTo={setProceedTo}
            setCartArray={setCartArray}
            contract_connect={contract_connect}
          />
        );
      case "checkOut":
        return (
          <CheckoutScreen cartArray={cartArray} setCartArray={setCartArray} />
        );
      default:
        return <SearchResultsScreen types={types} />;
    }
  };

  return <div className="searchResultsWrapper">{flowHandler(proceedTo)}</div>;
};

export default SearchResultsPage;
