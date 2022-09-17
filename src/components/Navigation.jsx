import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { user, removeToken } = useContext(AuthContext);

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

        <Nav className="d-flex">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          {user ? (
            <>
              <Nav.Link as={NavLink} to="/page1">
                Page1
              </Nav.Link>
              <Nav.Link as={NavLink} to="/page2">
                Page2
              </Nav.Link>
              <Nav.Link as={NavLink} to="/page3">
                Page3
              </Nav.Link>
              <Nav.Link onClick={removeToken}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/registration">
                Registration
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
