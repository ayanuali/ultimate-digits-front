// /** @type import('hardhat/config').HardhatUserConfig */

// module.exports = {
//   solidity: "0.8.18",
// };
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

//Exporting the API keys for deployment networks
// const API_URL_MUMBAI = process.env.API_URL_MUMBAI;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const API_URL_MAINNET = process.env.API_URL_MAINNET;
// const API_URL_SMART_CHAIN_TESTNET = process.env.API_URL_SMART_CHAIN_TESTNET;
// const API_URL_SMART_CHAIN = process.env.API_URL_SMART_CHAIN;

//Deploying network export
module.exports = {
   solidity: {compilers:[{version:"0.8.18"},{version:"0.6.6"},{version:"0.8.20"}]},
   //Networks used for deployment
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      // polygon_mumbai: {
      //    url: API_URL_MUMBAI,
      //    accounts: [`0x${PRIVATE_KEY}`],
      //    chainId: 80001,
      // },
      // polygon_mainnet : {
      //    url : API_URL_MAINNET,
      //    accounts : [`0x${PRIVATE_KEY}`],
      //    chainId : 137,
      // },
      // smart_chain_testnet : {
      //    url : API_URL_SMART_CHAIN_TESTNET,
      //    accounts : [`0x${PRIVATE_KEY}`],
      //    chainId : 97,
      // },
      // bnb_mainnet : {
      //    url : API_URL_SMART_CHAIN,
      //    accounts : [`0x${PRIVATE_KEY}`],
      //    chainId : 56,
      // }
   },
}