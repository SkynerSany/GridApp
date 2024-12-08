import {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">GridApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/grid">Grid</Nav.Link>
            <Nav.Link as={Link} to="/form">Form</Nav.Link>
            <Nav.Link as={Link} to="/user">User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;