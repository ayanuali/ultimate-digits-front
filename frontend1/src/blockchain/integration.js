import Web3 from "web3";

import abi from "./abi.json";

import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";

const ethereum = isBrowser() ? window.ethereum : undefined;

if (!ethereum) {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}


const contractAddress = "0x3b437Bd80da0197Bfb41e2379bd3DcbECF2Ebe33";
// const MainnetcontractAddress = "0xD4f998A32961cD69B5Aea87362861557b7dF05F4";
const MainnetcontractAddress = "0x69b2EaC3e8998ECad55aFB96475e17799f4C6AB9";

export const mint = async ({uri}) => {

    console.log("minting started", uri)

const provider = new ethers.BrowserProvider(window.ethereum)

console.log(provider)

const signer = await provider.getSigner()

console.log(signer)

const poc = new ethers.Contract(MainnetcontractAddress, abi, signer); 

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
export const Check = async ({address}) => {

    console.log("minting address", address)

const provider = new ethers.JsonRpcProvider("https://rpc-nebulas-testnet.u2u.xyz")

console.log(provider)

// const signer = await provider.provider()

// console.log(signer)

const poc = new ethers.Contract(contractAddress, abi, provider); 

console.log("poc",poc)



try {
  const tx = await poc.balanceOf(address);
  // await tx.wait();
  return tx.toString();
} catch (error) {
  return error
}

};
export const multipleMint = async ({uri}) => {

    console.log("minting started", uri)

try {
  const provider = new ethers.BrowserProvider(window.ethereum)

console.log(provider)

const signer = await provider.getSigner()

console.log("singer",signer)
const bal = await provider.getBalance(signer);

console.log("bal",bal)

console.log(signer)

const poc = new ethers.Contract(MainnetcontractAddress, abi, signer); 

console.log("poc",poc)

const total = 1 * uri.length;

console.log("total in num", total);

const totalString = total.toString();

console.log("srtroinsa",totalString);


  const value = ethers.parseEther(totalString); 



  console.log("valnefe", value)

  if(bal < value){
    console.log("less balanace");
    
    return false;
  }
  const tx = await poc.mintMultipleNFTs(uri,{value});
  await tx.wait();
  return tx;
} catch (error) {
  console.log("error minting", error);
  
}

};
