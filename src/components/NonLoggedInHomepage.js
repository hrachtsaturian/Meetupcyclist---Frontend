import React from "react";
import Logo from "../images/logo.png";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";


const NonLoggedInHomepage = () => {
  return (
    <div className="nonLoggedInPage">
    <div className="leftSide">
      <img src={Logo} alt="logo" />
    </div>
    <div className="rightSide">
      <h1>Meetupcyclist</h1>
      <h3>Our new social media platform</h3>
      <div className="nonLoggedInPage-buttons">
        <Link to="signup">
          <div className="buttonWrapper">
            <Button>Create account</Button>
          </div>
        </Link>
        <h4>Already have an account?</h4>
        <Link to="login">
          <div className="buttonWrapper">
            <Button>Log In</Button>
          </div>
        </Link>
      </div>
    </div>
  </div>
);
}

export default NonLoggedInHomepage;
