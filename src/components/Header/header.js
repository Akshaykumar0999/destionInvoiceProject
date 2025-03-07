import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaWebAwesome } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import './index.css'

function Header() {
  return (
    <Navbar expand="lg" className="header-card">
      <Container>
        <Navbar.Brand
          href="#home"
          className="header-title"
          style={{ color: "#ffffff" }}
        >
          <FaWebAwesome className="header-icon" style={{ color: "gold" }} />
          E-Commerce Inventory
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "#ffffff" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              className="header-routes-text"
              to={"/invoices"}
              // style={{ color: "#ffffff" }}
            >
              Invoice
            </NavLink>
            <NavLink
              className="header-routes-text"
              to={"/products"}
              // style={{ color: "#ffffff" }}
            >
              Product
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
