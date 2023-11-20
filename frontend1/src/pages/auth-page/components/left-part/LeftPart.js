import Cart from "./components/cart/Cart";
import AuthStep from "./components/flow-activity/AuthStep";
import authsteptsData from "./components/flow-activity/authstepts.data";
import FlowActivity from "./components/flow-activity/FlowActivity";

import "./LeftPart.css";

const LeftPart = ({ cartArray, currentState }) => {
  return (
    <div className="leftPart">
      <div className="leftPartWrapper">
        {currentState == "connectWallet" || currentState == "mintNumber" || currentState == "mintProgress" ? (
          <FlowActivity />
        ) : (
          <Cart cartArray={cartArray} currentState={currentState} />
        )}

        <div className="leftPartBtmTxt">© Ultimate Digits 2023.</div>
      </div>
    </div>
  );
};

export default LeftPart;
