// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Reviews {
  uint public count = 0; // state variable
  struct Review {
    uint id;
    address reviewer; // The address of the reviewer
    string reviewedItem; // The item that was reviewed
    string review; // The review text
  }
  
  constructor() public {
    if(reviews[count].id < 1) {
        createReview('Item 1', 'I love my first item!!!');
    } 
  }
  
  mapping(uint => Review) public reviews;
  
  function createReview(string memory _reviewedItem, string memory _review) public {
    count++;
    reviews[count] = Review(count, msg.sender, _reviewedItem, _review);
  }

  function getReviewByIndex(uint index) public view returns (Review memory){
    return reviews[index];
  }
}