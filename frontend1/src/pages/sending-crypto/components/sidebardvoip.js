import "./sidebar.css";
import udLogo from "../../../assets/assets/ud-logo.svg";
import { Link } from "react-router-dom";

export default function Sidebardvoip() {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <Link to="/">
            <img src={udLogo}></img>
          </Link>
        </div>
        <div className="links">
          <div className="home">
            <Link to="/sending-crypto/home-page">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                >
                  <path
                    d="M14.865 14.5907C14.865 15.0228 14.5148 15.373 14.0827 15.373H3.12958C2.6975 15.373 2.34722 15.0228 2.34722 14.5907V7.5494H0.00012207L8.07983 0.20419C8.37823 -0.0670868 8.83403 -0.0670868 9.13243 0.20419L17.2121 7.5494H14.865V14.5907ZM7.82377 9.11413V13.8083H9.3885V9.11413H7.82377Z"
                    fill="#5F6A85"
                  />
                </svg>
                <span className="link-name" style={{ verticalAlign: 0 }}>
                  Home
                </span>
              </div>
            </Link>
          </div>
          <div className="payment">
            <Link to="/sending-crypto/paymentRealNumber">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame">
                    <path
                      id="Vector"
                      d="M16.9999 6.50196H3.00818V4.4032C3.00818 4.01683 3.3214 3.70361 3.70777 3.70361H16.3004C16.6867 3.70361 16.9999 4.01683 16.9999 4.4032V6.50196ZM16.9999 7.90114V15.5966C16.9999 15.983 16.6867 16.2962 16.3004 16.2962H3.70777C3.3214 16.2962 3.00818 15.983 3.00818 15.5966V7.90114H16.9999ZM9.30448 11.3991V9.65011L6.15632 12.7983H13.502V11.3991H9.30448Z"
                      fill="#5F6A85"
                    />
                  </g>
                </svg>

                <span className="link-name" style={{ verticalAlign: 0 }}>
                  Payments
                </span>
              </div>
            </Link>
          </div>
          <div className="notification">
            <div className="disabled">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.9427 12.9524H16.2697V14.2794H2.99988V12.9524H4.32686V8.30794C4.32686 5.37645 6.70331 3 9.63481 3C12.5663 3 14.9427 5.37645 14.9427 8.30794V12.9524ZM7.64433 15.6064H11.6253V16.9333H7.64433V15.6064Z"
                  fill="#5F6A85"
                />
              </svg>
              <span className="link-name">Notifications</span>
              <span className="coming_soon">Coming soon</span>
            </div>
          </div>
          <div className="auth">
            <div className="disabled">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.2382 7.111H15.6509C16.041 7.111 16.3572 7.42725 16.3572 7.81736V16.2936C16.3572 16.6838 16.041 17 15.6509 17H4.34918C3.95907 17 3.64282 16.6838 3.64282 16.2936V7.81736C3.64282 7.42725 3.95907 7.111 4.34918 7.111H5.76189V6.40465C5.76189 4.06398 7.65937 2.1665 10 2.1665C12.3407 2.1665 14.2382 4.06398 14.2382 6.40465V7.111ZM12.8255 7.111V6.40465C12.8255 4.8442 11.5604 3.57922 10 3.57922C8.43959 3.57922 7.17461 4.8442 7.17461 6.40465V7.111H12.8255ZM9.29368 11.3491V12.7619H10.7064V11.3491H9.29368ZM6.46825 11.3491V12.7619H7.88096V11.3491H6.46825ZM12.1191 11.3491V12.7619H13.5318V11.3491H12.1191Z"
                  fill="#5F6A85"
                />
              </svg>
              <span className="link-name">Multi-factor auth</span>
              <span className="coming_soon">Coming soon</span>
            </div>
          </div>
          <div className="dVOIP">
            {/* <div className='disabled'>       */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame">
                <path
                  id="Vector"
                  d="M17 13.4378V16.1881C17 16.5964 16.6843 16.9352 16.2771 16.964C15.9369 16.988 15.6593 17 15.4444 17C8.57153 17 3 11.4285 3 4.55556C3 4.34066 3.01202 4.06312 3.03605 3.72294C3.06484 3.31568 3.40362 3 3.81189 3H6.5623C6.76194 3 6.92915 3.15122 6.94919 3.34984C6.96719 3.52817 6.98392 3.67133 6.99939 3.77935C7.15672 4.87812 7.47808 5.92395 7.93788 6.89125C8.01168 7.04651 7.96355 7.23235 7.82366 7.33227L6.14498 8.5314C7.16696 10.9186 9.08137 12.8331 11.4686 13.8551L12.6655 12.1793C12.7667 12.0377 12.9548 11.989 13.1119 12.0636C14.0791 12.523 15.1249 12.844 16.2235 13.001C16.3308 13.0164 16.4731 13.0329 16.6502 13.0508C16.8488 13.0709 17 13.2381 17 13.4378Z"
                  fill="#FEFFFF"
                />
              </g>
            </svg>
            <span className="link-name" style={{ color: "white" }}>
              dVOIP
            </span>
            <span className="coming_soon">Coming soon</span>
            {/* </div>     */}
          </div>

          <div className="messenger">
            {/* <div className="disabled"> */}

            <Link to="/sending-crypto/messenger-page">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.37414 14.7115L3.46155 17V4.90385C3.46155 4.54274 3.75429 4.25 4.11539 4.25H15.8846C16.2457 4.25 16.5385 4.54274 16.5385 4.90385V14.0577C16.5385 14.4188 16.2457 14.7115 15.8846 14.7115H6.37414ZM6.73078 8.82692V10.1346H8.03847V8.82692H6.73078ZM9.34616 8.82692V10.1346H10.6539V8.82692H9.34616ZM11.9615 8.82692V10.1346H13.2692V8.82692H11.9615Z"
                    fill="#5F6A85"
                  />
                </svg>
                <span className="link-name">Messenger</span>
                <span className="coming_soon">Coming soon</span>
              </div>
            </Link>
          </div>
          {/* </div> */}
        </div>
      </div>
      <Link to="/">
        <div className="log_out">
          <div id="log">Log out</div>
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.25 14.5H13.75V16H4.75V4H13.75V5.5H15.25V3.25C15.25 2.83579 14.9142 2.5 14.5 2.5H4C3.58578 2.5 3.25 2.83579 3.25 3.25V16.75C3.25 17.1642 3.58578 17.5 4 17.5H14.5C14.9142 17.5 15.25 17.1642 15.25 16.75V14.5ZM13.75 9.25H8.5V10.75H13.75V13L17.5 10L13.75 7V9.25Z"
                fill="#D8E4FD"
              />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
