// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3NumberNFT2 is ERC721Enumerable,ReentrancyGuard ,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(string => bool) private _couponCodes;
    mapping(address => bool) private _claimedFreeBronze;

    constructor() ERC721("Web3Number", "W3N") {}

    function mint(address recipient) external payable nonReentrant {
        uint256 mintingFee = getMintingFee();
        require(msg.value >= mintingFee, "Insufficient ETH sent");

        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(recipient, newTokenId);
    }

    function getMintingFee() public view returns (uint256) {
        if (_claimedFreeBronze[msg.sender]) {
            return 0;
        }

        if (isBronzeTier(msg.sender)) {
            return 0.01 ether;
        } else if (isSilverTier(msg.sender)) {
            return 0.02 ether;
        } else if (isGoldTier(msg.sender)) {
            return 0.03 ether;
        }

        return 0.04 ether;
    }

    function claimWithCoupon(string memory coupon) external nonReentrant {
        require(_couponCodes[coupon], "Invalid coupon");
        require(!_claimedFreeBronze[msg.sender], "Already claimed free Bronze");

        _claimedFreeBronze[msg.sender] = true;
        delete _couponCodes[coupon];

        _mint(msg.sender, _tokenIdCounter.current() + 1);
    }

    function addCoupon(string memory coupon) external onlyOwner {
        _couponCodes[coupon] = true;
    }

    function removeCoupon(string memory coupon) external onlyOwner {
        _couponCodes[coupon] = false;
    }

    function isBronzeTier(address user) internal view returns (bool) {
        uint256 balance = address(user).balance;
        return (balance >= 0.01 ether && balance <= 1 ether);
    }

    function isSilverTier(address user) internal view returns (bool) {
        uint256 balance = address(user).balance;
        return (balance > 1 ether && balance <= 5 ether);
    }

    function isGoldTier(address user) internal view returns (bool) {
        uint256 balance = address(user).balance;
        return balance > 5 ether;
    }
}
