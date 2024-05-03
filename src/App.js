import logo from './logo.svg';
import './App.css';
import { useWalletContext, useEVMAddress, TReactUser } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http } from "viem";
import { baseSepolia, bscTestnet } from "viem/chains";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";

function App() {
  const { waas, user, isCreatingWallet, wallet, isLoggingIn , error } =useWalletContext(); 
  const handelLogin = async() => {

    console.log("user", user);

    const res = await waas.login();


    console.log(res);
    console.log("wallet", wallet);
    console.log("user", user);
    console.log("isCreatingWallet", isCreatingWallet);

    if(res.hasWallet === false){
      console.log("wallet not created");
      const wallet = await res.create();
      console.log("wallet", wallet);
      console.log("waas", waas);

      const address = await wallet.addresses.for(ProtocolFamily.EVM);
      console.log("address", address);
      console.log(`Got address: ${address.address}`);
      // const privateKeys = await wallet.exportKeysFromHostedBackup(passcode);
      const privateKeys = await wallet.backup;
      console.log("private keys", privateKeys);
    }

    if (res.hasWallet === true) {
      console.log("wallet created already");
      console.log("res", res);
      if (res !== undefined) {
        const res2 = await res .restoreFromHostedBackup(); // Replace 'TypeOfRes' with the actual type of 'res'
        console.log(res2);
        const address = await res2.addresses.for(ProtocolFamily.EVM);
        const priv = await res.backup;
        console.log("private keys", priv);
        console.log("address", address);
        localStorage.setItem("address", JSON.stringify(address));
        console.log(`Got address: ${address.address}`);
  
      } else {
        console.error("Error: 'res' is undefined");
      }
      console.log("wallet", wallet);
      console.log("waas", waas);



   
    }

  }

  const handleLogout = async () => {
    console.log("logging out");
    const res = await waas.logout();
    console.log(res);
  };

  const addressNew = useEVMAddress(wallet);

  const handleTest = async() => {
    
    console.log("test")

    console.log("Addressnew",addressNew)

    console.log("wak",wallet)

    console.log("usewr",user)

const address = await wallet.addresses.for(ProtocolFamily.EVM);

console.log("Asfasfas",address)

    const account = toViem(addressNew);

    console.log("Acc",account)

    const walletClient = createWalletClient({
      account,
      chain: bscTestnet,
      transport: http(),
    });
    console.log("walletClient", walletClient);

    try {


      const request = await walletClient.sendTransaction({
        account,
        to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540", // recipient address
        value: 1n, 
        
        
      })
      console.log("Transaction hash:", request);

      const signature = await walletClient.signTransaction(request)

      console.log("sign",signature)


    } catch (error) {
      console.log("error in this in prepare ",error)
    
    }


  }
  return (
    <div className="App">
        <button onClick={handelLogin}>login</button>
      <button onClick={handleLogout}>logout</button>

      <button onClick={handleTest}>send</button>
    </div>
  );
}

export default App;
