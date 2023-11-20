import { ethers } from "ethers";
import React from 'react'
import { useContext, useState } from "react";
import { Web3Storage } from "web3.storage";
import { UserContext } from "../../../../Hook.js";
import { abi_NFT, address_NFT } from "../../../../abi/Nft.js";
import conABI from "../../../../abi/abi.json";
import config from "../../../../config.json";
import checkTotalPrice from "../../../../functions/checkTotalPrice";
import PhoneNumberBox from "../../../../utils/boxes/PhoneNumberBox_show";
import LoadPage from "../../../../utils/loaders/LoadPage";
import "./cart_show.css";


function CartShow({
  cartArray,
  setProceedTo,
  setcartArray,
  contract_connect,
  setContract_connect,
  signer,
  number,
  walletaddress,
  setwalletaddress,
  setcontract,
}) {
  //initializing and declaring various variables
  const [cart, setCart] = useState([]);
  const {flag1,setflag1}=React.useContext(UserContext);
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");
  // const [tokenId,setTokenId]=useState("");
  const {tokenId,setTokenId}=React.useContext(UserContext);
  console.log(tokenId)
  const data = {
    address: walletaddress,
    number: number,
    "contract'address": config.address_nft,
  };
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const i = 0;


  //funcion to ensure virtual number purchase
  async function buyNumber() {
    setLoad(true);
    // send to which address ?
    const toaddress = "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540";
    var amount
    if(flag1){amount=parseInt(checkTotalPrice(cartArray)-5) * 0.0046790195017}
    else{amount=parseInt(checkTotalPrice(cartArray)) * 0.0046790195017;}
    setflag1("0")
    // var amount = parseInt(checkTotalPrice(cartArray)) * 0.0046790195017;
    console.log(amount)
    let amt = ethers.parseUnits(amount.toString());
    const transacamount = "0x" + amt.toString(16);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
    });
    console.log(amt);

    try {
      signer
        .sendTransaction({
          to: toaddress,
          value: transacamount,
        })
        .then(async (txHash) => {
          console.log(txHash.hash);
          const provider = new ethers.BrowserProvider(window.ethereum);
          console.log(provider);

          //This is used to acces the checked in accounts
          provider
            .getSigner()
            .then(async (res) => {
              console.log(res);

              const contract = new ethers.Contract(
                config.address_nft,
                conABI,
                res
              );
              setcontract(contract);

              var walletaddress = res.address;

              console.log(walletaddress);
              setwalletaddress(walletaddress);

              const client = new Web3Storage({ token: config.token });
              console.log(client);
              const blob = new Blob([JSON.stringify(data)], {
                type: "application/json",
              });

              const files = [
                new File([blob], "ultimate_digits_nft" + i + ".json"),
              ];
              const cid = await client.put(files);
              console.log("stored files with cid:", cid);
              try {
                console.log(contract);
                const transaction = await contract.mint(
                  "https://ipfs.io/ipfs/" + cid + "/ultimate_digits_nft0.json"
                );

                //function to upload metadata
                transaction.wait().then((res) => {
                  console.log(res);
                  setLoad(false);
                  setProceedTo("purchaseConfirmation");
                });
                // const transaction2=await contract.SettingUniqueId(number," ")
                // transaction.wait().then((res) => {
                //   console.log(res);
                //   setLoad(false);
                //   setProceedTo("purchaseConfirmation");
                // });
                // console.log(transaction2);
              } catch (e) {
                console.log(e);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setLoad(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return cartArray.length != 0 ? (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="cart_show">
          <div className="searchResultsTable2">
            {/* Similar numbers */}
            {/* dropdown */}
            {/* numbers boxes */}
            <div className="searchResultsTableCol2">
              {cartArray.map(
                (number, i, ava) =>
                  queryParam !== number && (
                    <div className="each">
                      <PhoneNumberBox
                        number={number}
                        cart={cart}
                        setCart={setCart}
                        showAvailability={true}
                        available={true}
                        contract_connect={contract_connect}
                        signer={signer}
                        cartArray={cartArray}
                        setcartArray={setcartArray}
                        setContract_connect={setContract_connect}
                        setProceedTo={setProceedTo}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
          <button
            className="cartCheckout"
            onClick={async() => {
              {
                // await NFT_Gen();
                buyNumber();
              }
            }}
          >
            Checkout
          </button>
        </div>
      </div>
      {error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
            color: "white",
            fontSize: "large",
          }}
        >
          Unsufficient Balance
        </div>
      ) : (
        ""
      )}
      {load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-20vh",
          }}
        >
          {" "}
          <LoadPage style={{ marginRight: "40vw" }} />
        </div>
      ) : (
        <div> ""</div>
      )}
    </div>
  ) : (
    ""
  );
}
export default CartShow;
