//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/utils/Strings.sol";
struct PhoneNumber {
    string code;
    uint256 number;
}
contract transactioncheck {
    mapping (address => string[]) WalletNumbers ;
    mapping (string => address )  UniqueId;
    mapping (string => bool)  PresenceCheck;
    
    //function to set the uniqueid
    function SettingUniqueId(uint256 _UltimateDigitPhoneNumber, string memory _code ) public {
       string[] storage numbers = WalletNumbers[msg.sender];
       string memory number = string.concat(_code,Strings.toString(_UltimateDigitPhoneNumber));
       require(PresenceCheck[number] == false, "The phone number already exists");
        UniqueId[number] = msg.sender;
        numbers.push(number);
        PresenceCheck[number] = true;
    }

    //function to check the linked account
    function checkAccount(uint256 _UltimateDigitPhoneNumber, string memory _code) public view returns(address){
        string memory number = string.concat(_code,Strings.toString(_UltimateDigitPhoneNumber));
        require(PresenceCheck[number] == true, "Phone number not connected to any account");
        return UniqueId[number];
    }

    //function to return all numbers connected to the wallet
    function returnNumbers(address _WalletAddress) public view returns( string[] memory) {
        string[] storage nums = WalletNumbers[_WalletAddress];
        return nums;
    }
}
