import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [message, setMesaage] = useState(null);
  const [error, setError] = useState("");
  console.log(role);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/register",
        { username, password, role },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setMesaage(data.message);
      setTimeout(() => {
        navigate("/login");
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
        <div className="title">Register</div>

        <Card className="cards border-right">
          <Card.Body className="p-4 ">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter User Name"
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
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Voter">Voter</option>
                  <option value="Candidate">Candidate</option>
                </Form.Select>

                {/* <Form.Control
                  type="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Enter role"
                /> */}
              </Form.Group>

              <button type="submit">Submit</button>
            </Form>
            <Row className="py-3 ">
              <Col>
                Have an account ?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Register;
