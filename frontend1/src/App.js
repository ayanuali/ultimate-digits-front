import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import topLogo from "../src/assets/ud-logo.png";
import "./App.css";
import Navbar from "./layout/navbar/Navbar";
import AuthenticationPage from "./pages/auth-page/AuthenticationPage";
import LoadingPageReal from "./pages/auth-page/LoadingPageReal";
import ConfirmationPageReal2 from "./pages/confirmation-page/ConfirmationPageReal2";
import ConfirmationPageRealRename from "./pages/confirmation-page/ConfirmationPageRealRename";
import ConfirmationPageVir from "./pages/confirmation-page/ConfirmationPageVir";
import HomePage from "./pages/home-page/HomePage";
import LandingPage from "./pages/landing-page/LandingPage";
import MyNumbersPage from "./pages/my-numbers-page/MyNumbersPage";
import SearchResultsPage from "./pages/search-results-page/SearchResultsPage";
import SelectionPage from "./pages/selection-page/SelectionPage";
import HomePageSendingCrypto from "./pages/sending-crypto/HomePageSendingCrypto";
import DVOIPPage from "./pages/sending-crypto/dvoip/dvoippage";
import MessengerPage from "./pages/sending-crypto/messenger/MessengerPage";
import Cryptopage1 from "./pages/sending-crypto/sendingCrypto/Cryptopage1";
import Cryptopage2 from "./pages/sending-crypto/sendingCrypto/Cryptopage2";
import Cryptopage4 from "./pages/sending-crypto/sendingCrypto/Cryptopage4";
import Cryptopage5 from "./pages/sending-crypto/sendingCrypto/Cryptopage5";
import PaymentpageReal from "./pages/sending-crypto/sendingPayment/PaymentpageReal";
import PaymentpageVirtual from "./pages/sending-crypto/sendingPayment/PaymentpageVirtual";
import { checkUser } from "./services/magic";
import Component1 from "./Hook";

function App() {

  //function to set various variable states
  const [user, setUser] = useState({ isLoggedIn: null, email: "" ,phoneNumber: ""});
  const [loading, setLoading] = useState(true);
  const [contract, setcontract] = useState({});
  const [contract_connect,setContract_connect] = useState({});
  const [signer , setsigner] = useState({});
  const [walletaddress, setwalletaddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [waddress, setwaddress] = useState("");
  const [nav,setNav] = useState("1");
  const [toNumber, setToNumber] = useState("");
  const [amount, setAmount] = useState(null);
  const [type,setType] = useState("Real");
  const [toAddress, setToAddress] = useState("");
  const [code,setCode] = useState("999");
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentWallet, setCurrentWallet] = useState("");
  const [tocode,settoCode] = useState("999");
  const [log, setLog] = useState(true);
  const [ cartArray,setcartArray] = useState([]);
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
  function exist (){
    console.log(nav);
    if(nav == "1") return <Navbar loggedIn={user.isLoggedIn} setLog={setLog}/>;
    if(nav == "2") return <div className="ud-logo" >
    <img src={topLogo} className="img-logo" alt="ultimate digits"></img>
    </div>;
    return "";
    
    
  }
  return (
    <BrowserRouter>
    
     {!loading &&
      <div className="App">
        {exist()}
        <Component1>
        <Routes>
          <Route path={"/" }element={<LandingPage setNav={setNav} setLog={setLog}/>} />
          <Route path={"/home"} element={<LandingPage setNav={setNav} setLog={setLog}/>} />
          <Route path={"/selection-page/virtual-number"} element={<ConfirmationPageVir  setContract_connect= {setContract_connect} setwaddress={setwaddress} setsigner={setsigner}/>} />
          <Route path={"/login"} element={<ConfirmationPageRealRename  setContract_connect= {setContract_connect} setwaddress={setwaddress} setsigner={setsigner} setCode = {setCode} setNumber={setNumber}/>} />
          <Route path={"/selection-page/virtual-number/home"} element={<HomePage setCode={setCode} />} />
          <Route path={"/search-results"} element={<SearchResultsPage contract_connect= {contract_connect}/>} />
          <Route path={"/signup"} element={<AuthenticationPage walletaddress={walletaddress} setwalletaddress={setwalletaddress} signer={signer} setsigner={setsigner} setcontract={setcontract} number={number} setNumber={setNumber} setNav={setNav} setUser={setUser} user={user} log={log} contract_connect={contract_connect} setContract_connect={setContract_connect} setcartArray={setcartArray} cartArray={cartArray}/>} />
          <Route path={"/selection-page/my-numbers"} element={<MyNumbersPage  signer={signer} walletaddress={walletaddress} contract={contract} setContract_connect={setContract_connect} user={user} setUser={setUser}/>} />
          <Route path={"/selection-page"} element={<SelectionPage setNav={setNav}/>} />
          <Route path={"/real-number"} element={<LoadingPageReal setContract_connect={setContract_connect} waddress={waddress} setwaddress={setwaddress} code={code} setCode={setCode} />} />
          <Route path={"/selection-page/my-numbers/confirm-page"} element={<ConfirmationPageReal2 walletaddress={walletaddress} number={number} code={code} cartArray={cartArray} setNumber={setNumber}/>}/>
          <Route path={"/sending-crypto/home-page"} element={<HomePageSendingCrypto setNav={setNav} setCurrentNumber={setCurrentNumber} setCurrentWallet={setCurrentWallet} currentNumber={currentNumber} currentWallet={currentWallet} contract_connect={contract_connect}/>}/>
          <Route path={'/sending-crypto/paymentRealNumber'} element={<PaymentpageReal setNav={setNav} currentNumber={currentNumber} currentWallet={currentWallet} setToNumber={setToNumber} toNumber={toNumber} contract_connect={contract_connect} setType={setType} setToAddress={setToAddress} settoCode={settoCode} tocode={tocode}/>} />
          <Route path={'/sending-crypto/paymentVirtualNumber'} element={<PaymentpageVirtual setNav={setNav} code ={code} currentWallet={currentWallet} setToNumber={setToNumber} toNumber={toNumber} contract_connect={contract_connect} setType={setType} setToAddress={setToAddress} settoCode={settoCode}/>} />
          <Route path={'/sending-crypto/confirmTransaction'} element={<Cryptopage1 setNav={setNav} code={tocode} amount={amount} setAmount={setAmount} currentWallet={toAddress} toNumber={toNumber} type={type} />} />
          <Route path={'/sending-crypto/confirmPayment'} element={<Cryptopage2  setNav={setNav} code={tocode} amount={amount} currentWallet={currentWallet} signer={signer} toAddress={toAddress} type={type} toNumber={toNumber} number={currentNumber} tocode={code}/>} />
          <Route path={'/sending-crypto/last-page'} element={<Cryptopage4 setNav={setNav} code={tocode} amount={amount} currentWallet={currentWallet} signer={signer} toAddress={toAddress} type={type} toNumber={toNumber}/>} />
          <Route path={'/sending-crypto/dvoip-page'} element={<DVOIPPage />}/>
          <Route path ={'/sending-crypto/messenger-page'} element={<MessengerPage/>} />
          <Route path= {'/sending-crypto/invalid-number'} element = {<Cryptopage5 setNav={setNav} code={tocode} amount={amount} currentWallet={currentWallet} signer={signer} toAddress={toAddress} type={type} toNumber={toNumber} tocode={code} number={currentNumber}/>}/>
        </Routes>
        </Component1>
      </div>}
    </BrowserRouter>
  );
}

export default App;

