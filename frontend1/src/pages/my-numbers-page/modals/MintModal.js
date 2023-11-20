import React, { useState } from "react";
import ReactModal from "react-modal";
import SelectBlockchain from "./flows/select-blockchain/SelectBlockchain";

const SelectBlockchainModal = ({openModal, setOpenModal}) => {
  
  const [blOption, setBlOption] = useState("selecting");

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <SelectBlockchain closeModal={()=>setOpenModal(false)}/>
    </ReactModal>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "#171830",
    border: "1px solid rgba(216, 230, 253, 0.16)",
    borderRadius: "12px",
    width: "364px"
  },

  overlay: {
    background: "rgba(6, 6, 30, 0.64)",
    backdropFilter: "blur(2px)"
  }
};

export default SelectBlockchainModal;
