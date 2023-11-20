import Sidebar from "../components/sidebar";
import Sidebarmessenger from "../components/sidebarmessenger";
import "./MessengerPage.css";

export default function MessengerPage() {
  return (
    <div className="homepage">
      <Sidebarmessenger />
      <div className="hp-main">
        <div className="hp-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            Messenger
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Ensure the secuirty of wallet-to-wallet messaging
          </div>
        </div>
        {/* <div className="hp-navbar"> */}
        <span className="coming_soon-1" style={{ marginTop: "30px" }}>
          Coming soon
        </span>
        <div className="sub-text-1" style={{ marginTop: "12px" }}>
          We will be launching this feature soon.
        </div>
      </div>
    </div>
  );
}
