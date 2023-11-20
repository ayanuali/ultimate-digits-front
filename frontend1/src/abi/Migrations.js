export const address_migrations=" 0x5FbDB2315678afecb367f032d93F642f64180aa3"
  export const abi_migrations= [
    {
      inputs: [],
      name: "last_completed_migration",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
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
          internalType: "uint256",
          name: "completed",
          type: "uint256"
        }
      ],
      name: "setCompleted",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]