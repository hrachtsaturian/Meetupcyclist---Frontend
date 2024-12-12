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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar as faRegularCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faPeopleGroup,
  faMapLocationDot,
  faUser,
  faHand,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "./Context";
import Logo from "../images/logo.png";

const NavBar = ({ logout = () => {} }) => {
  const { currentUser } = useContext(Context);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () =>
    setProfileDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <Navbar className="my-0" color="dark" fixed="top" dark>
        <NavbarBrand tag={Link} to="/" style={{ minHeight: "105px" }}>
          <img
            className="navbar-logo"
            alt="logo"
            src={Logo}
            style={{ width: "125px", marginRight: '24px' }}
          />
          <span className="meetupcyclist" style={{ fontSize: "45px" }}>
            Meetupcyclist
          </span>
        </NavbarBrand>
        <div>
          <Nav className="me-auto" navbar>
            <div className="nav-container">
              {currentUser ? (
                <>
                  <NavItem className="nav-links">
                    <Link className="nav-link" to="/events">
                      <FontAwesomeIcon
                        icon={faRegularCalendar}
                        className="me-2"
                      />
                      Events
                    </Link>
                  </NavItem>
                  <NavItem className="nav-links">
                    <Link className="nav-link" to="/groups">
                      <FontAwesomeIcon icon={faPeopleGroup} className="me-2" />
                      Groups
                    </Link>
                  </NavItem>
                  <NavItem className="nav-links">
                    <Link className="nav-link" to="/locations">
                      <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className="me-2"
                      />
                      Locations
                    </Link>
                  </NavItem>
                  <Dropdown
                    className="nav-links"
                    isOpen={profileDropdownOpen}
                    toggle={toggleProfileDropdown}
                    onMouseEnter={toggleProfileDropdown}
                    onMouseLeave={toggleProfileDropdown}
                  >
                    <DropdownToggle className="profile-tag" nav caret>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Profile
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} to={"/myevents"}>
                        My events
                      </DropdownItem>
                      <DropdownItem tag={Link} to={"/mygroups"}>
                        My groups
                      </DropdownItem>
                      <DropdownItem tag={Link} to={"/saved"}>
                        Saved
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag={Link} to={`/users/${currentUser.id}`}>
                        View profile
                      </DropdownItem>
                      <DropdownItem
                        style={{ fontWeight: "bold" }}
                        onClick={() => logout()}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <NavItem className="nav-links">
                    <Link to="/signup" className="nav-link">
                      <FontAwesomeIcon icon={faHand} className="me-2" />
                      Sign Up
                    </Link>
                  </NavItem>
                  <NavItem className="nav-links">
                    <Link to="/login" className="nav-link">
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="me-2"
                      />
                      Log In
                    </Link>
                  </NavItem>
                </>
              )}
            </div>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
