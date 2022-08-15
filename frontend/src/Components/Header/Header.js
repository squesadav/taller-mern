import React from 'react'
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom'

const Header = () => {
  //this.state = {
    //username: 'Justin Bogantes Rodriguez'
  //}
  return (
    <Navbar collapseOnSelect key={"lg"} bg="primary" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">
          NoteDev
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
    
        <Navbar.Collapse id="navbarScroll">

        <Nav className='m-auto'>
          <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        </Nav>
        
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          
        <Nav.Link href="notes">
           My notes
          <Link to='/notes'/>
        </Nav.Link>
        
        <NavDropdown title= 'User' id="basic-nav-dropdown">
        <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>

        <NavDropdown.Item href="/">
          Log out
          <Link to='/'/>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header