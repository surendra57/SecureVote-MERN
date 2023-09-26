import React from "react";
import "./Landingpage.css";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";

const LandingPage = () => {
  return (
    <>
      <Header />

      <div className="content">
        <div className="left">
          <h1>
            {" "}
            {/* <span>Secure</span> Voting system */}
            Welcome to <span>SecureVote</span>
          </h1>
          <h3>Your Trusted Voting Solution</h3>
          <p>
            SecureVote is a cutting-edge voting system designed to ensure the
            integrity of your elections. Our platform is built with the highest
            security standards to safeguard your votes and promote transparency.
          </p>
          <Link to="/login">
            <button> Sign In</button>
          </Link>
        </div>

        <div className="right">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-voting-4487402-3722763.png"
            className="App-logo"
            alt="logo"
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
