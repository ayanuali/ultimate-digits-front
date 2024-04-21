import Web3 from "web3";

import abi from "./abi.json";

import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";

const ethereum = isBrowser() ? window.ethereum : undefined;

if (!ethereum) {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}


const contractAddress = "0x6299661f475A7Ca32Ef4572E4F38043E1b0a1F44";

export const mint = async ({uri}) => {

    console.log("minting started", uri)

const provider = new ethers.BrowserProvider(window.ethereum)

console.log(provider)

const signer = await provider.getSigner()

console.log(signer)

const poc = new ethers.Contract(contractAddress, abi, signer); 

console.log("poc",poc)


  const value = ethers.parseEther("0.01");
  const tx = await poc.mintNFT(uri,{value});
  await tx.wait();
  return tx;

};
export const multipleMint = async ({uri}) => {

    console.log("minting started", uri)

const provider = new ethers.BrowserProvider(window.ethereum)

console.log(provider)

const signer = await provider.getSigner()

console.log(signer)

const poc = new ethers.Contract(contractAddress, abi, signer); 

console.log("poc",poc)

const total = 0.01 * uri.length;

console.log("total in num", total);

const totalString = total.toString();

console.log("srtroinsa",totalString);


  const value = ethers.parseEther(totalString); 
  const tx = await poc.mintMultipleNFTs(uri,{value});
  await tx.wait();
  return tx;

};
