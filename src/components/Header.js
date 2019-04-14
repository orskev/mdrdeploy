import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Header extends Component {
  homeGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/home/" + words[2];
  };

  articlesGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/articles/" + words[2];
  };

  inventoryGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/inventory/" + words[2];
  };

  notesGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/notes/" + words[2];
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">MDR Brands</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={this.homeGetSlsId()}>Home</Nav.Link>
            <NavDropdown title="More Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href={this.articlesGetSlsId()}>
                Articles
              </NavDropdown.Item>
              <NavDropdown.Item href={this.notesGetSlsId()}>
                Notes
              </NavDropdown.Item>
              <NavDropdown.Item href={this.inventoryGetSlsId()}>
                Inventory
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
