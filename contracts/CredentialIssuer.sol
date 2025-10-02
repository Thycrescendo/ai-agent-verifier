pragma solidity ^0.8.20;

import "@moca-network/airkit/contracts/AIR.sol";

contract CredentialIssuer {
    address public owner;
    mapping(address => bytes) public credentials;

    event VCCreated(address indexed agent, bytes vcId);

    constructor() {
        owner = msg.sender;
    }

    function issueVC(address agent, bytes memory vcData) external {
        require(msg.sender == owner, "Only issuer");
        credentials[agent] = vcData;
        emit VCCreated(agent, vcData);
    }

    function getVC(address agent) external view returns (bytes memory) {
        return credentials[agent];
    }
}