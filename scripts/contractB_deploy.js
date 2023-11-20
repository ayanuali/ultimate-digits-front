const {ethers} = require("hardhat");

async function main() {
  const nft = await ethers.getContractFactory("Web3NumberNFT1");
  const contract = await nft.deploy();
  console.log(contract.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
