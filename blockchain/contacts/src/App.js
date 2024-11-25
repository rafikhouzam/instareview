import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { REVIEW_ABI, REVIEW_ADDRESS } from './config';
import './App.css';
import Home from './Home';
import SeeReviews from './SeeReviews';
import SendReviews from './SendReviews';
import Mission from './Mission';


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
    <Router>
      <div>
        {account ?
          <>
            <h3>Metamask connected!</h3>
            <p>Account address: {account}</p>
            <Routes>
            <Route path="/send-reviews" element={<SendReviews onSubmit={handleSubmit} />} />
            <Route path="/see-reviews" element={<SeeReviews reviews={reviews} />} /> 
            <Route path="/" element={<Home account={account} reviews={reviews} />} /> 
            <Route path="mission" element={<Mission/>} /> 
            </Routes>
            <nav>
              <ul className='linksList'>
                <li>
                  <Link to="/">Home</Link>
                </li>
                
                <li>
                  <Link to="/send-reviews">Post a Review</Link>
                </li>
                <li>
                  <Link to="/see-reviews">Posted Reviews</Link>
                </li>
                <li>
                  <Link to="/mission">Why us?</Link>
                </li>
              </ul>
            </nav>
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
    </Router>
  );
  
}


export default App;
