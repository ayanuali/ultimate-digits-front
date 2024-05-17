import Web3 from "web3";

import abi from "./abi.json";

import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";

const ethereum = isBrowser() ? window.ethereum : undefined;

if (!ethereum) {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}


const contractAddress = "0x80DE3ebA61EeBD6cC71Ad9B420E57051C4bd72f5";

export const mint = async ({uri}) => {

    console.log("minting started", uri)

const provider = new ethers.BrowserProvider(window.ethereum)

console.log(provider)

const signer = await provider.getSigner()

console.log(signer)

const poc = new ethers.Contract(contractAddress, abi, signer); 

console.log("poc",poc)


  const value = ethers.parseEther("150");
try {
  const tx = await poc.mintNFT(uri,{value});
  await tx.wait();
  return tx;
} catch (error) {
  return error
}

};
export const multipleMint = async ({uri}) => {
    console.log("minting started", uri)


    const provider = new ethers.BrowserProvider(window.ethereum)

    console.log(provider)
    
    const signer = await provider.getSigner()
    
    console.log(signer)
    
    const poc = new ethers.Contract(contractAddress, abi, signer); 
    
    console.log("poc",poc)

  

    const tx = await poc.mintMultipleNFTs(uri);
    await tx.wait();
    return tx;
};
