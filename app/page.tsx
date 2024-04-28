"use client"
import Image from "next/image";
import { useWalletContext, useEVMAddress } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http } from "viem";
import { baseSepolia, bscTestnet } from "viem/chains";
import { useEffect } from "react";
import { DappWalletView } from "./Comp";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";






export default function Home() {
  const { waas, user, isCreatingWallet, wallet, isLoggingIn , error } =useWalletContext(); 
   const address = useEVMAddress(wallet);

  


  const handelLogin = async() => {

    console.log("user", user);

    const res = await waas!.login();


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

      const res2 = await res.restoreFromHostedBackup();
      console.log(res2);

      console.log("wallet", wallet);
      console.log("waas", waas);

      const address = await res2.addresses.for(ProtocolFamily.EVM);
      const priv = await res.backup;
      console.log("private keys", priv);
      console.log("address", address);
      localStorage.setItem("address", JSON.stringify(address));
      console.log(`Got address: ${address.address}`);


   
    }

  }

  const handleLogout = async () => {
    console.log("logging out");
    const res = await waas!.logout();
    console.log(res);
  };

  const addressNew = useEVMAddress(wallet);

  const handleTest = async() => {
    
    console.log("test")

    console.log("Addressnew",addressNew)

    console.log("wak",wallet)

    console.log("usewr",user)

const address = await wallet!.addresses.for(ProtocolFamily.EVM);

    const account = toViem(addressNew);

    console.log("Acc",account)

    const walletClient = createWalletClient({
      account,
      chain: bscTestnet,
      transport: http(),
    });
    console.log("walletClient", walletClient);

    try {


      const request = await walletClient.prepareTransactionRequest({
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




  const handleSend = async () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

    <div>\


      <button onClick={handelLogin}>login</button>
      <button onClick={handleLogout}>logout</button>

      <button onClick={handleTest}>send</button>

      {/* <LoginButton />




      <CreateOrResumeWalletButton />
      <LogoutButton /> */}

{/* <LogoutButton />
{!address && <LoginButton />}
<SignTransactionButton address  />
      {address && <>
        <ViewMyAddressLabel />
        <SignTransactionButton />
        <LogoutButton />
      </>} */}

      {/* <DappWalletView /> */}

    </div>
    </main>
  );
}
