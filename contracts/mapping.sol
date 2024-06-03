// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UltimateDigitsAddressMapping {
    mapping(address => uint256[]) private addressToNumbers;


        function SetUniqueNumber(uint256[] memory _numbers) public {
        for (uint256 i = 0; i < _numbers.length; i++) {
            addressToNumbers[msg.sender].push(_numbers[i]);
        }
    }


    function getNumbers() public view returns (uint256[] memory) {
        return addressToNumbers[msg.sender];
    }

    function getNumbersForAddress(address _address) public view returns (uint256[] memory) {
        return addressToNumbers[_address];
    }

    function removeNumber(uint256 _number) public {
        uint256[] storage numbers = addressToNumbers[msg.sender];
        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] == _number) {
                numbers[i] = numbers[numbers.length - 1];
                numbers.pop();
                break;
            }
        }
    }
}
