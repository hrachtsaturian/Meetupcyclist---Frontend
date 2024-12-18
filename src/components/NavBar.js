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
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Context from "./Context";
import Logo from "../images/logo.png";

const NavBar = ({ logout = () => {} }) => {
  const { currentUser } = useContext(Context);

  const location = useLocation();

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isProfileDropdownOpenNarrow, setProfileDropdownOpenNarrow] =
    useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen((prevState) => {
      return !prevState;
    });
    setProfileDropdownOpenNarrow(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prevState) => {
      return !prevState;
    });
  };

  const toggleProfileDropdownNarrow = () => {
    setProfileDropdownOpenNarrow((prevState) => {
      return !prevState;
    });
  };

  const loggedInUserNavItems = () => {
    return (
      <>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/events") ? "nav-links-active" : ""
          }`}
        >
          <Link className="nav-link" to="/events">
            <FontAwesomeIcon icon={faRegularCalendar} className="me-2" />
            Events
          </Link>
        </NavItem>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/groups") ? "nav-links-active" : ""
          }`}
        >
          <Link className="nav-link" to="/groups">
            <FontAwesomeIcon icon={faPeopleGroup} className="me-2" />
            Groups
          </Link>
        </NavItem>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/locations") ? "nav-links-active" : ""
          }`}
        >
          <Link className="nav-link" to="/locations">
            <FontAwesomeIcon icon={faMapLocationDot} className="me-2" />
            Locations
          </Link>
        </NavItem>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/users") ||
            location.pathname.startsWith("/my") ||
            location.pathname.startsWith("/saved")
              ? "nav-links-active"
              : ""
          }`}
        >
          <Dropdown
            className="nav-links"
            isOpen={isProfileDropdownOpen}
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
        </NavItem>
      </>
    );
  };

  const loggedOutUserNavItems = () => {
    return (
      <>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/signup") ? "nav-links-active" : ""
          }`}
        >
          <Link to="/signup" className="nav-link">
            <FontAwesomeIcon icon={faHand} className="me-2" />
            Sign Up
          </Link>
        </NavItem>
        <NavItem
          className={`nav-links ${
            location.pathname.startsWith("/login") ? "nav-links-active" : ""
          }`}
        >
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
            Log In
          </Link>
        </NavItem>
      </>
    );
  };
  // Full nav menu on wide screen
  const getNavFull = () => {
    if (currentUser) {
      return loggedInUserNavItems();
    } else {
      return loggedOutUserNavItems();
    }
  };
  const loggedInUserNavItemsNarrow = () => {
    return (
      <NavItem className="nav-links">
        <Dropdown className="nav-links" isOpen={isMenuOpen} toggle={() => {}}>
          <DropdownToggle nav caret onClick={toggleMenuOpen}>
            Menu
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to={"/events"} onClick={toggleMenuOpen}>
              <FontAwesomeIcon
                icon={faRegularCalendar}
                className="me-2"
                style={{ width: "25px" }}
              />
              Events
            </DropdownItem>
            <DropdownItem tag={Link} to={"/groups"} onClick={toggleMenuOpen}>
              <FontAwesomeIcon
                icon={faPeopleGroup}
                className="me-2"
                style={{ width: "25px" }}
              />
              Groups
            </DropdownItem>
            <DropdownItem tag={Link} to={"/locations"} onClick={toggleMenuOpen}>
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className="me-2"
                style={{ width: "25px" }}
              />
              Locations
            </DropdownItem>
            <DropdownItem tag={Link} onClick={toggleProfileDropdownNarrow}>
              <FontAwesomeIcon
                icon={faUser}
                className="me-2"
                style={{ width: "25px" }}
              />
              Profile
              <FontAwesomeIcon
                icon={faCaretDown}
                className="ms-2"
                style={{ width: "25px" }}
              />
              <Dropdown
                className="nav-links"
                isOpen={isProfileDropdownOpenNarrow}
                toggle={() => {}}
              >
                <DropdownMenu>
                  <DropdownItem
                    tag={Link}
                    to={"/myevents"}
                    onClick={toggleMenuOpen}
                  >
                    My events
                  </DropdownItem>
                  <DropdownItem
                    tag={Link}
                    to={"/mygroups"}
                    onClick={toggleMenuOpen}
                  >
                    My groups
                  </DropdownItem>
                  <DropdownItem
                    tag={Link}
                    to={"/saved"}
                    onClick={toggleMenuOpen}
                  >
                    Saved
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    tag={Link}
                    to={`/users/${currentUser.id}`}
                    onClick={toggleMenuOpen}
                  >
                    View profile
                  </DropdownItem>
                  <DropdownItem
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      toggleMenuOpen();
                      logout();
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    );
  };

  const loggedOutUserNavItemsNarrow = () => {
    return (
      <NavItem className="nav-links">
        <Dropdown className="nav-links" isOpen={isMenuOpen} toggle={() => {}}>
          <DropdownToggle nav caret onClick={toggleMenuOpen}>
            Menu
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to="/signup" onClick={toggleMenuOpen}>
              <FontAwesomeIcon
                icon={faHand}
                className="me-2"
                style={{ width: "25px" }}
              />
              Sign Up
            </DropdownItem>
            <DropdownItem tag={Link} to="/login" onClick={toggleMenuOpen}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="me-2"
                style={{ width: "25px" }}
              />
              Log In
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    );
  };

  // Compact nav menu on narrow screen
  const getNaNarrow = () => {
    if (currentUser) {
      return loggedInUserNavItemsNarrow();
    } else {
      return loggedOutUserNavItemsNarrow();
    }
  };

  return (
    <div>
      <Navbar className="my-0" color="dark" fixed="top" dark>
        <NavbarBrand tag={Link} to="/" style={{ minHeight: "105px" }}>
          <img
            className="navbar-logo"
            alt="logo"
            src={Logo}
            style={{ width: "125px", marginRight: "24px" }}
          />
          <span className="meetupcyclist" style={{ fontSize: "45px" }}>
            Meetupcyclist
          </span>
        </NavbarBrand>
        <div>
          <Nav className="me-auto" navbar>
            <div className="nav-container-full-screen">{getNavFull()}</div>
            {/* Compact nav menu on narrow screen */}
            <div className="nav-container-narrow-screen">{getNaNarrow()}</div>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
