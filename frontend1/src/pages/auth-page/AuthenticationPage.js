import React, { useEffect, useState } from "react";
import "./AuthenticationPage.css";
import { checkUser } from "../../services/magic";
import LoginForm from "./components/login-form/LoginForm";
import LeftPart from "./components/left-part/LeftPart";
import ClaimOrder from "./components/order-claim/ClaimOrder";
import ConnectWallet from "./components/connect-wallet/ConnectWallet";
import MintNumber from "./components/mint-number/MintNumber";
import MintProgress from "./components/mint-progress/MintProgress";
import LoadPage from "../../utils/loaders/LoadPage";
import ConfirmationPageReal1 from "../confirmation-page/ConfirmationPageReal1";
import ConfirmationPageVirtual1 from "../confirmation-page/ConfirmationPageVirtual1";
import CartShow from "./components/cart-show/cart_show";

const AuthenticationPage = ({
  setwalletaddress,
  walletaddress,
  signer,
  setsigner,
  setcontract,
  setNumber,
  number,
  setUser,
  user,
  log,
  setNav,
  contract_connect,
  setContract_connect,
  cartArray,
  setcartArray,
}) => {
  //function to declare various variables
  const [headerTitle, setHeaderTitle] = useState("");
  const [check, setCheck] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  const [proceedTo, setProceedTo] = useState("showCart");

  //function ro handle the flow of virtual track
  const flowHandler = (type) => {
    switch (type) {
      case "login":
        return (
          <LoginForm
            setProceedTo={setProceedTo}
            setsigner={setsigner}
            setwalletaddress={setwalletaddress}
            setcontract={setcontract}
            setUser={setUser}
            user={user}
            log={log}
            setNav={setNav}
          />
        );
      case "showCart":
        return (
          <CartShow
            setProceedTo={setProceedTo}
            cartArray={cartArray}
            setcartArray={setcartArray}
            contract_connect={contract_connect}
            setContract_connect={setContract_connect}
            signer={signer}
            walletaddress={walletaddress}
            number={number}
            setwalletaddress={setwalletaddress}
            setcontract={setcontract}
          />
        );
      case "claimOrder":
        return <ClaimOrder setProceedTo={setProceedTo} />;
      case "connectWallet":
        return (
          <ConnectWallet
            setProceedTo={setProceedTo}
            setsigner={setsigner}
            setwalletaddress={setwalletaddress}
            setcontract={setcontract}
          />
        );
      case "mintNumber":
        return (
          <MintNumber
            setProceedTo={setProceedTo}
            cartArray={cartArray}
            setNumber={setNumber}
            walletaddress={walletaddress}
            signer={signer}
          />
        );
      case "purchaseConfirmation":
        return (
          <ConfirmationPageVirtual1
            setProceedTo={setProceedTo}
            number={number}
            contract_connect={contract_connect}
            signer={signer}
            cartArray={cartArray}
          />
        );
      case "forwardMinting":
        return <ConfirmationPageReal1 setProceedTo={setProceedTo} />;
      case "mintProgress":
        return (
          <MintProgress
            setProceedTo={setProceedTo}
            walletaddress={walletaddress}
            number={number}
          />
        );
      default:
        return (
          <LoginForm
            setProceedTo={setProceedTo}
            setsigner={setsigner}
            setwalletaddress={setwalletaddress}
            setcontract={setcontract}
            setUser={setUser}
            user={user}
            log={log}
            setNav={setNav}
          />
        );
    }
  };

  // Get the query parameter string
  const queryString = window.location.search;

  // Extract the "cart" parameter value from the query string
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");

  // Split the cart parameter string at each comma and convert each element to a number
  const cartArray1 = cartParam ? cartParam.split(",").map(Number) : [];

  //function to check the user logged in
  const validateUser = async () => {
    setLoading(true);
    if (user.isLoggedIn == null) {
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNav("1");
    if (user.isLoggedIn) {
      setProceedTo("showCart");
      setcartArray(cartArray1);
    }
    if (cartArray.length == 0) {
      setHeaderTitle("Sign up");
    } else {
      setHeaderTitle("Claim your nft number");
    }
    validateUser();
  }, [check, user.isLoggedIn]);

  return cartArray.length == 0 ? (
    <div className="authPageCentered">
      <LoginForm
        setProceedTo={setProceedTo}
        setsigner={setsigner}
        setwalletaddress={setwalletaddress}
        setcontract={setcontract}
        setUser={setUser}
        user={user}
        log={log}
        setNav={setNav}
      />
    </div>
  ) : loading ? (
    <LoadPage />
  ) : (
    <div className="authPage">
      <div className="authPageWrapper">
        {proceedTo != "purchaseConfirmation" ? (
          <LeftPart cartArray={cartArray} currentState={proceedTo} />
        ) : (
          ""
        )}

        {flowHandler(proceedTo)}
      </div>
    </div>
  );
};

export default AuthenticationPage;
