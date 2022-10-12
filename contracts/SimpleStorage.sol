// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;
import "./WhiteList.sol";

contract SimpleStorage is WhiteList {
    uint256 favoriteNumber;
    uint256 constant MINIMUMETH = 2000000000000000000;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // uint256[] public anArray;
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    // monetizing this function to store favrouite number
    function store(uint256 _favoriteNumber) public payable {
        require(msg.value >= MINIMUMETH, "Didnt send enough!");
        favoriteNumber = _favoriteNumber;
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber)
        public
        payable
    {
        require(isMember(msg.sender), "Access Denied!");

        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    receive() external payable {}
}
