import Web3 from "web3";

import abi from "./abi.json";

import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";

const ethereum = isBrowser() ? window.ethereum : undefined;

if (!ethereum) {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}


const contractAddress = "0x193ac7E20C80B112e154AD5463aCA27FDbC3892E";

export const mint = async ({uri}) => {

    console.log("minting started", uri)

    // const prov = Provider
  //provider, signer and contract instance
//   const provider =
//     window.ethereum != null
//       ? new ethers.providers.Web3Provider(window.ethereum)
//       : ethers.providers.getDefaultProvider();

// console.log("prov",provider)
//   const signer = provider.getSigner();
//   console.log("signer",signer)

//   const contract = new ethers.Contract(contractAddress, abi, signer); //contract addresss, abi of the contract, signer
//   console.log("contrc",contract)
//   const tx = await contract.mintNFT(uri);
//   await tx.wait();
//   return tx;

// const provider = new ethers.providers.Web3Provider(ethereum);
// console.log('Provider:', provider);

// // Get the signer from the provider
// const signer = provider.getSigner();
// console.log('Signer:', signer);
// 
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
