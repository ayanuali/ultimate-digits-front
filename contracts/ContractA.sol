// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Web3NumberNFT1 is ERC721Enumerable, ReentrancyGuard ,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(string => bool) private _couponCodes;
    mapping(address => bool) private _claimedFreeBronze;

    constructor() ERC721("Web3Number", "W3N") {}

    function mint(address recipient) public payable nonReentrant {
        require(msg.value >= getMintingFee(), "Insufficient ETH sent");

        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(recipient, newTokenId);
    }

    function getMintingFee() public view returns (uint256) {
        // Define your NFT minting fee logic here.
        return 0.01 ether; // Placeholder value.
    }

    function claimWithCoupon(string memory coupon) external {
        require(_couponCodes[coupon], "Invalid coupon");
        require(!_claimedFreeBronze[msg.sender], "Already claimed free Bronze");

        _claimedFreeBronze[msg.sender] = true;
        delete _couponCodes[coupon];

        mint(msg.sender);
    }

    // Owner functions to add/remove coupons
    function addCoupon(string memory coupon) external onlyOwner {
        _couponCodes[coupon] = true;
    }

    function removeCoupon(string memory coupon) external onlyOwner {
        _couponCodes[coupon] = false;
    }
}

