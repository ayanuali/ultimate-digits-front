// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Nft is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("ultimateDig", "UD") {
        tokenCounter = 0;
    }

    function mint(string memory _tokenUri) public payable {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenUri);
        tokenCounter = tokenCounter + 1;
    }
      function getTokenCounter() public view returns (uint256) {
        return tokenCounter;
    }
}