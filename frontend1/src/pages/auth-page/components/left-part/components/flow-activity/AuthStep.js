import CheckActive from "../../../../../../assets/login-page/left-part/check-active.svg";
import CheckInactive from "../../../../../../assets/login-page/left-part/check-inactive.svg";

import "./FlowActivity.css";

const AuthStep = ({ active, title, subtitle }) => {
  return (
    <div className="authStepWrapper">
      <img style={{marginTop: '4px'}} src={active ? CheckActive : CheckInactive} />
      <div className="authStepTxt">
        <h4 className={!active && "inactiveTitle"}>{title}</h4>
        <p className={!active && "inactiveSubtitle"}>{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthStep;
