import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Context from "./Context";
import Logo from "../images/logo.png";

const NavBar = ({ logout = () => {} }) => {
  const { currentUser } = useContext(Context);
  return (
    <div>
      <Navbar className="my-0" color="dark" fixed="top" dark>
        <NavbarBrand href="/">
          <img alt="logo" src={Logo} style={{ width: "150px" }} />{" "}
        </NavbarBrand>
        <NavbarBrand href="/">Meetupcyclist</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="nav-container">
            {currentUser ? (
              <>
                <NavItem>
                  <Link className="nav-link" to="/events/">
                    Events
                  </Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="profile-tag" nav caret>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>My events</DropdownItem>
                    <DropdownItem>My groups</DropdownItem>
                    <DropdownItem>
                      {" "}
                      <Link to={`/favorites`}>My favorites</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <DropdownItem>
                        <Link to={`/users/${currentUser.id}`}>
                          View profile
                        </Link>
                      </DropdownItem>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/" onClick={() => logout()}>
                        Logout
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <NavItem className="nav-item">
                  <Link to="/login" className="nav-link">
                    Log In
                  </Link>
                </NavItem>
                <NavItem className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </NavItem>
              </>
            )}
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
