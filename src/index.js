import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletProvider
  verbose
    enableHostedBackups={true}
    collectAndReportMetrics
    prod={false}
    projectId={"a6ff9b4c-9586-4920-a38f-6a77bf39a375"}
  >
    <App />
  </WalletProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
