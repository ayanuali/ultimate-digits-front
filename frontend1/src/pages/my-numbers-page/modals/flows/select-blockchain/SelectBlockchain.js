import React, { useState } from "react";

import "./SelectBlockchain.css";
import ChooseBlockchain from "./components/selecting-state/ChooseBlockchain";
import SkaleState from "./components/skale-state/SkaleState";
import EthereumState from "./components/ethereum-state/EthereumState";

const SelectBlockchain = ({ closeModal }) => {
  const [blOption, setBlOption] = useState("selectingState");

  const stateHandler = (type) => {
    switch (type) {
      case "selectingState":
        return (
          <ChooseBlockchain closeModal={closeModal} setBlOption={setBlOption} />
        );
      case "skaleState":
        return <SkaleState />;
      case "ethereumState":
        return <EthereumState />;
      default:
        return (
          <ChooseBlockchain closeModal={closeModal} setBlOption={setBlOption} />
        );
    }
  };

  return stateHandler(blOption);
};

export default SelectBlockchain;
