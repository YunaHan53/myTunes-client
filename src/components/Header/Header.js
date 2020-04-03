import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="link" href="#songs-create">Create Song</Nav.Link>
    <Nav.Link className="link" href="#songs">Song List</Nav.Link>
    <Nav.Link className="link" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="link" href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="link" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="link" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className="link" href="/myTunes-client/Home">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="navbar" bg="success" variant="dark" expand="md">
    <Navbar.Brand className="nav-title" href="#">
      myTunes
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
