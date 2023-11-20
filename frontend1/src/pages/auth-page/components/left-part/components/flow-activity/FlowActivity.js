import React from "react";

import AuthStep from "./AuthStep";
import authsteptsData from "./authstepts.data";

import Logo from "../../../../../../assets/ud-logo.png";

import "./FlowActivity.css";

const FlowActivity = () => {
  return (
    <div className="flowActivity">
      <img src={Logo} className="flowActivityLogo" />

      <div className="flowActivityTxt">
        {authsteptsData.map((option, i) => (
          <AuthStep
            title={option.title}
            subtitle={option.subtitle}
            active={i === 2? false : true}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowActivity;
