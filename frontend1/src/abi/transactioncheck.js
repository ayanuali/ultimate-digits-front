export const address_TransactionCheck="0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const abi_TransactionCheck = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_UltimateDigitPhoneNumber",
          type: "uint256"
        },
        {
          internalType: "string",
          name: "_code",
          type: "string"
        }
      ],
      name: "SettingUniqueId",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_UltimateDigitPhoneNumber",
          type: "uint256"
        },
        {
          internalType: "string",
          name: "_code",
          type: "string"
        }
      ],
      name: "checkAccount",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_WalletAddress",
          type: "address"
        }
      ],
      name: "returnNumbers",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]