const {expect}  =require('chai');
const {ethers}  = require('hardhat');

//Testing the contract
describe('Contract' , () => {
    //Accounts and Variable declaration
    let sender , reciever, contract,result;
    beforeEach(async() => {

        //Testing signers with localnodes
        [sender,reciever] = await ethers.getSigners();
        console.log(sender+" : "+reciever);

        //Deploying on testing network
        const Transaction = await ethers.getContractFactory("transactioncheck");
        contract = await Transaction.deploy();

    });

    //Checking the functions of the contract
    it("function one check", async()=>{

        //Checking the functioning of the connecting function
        result = await contract.SettingUniqueId(300);
        await result.wait();

        //Checking the functioning of reciving the address function
        result = await contract.checkAccount(300);
        expect(result).to.be.equal(sender.address);
        
    })
})