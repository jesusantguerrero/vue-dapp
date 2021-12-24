pragma solidity ^0.8.4;
// SPDX-License-Identifier: UNLICENSED

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


contract Greeting is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;   
    address internal contractOwner; 
    string internal message = "Hello World!";
    mapping (bytes32 => uint) public requestIdToRandomNumber;
    
    constructor(address _vrfCoodinator, address _linkToken, bytes32 _keyhash) VRFConsumerBase(
        _vrfCoodinator,
        _linkToken
    ) {
        contractOwner = payable(msg.sender);
        keyHash = _keyhash;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
    }
    
    function greet() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _message) external{
        require(msg.sender == contractOwner, "Only the contract owner can set the message");
        message = _message;
    }

    function generate() public returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        bytes32 requestId = requestRandomness(keyHash, fee);
        return requestId;       
    }

    function expand(uint _randomValue, uint times) public pure returns (uint[] memory) {
        uint[] memory result = new uint[](times);
        for (uint i = 0; i < times; i++) {
            result[i] = uint(keccak256(abi.encode(_randomValue, i)));
        }
        return result;
    }

    function fulfillRandomness(bytes32 _requestId, uint _randomNumber) internal override {
        requestIdToRandomNumber[_requestId] = _randomNumber;
    }
}