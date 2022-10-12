// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

error emptyAddress();
contract WhiteList {
    address private  owner;
    // define a mapping of members

    mapping(address => bool) members;

    constructor() {
        owner = msg.sender;
        members[msg.sender] = true;
    }

    // method to check memebership
    function isMember(address _userAddress) public view returns (bool) {
        return members[_userAddress];
    }

    // a method to add member
    function addMember(address _userAddress) public onlyOwner {
        require(!isMember(_userAddress), "User is already a member");

        members[_userAddress] = true;
    }

    // a method to remove member
    function removeMember(address _userAddress) public onlyOwner {
        require(isMember(_userAddress), "User not found");

        delete members[_userAddress];
    }

    // transfers ownership of contract 
    function transferOwnership(address _newOwner) public onlyOwner {
        if(_newOwner == address(0)) revert emptyAddress();
        owner = _newOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }


}
