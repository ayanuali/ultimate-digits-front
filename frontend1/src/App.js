import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import topLogo from "../src/assets/ud-logo.png";
import "./App.css";
import Navbar from "./layout/navbar/Navbar";
import AuthenticationPage from "./pages/auth-page/AuthenticationPage";

import HomePage from "./pages/home-page/HomePage";

import SearchResultsPage from "./pages/search-results-page/SearchResultsPage";

import { checkUser } from "./services/magic";
import Component1 from "./Hook";

import SearchResultsPageNow from "./pages/search-results-page/SearchResultsPageNow";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
 avalanche
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// const avalanche = {
//   id: 2484,
//   name: 'Unicorn Ultra Nebulas Testnet',
//   iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'U2U', symbol: 'U2U', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://rpc-nebulas-testnet.uniultra.xyz'] },
//   },
//   blockExplorers: {
//     default: { name: 'u2uscan', url: 'https://testnet.u2uscan.xyz' },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 11_907_934,
//     },
//   },
// }

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [avalanche],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {

  
  //function to set various variable states
  const [user, setUser] = useState({
    isLoggedIn: null,
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [contract, setcontract] = useState({});
  const [contract_connect, setContract_connect] = useState({});
  const [signer, setsigner] = useState({});
  const [walletaddress, setwalletaddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [nav, setNav] = useState("1");
  const [code, setCode] = useState("999");

  const [log, setLog] = useState(false);
  const [cartArray, setcartArray] = useState([]);
  // const [tier, setTier] = useState("bronze");

  //function to set users
  const validateUser = async () => {
    try {
      await checkUser(setUser);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  console.log(window.location.pathname);
  useEffect(() => {
    validateUser();
  }, []);

  //function  to set navigation bar
  function exist() {
    console.log(nav);
    if (nav == "1")
      return <Navbar loggedIn={user.isLoggedIn} setLog={setLog} />;
    if (nav == "2")
      return (
        <div className="ud-logo">
          <img src={topLogo} className="img-logo" alt="ultimate digits"></img>
        </div>
      );
    return "";
  }
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
    <BrowserRouter>
  
        {!loading && (
          <div className="App">
            {exist()}
            <Component1>
              <Routes>
          
              
        
                <Route
                  path={"/"}
                  element={<HomePage setCode={setCode} />}
                />
                <Route
                  path={"/search-results"}
                  element={
                    <SearchResultsPage contract_connect={contract_connect} types={true} />
                  }
                />
                <Route
                  path={"/search-results-now"}
                  element={
                    <SearchResultsPageNow contract_connect={contract_connect} type={false} />
                  }
                />
                <Route
                  path={"/signup"}
                  element={
                    <AuthenticationPage
                      walletaddress={walletaddress}
                      setwalletaddress={setwalletaddress}
                      signer={signer}
                      setsigner={setsigner}
                      setcontract={setcontract}
                      number={number}
                      setNumber={setNumber}
                      setNav={setNav}
                      setUser={setUser}
                      user={user}
                      log={log}
                      contract_connect={contract_connect}
                      setContract_connect={setContract_connect}
                      setcartArray={setcartArray}
                      cartArray={cartArray}
                    />
                  }
                />
         
              </Routes>
            </Component1>
          </div>
        )}
    
    </BrowserRouter>

    </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
