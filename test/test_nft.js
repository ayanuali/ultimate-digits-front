const { expect } = require("chai");
const { ethers } = require('hardhat');

describe ('contract', () => {
    let customer,transaction,contract

    beforeEach(async () => {

        [customer] = await ethers.getSigners();
        
        const nft = await ethers.getContractFactory("Nft");
        contract = await nft.deploy();
        
    })
    it('mint', async () => {
        transaction = await contract.connect(customer).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS");
        await transaction.wait();
        
        console.log(transaction);
       
    })
}) 