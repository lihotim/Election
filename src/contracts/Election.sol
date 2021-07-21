// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election{
    
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    
    uint public candidatesCount;
    
    mapping(uint=>Candidate) public candidates;
    mapping(address=>bool) public voters;
    
    constructor() {
        createCandidate("Donald Trump");
        createCandidate("Joe Biden");
        createCandidate("Kim Namjoon");
    }
   
   function createCandidate(string memory _name) private {
       candidatesCount++;
       candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
   }
   
   function vote(uint _candidateId) public {
       require(voters[msg.sender]==false, "You have voted already!");
       require(_candidateId>0 && _candidateId<=candidatesCount, "Invalid Candidate ID!");
       voters[msg.sender] = true;
       candidates[_candidateId].voteCount++;
   }
    
}