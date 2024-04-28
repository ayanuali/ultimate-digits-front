import { useWalletContext, useEVMAddress } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http } from "viem";
import { baseSepolia, bscTestnet } from "viem/chains";
import { useEffect } from "react";

// a button to sign a transaction.
export const SignTransactionButton = () => {
    const { wallet } = useWalletContext();
    const address = useEVMAddress(wallet);

    useEffect(() => {
      console.log(wallet);
    }, [wallet]);
  
    return (
      <button
        onClick={async () => {
          // get a viem account.

          console.log(wallet);
  
          const account = toViem(address!);
  
          // use viem to send eth.
          const walletClient = createWalletClient({
            account,
            chain: bscTestnet,
            transport: http(),
          });
  
          // send the transaction!
          const txHash = await walletClient.sendTransaction({
            account,
            to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
            value: 100n,
          });
  
          console.log("Sent ETH!", txHash);
        }}
      >
        Send ETH
      </button>
    );
  };
  
 export const LoginButton = () => {
    const { waas, user } = useWalletContext();
    const { wallet } = useWalletContext();
    const address = useEVMAddress(wallet);
    
    useEffect(() => {
        console.log(wallet);
      }, [wallet]);
    return (
        <>
      <button
        onClick={() => {

         
          waas!.login();
          if (user!.hasWallet) {
            // restores the user's existing wallet.
            user!.restoreFromHostedBackup!();
          } else {
            // creates a new wallet.
            user!.create();
          }
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          waas!.logout();
        }}
      >
        Logout
      </button>
      <button
        onClick={async() => {
            console.log("user",user)
            const account = toViem(address!);

            const walletClient = createWalletClient({
                account,
                chain: bscTestnet,
                transport: http(),
              });
      
              // send the transaction!
              const txHash = await walletClient.sendTransaction({
                account,
                to: "0x0EFA91C922ca18646c3A03A5bE8ad9CEe7522540",
                value: 100n,
              });
      
              console.log("Sent ETH!", txHash);
        }}
      >
        send
      </button>

      </>

    );
  };
  
  export const CreateOrResumeWalletButton = () => {
    const { waas, user, wallet, isCreatingWallet } = useWalletContext();
  
    return (
      <button
        disabled={!waas || !user || isCreatingWallet || !!wallet}
        onClick={async () => {
          // check if your user has a wallet, and restore it if they do!
          if (user!.hasWallet) {
            // restores the user's existing wallet.
            user!.restoreFromHostedBackup!();
          } else {
            // creates a new wallet.
            user!.create();
          }
        }}
      >
        {isCreatingWallet ? "Creating wallet..." : "Create/Resume Wallet"}
      </button>
    );
  };
  
  // a <p> to see your user's address.
  export  const ViewMyAddressLabel = () => {
    const { wallet } = useWalletContext();
    const address = useEVMAddress(wallet);
    return (
      <div>
        {address && <p>Your address is: {address.address}</p>}
        {!address && <p>No wallet.</p>}
      </div>
    );
  };
  
  // a button to logout your user.
  export  const LogoutButton = () => {
    const { waas, user } = useWalletContext();
    return (
      <button
        onClick={async () => {
          await waas?.logout();
        }}
        disabled={!user}
      >
        Logout
      </button>
    );
  };