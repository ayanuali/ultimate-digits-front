// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract UltimateDigitNFT is ERC721URIStorage, ReentrancyGuard, ERC2981 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private owner = 0x6Dfd02935D536820b147f3960AbF19a32aF50bEF;
    uint96 private fee = 10;

    // Price of one NFT in Wei (0.01 ETH)
    uint256 public constant PRICE = 1 ether;

    event sentOwner(address owner, uint val);

    constructor() ERC721("Ultimate Digits Unicorn Ultra Mobile Number", "UD") {
       
        _setDefaultRoyalty(owner, 100);
    }

    function supportsInterface(bytes4 interfaceId)
        public view virtual override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintNFT(string memory tokenURI)
        public payable nonReentrant returns (uint256)
    {
        require(msg.value >= PRICE, "Ether sent is not correct");
        uint256 newItemId = _mintNFT(tokenURI);
        _handleRefundIfNeeded(PRICE);
                payable(owner).transfer(PRICE);

        return newItemId;
    }

    function mintMultipleNFTs(string[] memory tokenURIs)
        public payable nonReentrant returns (uint256[] memory)
    {
        require(msg.value >= PRICE * tokenURIs.length, "Ether sent is not enough for multiple NFTs");

        uint256[] memory itemIds = new uint256[](tokenURIs.length);
        for (uint i = 0; i < tokenURIs.length; i++) {
            itemIds[i] = _mintNFT(tokenURIs[i]);
        }

        _handleRefundIfNeeded(PRICE * tokenURIs.length);
        payable(owner).transfer(PRICE * tokenURIs.length);
        emit sentOwner(owner,PRICE * tokenURIs.length);
        return itemIds;
    }

    function _mintNFT(string memory tokenURI) private returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setTokenRoyalty(newItemId, owner, fee);
        return newItemId;
    }

    function _handleRefundIfNeeded(uint256 totalPrice) private {
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
    }

    // Function to withdraw Ether from the contract

}
