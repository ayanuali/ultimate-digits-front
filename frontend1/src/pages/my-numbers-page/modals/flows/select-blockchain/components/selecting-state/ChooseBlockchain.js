import React, { useState } from "react";
import CloseIcon from "../../../../../../../assets/my-numbers-page/modals/close-icon.svg";
import FoldersIcon from "../../../../../../../assets/my-numbers-page/modals/folders-icon.svg";
import blockchainOptionData from "./blockchainOption.data";

import "./ChooseBlockchain.css";
import BlockchainChoosingBox from "./BlockchainChoosingBox";

const ChooseBlockchain = ({ closeModal, setBlOption }) => {

  const [currentState, setCurrentState] = useState("selectingState");


  return (
    <div className="chooseBlockchainWrapper">
      <div className="chooseBlockchainTopClose">
        <img
          src={CloseIcon}
          className="chooseBlockchainTopCloseImg"
          onClick={closeModal}
        />
      </div>

      <img src={FoldersIcon} />
      <h2>Select blockchain</h2>
      <p>Which blockchain would you like to mint your nft number on?</p>

      <div className="chooseBlockchainOption">
        {blockchainOptionData.map((option, i) => (
          <BlockchainChoosingBox
            name={option.name}
            description={option.description}
            logo={option.icon}
            state={option.state}
            active={currentState==option.state? true : false}
            setCurrentState={setCurrentState}
            key={i}
          />
        ))}
      </div>

      <button className="blueRoundedBtn" onClick={()=>setBlOption(currentState)}>Proceed</button>
    </div>
  );
};

export default ChooseBlockchain;
