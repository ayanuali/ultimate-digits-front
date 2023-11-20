import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import "./DVOIPPAge.css";
import { resolveAddress } from "ethers";
import Sidebardvoip from "../components/sidebardvoip";

export default function DVOIPPage() {
  return (
    <div className="homepage">
      <Sidebardvoip />
      <div className="hp-main">
        <div className="hp-navbar">
          <div className="text" style={{ marginTop: "-5px" }}>
            dVOIP
          </div>
          <div className="sub-text" style={{ marginTop: "-15px" }}>
            Utilize decentralized VOIP technology for wallet-to-wallet calls
          </div>
        </div>
        {/* <div className="hp-navbar"> */}
        <span className="coming_soon-1" style={{ marginTop: "30px" }}>
          Coming soon
        </span>
        <div className="sub-text-1" style={{ marginTop: "11px" }}>
          We will be launching this feature soon.
        </div>
      </div>
    </div>
  );
}
