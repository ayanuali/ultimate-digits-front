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
      prod={false}
      projectId={"0f9bcc25-9ab2-42b5-90d2-122588e83383"}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </WalletProvider>
  </>
);
