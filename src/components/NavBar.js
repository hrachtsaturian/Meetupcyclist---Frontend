import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Context from "./Context";
import Logo from "../images/logo.png";

const NavBar = ({ logout = () => {} }) => {
  const { currentUser } = useContext(Context);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => setProfileDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <Navbar className="my-0" color="dark" fixed="top" dark>
        <NavbarBrand tag={Link} to="/" style={{ minHeight: "105px" }}>
          <img alt="logo" src={Logo} style={{ width: "150px" }} />
        </NavbarBrand>
        <NavbarBrand tag={Link} to="/">
          Meetupcyclist
        </NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="nav-container">
            {currentUser ? (
              <>
                <NavItem>
                  <Link className="nav-link" to="/events">
                    Events
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/groups">
                    Groups
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/locations">
                    Locations
                  </Link>
                </NavItem>
                <Dropdown
                  isOpen={profileDropdownOpen}
                  toggle={toggleProfileDropdown}
                  onMouseEnter={toggleProfileDropdown}
                  onMouseLeave={toggleProfileDropdown}
                >
                  <DropdownToggle className="profile-tag" nav caret>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to={"/myevents"}>
                      My events
                    </DropdownItem>
                    <DropdownItem tag={Link} to={"/mygroups"}>
                      My groups
                    </DropdownItem>
                    <DropdownItem tag={Link} to={"/myfavorites"}>
                      My favorites
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to={`/users/${currentUser.id}`}>
                      View profile
                    </DropdownItem>
                    <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
