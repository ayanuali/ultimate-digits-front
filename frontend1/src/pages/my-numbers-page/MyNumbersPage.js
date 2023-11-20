import React, { useEffect, useState } from "react";
import { checkUser } from "../../services/magic";

import "./MyNumbersPage.css";
import MintNumberBox from "./components/MintNumberBox";
import SelectBlockchainModal from "./modals/MintModal";

const MyNumbersPage = ({
  signer,
  walletaddress,
  contract,
  setContract_connect,
  price,
  setPrice,
  user,
  setUser,
}) => {
  const [openModal, setOpenModal] = useState(false);

  // Get the query parameter string
  const queryString = window.location.search;

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");

  // Split the cart parameter string at each comma and convert each element to a number
  const cartArray = cartParam && cartParam.split(",");

  console.log(cartArray);

  // const [user, setUser] = useState({ isLoggedIn: null, email: "" });
  const [loading, setLoading] = useState(true);

  const validateUser = async () => {
    if (user.isLoggedIn == null) {
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(user.isLoggedIn);
    validateUser();
  }, []);

  return (
    user.isLoggedIn && (
      <>
        <div className="myNumbersWrapper">
          <div className="myNumbersTop">
            <h2>My numbers</h2>
            <p>Numbers owned by you</p>
          </div>

          <div className="myNumbersTable">
            {cartArray.map((number, i) => (
              <MintNumberBox
                number={number}
                setOpenModal={setOpenModal}
                key={i}
                signer={signer}
                walletaddress={walletaddress}
                contract={contract}
                setContract_connect={setContract_connect}
              />
            ))}
          </div>

          <div className="myNumbersBtmBorder" />
        </div>{" "}
        {/* <SelectBlockchainModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      /> */}
      </>
    )
  );
};

export default MyNumbersPage;
