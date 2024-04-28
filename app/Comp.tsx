import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { ViewMyAddressLabel, SignTransactionButton,LogoutButton,LoginButton } from "./Silts";
import { useEffect } from "react";

export const DappWalletView = () => {
    const {wallet} = useWalletContext();
    const address = useEVMAddress(wallet);

    useEffect(()=>{
console.log("waller",wallet)
    },[])
   
    return (
      <>
    <LoginButton />
        {address && <>
          <ViewMyAddressLabel />
          <SignTransactionButton />
          <LogoutButton />
        </>}
      </>
    )
  }
  