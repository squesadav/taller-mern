import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  //this.state = {
  //username: 'Justin Bogantes Rodriguez'
  //}
  return (
    <Navbar
      collapseOnSelect
      key={"lg"}
      bg="primary"
      expand="lg"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand href="/">NoteDev</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="notes">
              My notes
              <Link to="/notes" />
            </Nav.Link>

            <Nav.Link href="/">
              Log out
              <Link to="/" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
