import Web3 from 'web3';
import { REVIEW_ABI, REVIEW_ADDRESS } from './config';
import React, { useState, useEffect, Component } from 'react';

function SendReviews() {
    const [account, setAccount] = useState();
  const [reviewList, setReviewList] = useState();
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const review = reviewList.methods.createReview(event.target.reviewItem.value, event.target.reviewText.value);

    await review.send({ from: account });

    const counter = await reviewList.methods.count().call();
    const reviewByIndex = await reviewList.methods.getReviewByIndex(counter).call();

    setReviews((reviews) => [...reviews, reviewByIndex]);
  }

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const reviewList = new web3.eth.Contract(REVIEW_ABI, REVIEW_ADDRESS);
      setReviewList(reviewList);

      const counter = await reviewList.methods.count().call();

      const reviewPromises = [];

      for (let i = 1; i <= counter; i++) {
        reviewPromises.push(reviewList.methods.getReviewByIndex(i).call());
      }

      const fetchedReviews = await Promise.all(reviewPromises);

      setReviews(fetchedReviews);
    }

    load();
  }, []);

  return (
    <div className='marginLeft'>
        <br></br>
      <h1>Add a review:</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              name="reviewItem"
              placeholder="Item to review"
              className='reviewItem'
            /><br/>
            <p></p>
            <textarea
              rows="5" 
              cols="50"
              type="text"
              name="reviewText"
              placeholder="Review Text"
              
            />
            <br />
            <p></p>
            <input type="submit" />
          </form>
    </div>
  );
}

export default SendReviews;
