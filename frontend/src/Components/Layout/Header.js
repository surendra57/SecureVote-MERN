import React from "react";
import "./header.css";

import { Container, Nav, Navbar } from "react-bootstrap";
import  { Link } from 'react-router-dom'
function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="nav">
          <Navbar.Brand >
          <Link
            to="/"
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            SecureVote
          </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/"> Home </Nav.Link>
            <Nav.Link href="#link">Store</Nav.Link>

            <Nav.Link href="#link">Blog</Nav.Link>

            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
