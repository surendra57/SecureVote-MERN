import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMesaage] = useState(null);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/login",
        { username, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setMesaage(data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container-fluid py-1 mainDiv">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
        {/*{loading && <Loading />} */}
        <div className="title">Login</div>

        <Card className="cards border-right">
          <Card.Body className="p-4 ">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your User Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>

              <button type="submit">Submit</button>
            </Form>
            <Row className="py-3 ">
              <Col>
                New Voter ?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register Here
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
