pragma solidity ^0.8.20;

contract zkVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external pure returns (bool) {
        return input[0] == 1; // Mock for demo; replace with circom-generated verifier
    }
}