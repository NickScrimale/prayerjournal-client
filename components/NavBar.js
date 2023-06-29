/* eslint-disable jsx-a11y/anchor-is-valid */
// import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>The Prayer Journal</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Verses</Nav.Link>
            </Link>
            {/* <Link passHref href={`/users/${id}`}> */}
            <Link passHref href="/users">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link passHref href="/prayers">
              <Nav.Link>Prayers</Nav.Link>
            </Link>
            <Link passHref href="/versions">
              <Nav.Link>Version Manager</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// NavBar.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };
