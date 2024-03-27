import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <WalletProvider
verbose={true}
      enableHostedBackups={true}
      collectAndReportMetrics
      prod={false}
      projectId={"a6ff9b4c-9586-4920-a38f-6a77bf39a375"}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </WalletProvider>
  </>
);
