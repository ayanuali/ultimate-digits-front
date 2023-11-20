import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SimIcon from "../../../assets/my-numbers-page/sim-icon.svg";
import ProgressIcon from "../../../assets/my-numbers-page/progress-green.svg";
import CheckedIcon from "../../../assets/my-numbers-page/check-green.svg";
import conABI from '../../../abi/abi.json';
import conABI1 from '../../../abi/abi1.json'
import config from '../../../config.json';
import "./MintNumberBox.css";
import { formatPhoneNumber } from "../../../functions/formatPhoneNumber";
import { Web3Storage } from 'web3.storage'
import { useNavigate } from "react-router";
import checkTier from "../../../functions/checkTier";

const MintNumberBox = ({  number, setOpenModal , signer, walletaddress, contract, setContract_connect}) => {
  const navigate = useNavigate();
  // Faked timeout to show that mint is done
  const [done, setDone] = useState(false);
  
  const i = 0;
  useEffect(() => {
    
      
    

    // const timer = setTimeout(performAction, 4000);
    
    // Cleanup the timer when the component unmounts or changes
    // return () => {clearTimeout(timer);}
    
  }, []);

  return (
    <div className="mintNumberBox">
      <div className="mintNumberBoxLeft">
        <img src={SimIcon} />
        <div className="mintNumberBoxLeftNumber">
          +999 {`${number && formatPhoneNumber(number)}`}
          <div className={`mintNumberBoxLeftNumberTier ${checkTier(number)}Tier`}>{`${checkTier(number)} Tier`}</div>
        </div>
      </div>

      <div className="mintNumberBoxRight">
        <div className="mintNumberBoxRightStatus">
          <h2>{done ? `Skale Blockchain` : `Minting in Progress`}</h2>
          <p>{done ? `Learn more about Skale` : `What does this mean?`}</p>
        </div>

        <div
          className="mintNumberBoxRightProgress"
          // onClick={() => setOpenModal(true)}
        >
          <img src={done ? CheckedIcon : ProgressIcon} className={!done && "loadState"} />
          {done ? `Minted` : `Minting`}
        </div>
      </div>
    </div>
  );
};
export default MintNumberBox;
