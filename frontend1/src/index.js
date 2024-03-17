import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <WalletProvider
      enableHostedBackups={true}
      collectAndReportMetrics
      prod={true}
      projectId={"a6ff9b4c-9586-4920-a38f-6a77bf39a375"}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </WalletProvider>
  </>
);
