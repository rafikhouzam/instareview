/*
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { REVIEW_ABI, REVIEW_ADDRESS } from './config';
import './App.css';

function App() {
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
    <div>
      {account ?
        <>
          <h3>Metamask connected!</h3>
          <p>Account address: {account}</p>
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

          <h2>Reviews</h2>
          <ul>
            {
              reviews.map((review, index) => (
                <li key={`${review.reviewer}-${index}`}>
                  <h4>Index: {index}</h4>
                  <h4>ID: {review.id}</h4>
                  <h4>Address: {review.reviewer}</h4>
                  <h4>Item: {review.reviewedItem}</h4>
                  <span><b>Review: </b>{review.review}</span>
                </li>
              ))
            }
          </ul>
        </>
        : (
        <div>
        <h5>
          Sorry, check your Metamask extension.
        </h5>
        <p>
          <a
            href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
            target="_blank"
            rel="noopener noreferrer"
          >
            Getting started with MetaMask.
          </a>
        </p>
        <p>
          <a
            href="https://support.metamask.io/hc/en-us/articles/360045901112-Manually-connecting-to-a-dapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manually connecting to a dApp with MetaMask.
          </a>
        </p>
        </div>
      )}
    </div>
  );
}


export default App;*/
