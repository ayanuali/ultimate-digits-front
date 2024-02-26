import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <WalletProvider enableHostedBackups collectAndReportMetrics prod={false}>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletProvider>
  </>
);
