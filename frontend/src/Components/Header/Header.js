import React, { Component } from "react";
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

var userInfo = JSON.parse(localStorage.getItem("userInfo"));

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      logged: true,
    };
  }

  logout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("noteInfo");
    window.location.replace("/");
  }

  render() {
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
          {this.state.userInfo ? (
            <div>
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Button
                    onClick={() => {
                      window.location.replace("/notes");
                    }}
                  >
                    My notes
                  </Button>
                  <Button
                    onClick={() => {
                      this.logout();
                    }}
                  >
                    Log out
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    );
  }
}
