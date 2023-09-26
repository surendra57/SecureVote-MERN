import React, { useState, useEffect } from "react";
import {  Card } from "react-bootstrap";
import "./candidates.css";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

function CandidateList() {
    const navigate = useNavigate()
  const [candidates, setCandidates] = useState([]);
  const [message, setMesaage] = useState(null);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState(null);

  const fetchCandidate = async () => {
    try {
      const { data } = await axios.get("/api/v1/getCandidates");
      setCandidates(data.candidates);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  const submitHandler = async (cardId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/v1/vote/${cardId}`, config);

      console.log(data);
      setMesaage(data.message);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const loggedOut = async () => {
    console.log("logout");

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get('/api/v1/logout', config);

      console.log(data);
      setMesaage(data.message);
      localStorage.setItem("userInfo",null);
      setTimeout(()=>{
        navigate("/");
      })
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
    fetchCandidate();
  }, []);

  return (
    <div className="main-container">
      <div className="side-content">
        <h2>Voting Dashboard</h2>
        <Link to="/">
          <h6>
            <i class="ri-home-7-fill"></i> Home
          </h6>
        </Link>
        <p>Logged in as:{userData && userData.user.username}</p>
        <img
          src="https://png.pngtree.com/png-clipart/20230824/original/pngtree-electronic-voting-abstract-concept-vector-illustration-picture-image_8431357.png"
          width="100%"
          alt="dashboardImg"
        />
        <h6 onClick={() => loggedOut()}>
          {" "}
          <i class="ri-logout-box-fill"></i> Logout
        </h6>
      </div>

      <div className="card-list">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
        <h3>Candidates</h3>

        <div className="card-style">
          {candidates &&
            candidates.map((candidate) => (
              <Card
                key={candidate._id}
                style={{
                  width: "15rem",
                  display: "flex",
                  alignItems: "center",
                  padding: "1vw 0vw",
                }}
              >
                <Card.Img variant="top" src="/v1.png" />
                <Card.Body style={{ alignItems: "center" }}>
                  <Card.Title>{candidate.name}</Card.Title>
                  <Card.Text> Votes : {candidate.votes}</Card.Text>
                  <button
                    value={candidate._id}
                    onClick={(e) => submitHandler(e.target.value)}
                  >
                    Vote
                  </button>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
