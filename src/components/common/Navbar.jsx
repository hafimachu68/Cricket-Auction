import React from 'react';
import { Navbar, Container, Nav, Form, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css'; // Import your custom CSS file
import ogo from '../images/bas.png'; // Import your logo image

function NavScrollExample() {
  const { userDetail } = useSelector(state => state.user);
  const navigate = useNavigate();
  
  const doLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        {/* Include your logo image */}
        <Navbar.Brand href="#" className="navbar-brand-custom fw-bold">
        PPL
          <img
            src={ogo}
            alt="Your logo"
            className="d-inline-block align-top logo-img" // Apply custom CSS class if needed
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="/home" className="nav-link-custom">HOME</Nav.Link>
            <Nav.Link href="/team" className="nav-link-custom">TEAM</Nav.Link>
            <Nav.Link href="/myteams" className="nav-link-custom">MY TEAM</Nav.Link>
            <Nav.Link href="/groups" className="nav-link-custom">MY PLAYERS</Nav.Link>
            {userDetail.role === 1 &&  <Nav.Link href="/addcourt" className="nav-link-custom">ADD PLAYER</Nav.Link>}
            {userDetail.role === 1 &&  <Nav.Link href="/addteam" className="nav-link-custom">ADD TEAM</Nav.Link>}

          </Nav>
          <Form className="d-flex">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-user">
                {userDetail.fname} {userDetail.lname}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/groups">My Group</Dropdown.Item>
                <Dropdown.Item onClick={doLogout} href="#/action-2">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
