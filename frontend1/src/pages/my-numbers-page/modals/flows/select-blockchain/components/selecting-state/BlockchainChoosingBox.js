import React, { useState } from "react";
import "./BlockchainChoosingBox.css";

const BlockchainChoosingBox = ({
  name,
  description,
  logo,
  state,
  active,
  setCurrentState,
}) => {
  return (
    <div
      className={
        active ? "blockchainChoosingBox blOptActive" : "blockchainChoosingBox"
      }
      onClick={() => setCurrentState(state)}
    >
      <img src={logo} />
      <div className="blockchainChoosingBoxRight">
        <h3>{name}</h3>
        <h4>{description}</h4>
        <a>View more</a>
      </div>
    </div>
  );
};

export default BlockchainChoosingBox;
