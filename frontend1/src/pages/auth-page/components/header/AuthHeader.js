import React from "react";
import "./AuthHeader.css";
import CloseIcon from "../../../../assets/login-page/header/close-icon.svg";

import { useNavigate } from "react-router-dom";

const AuthHeader = ({title}) => {

  const navigate = useNavigate();

  return (
    <div className="authHeader">
      <div className="authHeaderWrapper">
        <div style={{marginTop: '-0.7rem'}}><img src={CloseIcon} onClick={()=>navigate('/')}/></div>
        <div className="authHeaderStick" />
        {title}
        <div className="authHeaderStatus">In progress</div>
      </div>
    </div>
  );
};

export default AuthHeader;
