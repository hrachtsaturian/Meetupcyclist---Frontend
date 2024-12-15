import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import LogoBig from "../../images/logo_big.png";

const WelcomePage = () => {
  return (
    <div className="nonLoggedInPage">
    <div className="leftSide">
      <img src={LogoBig} alt="logo" />
    </div>
    <div className="rightSide">
      <h1 className="meetupcyclist">Meetupcyclist</h1>
      <h3>Our new social media platform</h3>
      <div className="nonLoggedInPage-buttons">
        <Link to="signup">
          <div className="buttonWrapper">
            <Button color="warning" className="yellow-button">Create account</Button>
          </div>
        </Link>
        <h4>Already have an account?</h4>
        <Link to="login">
          <div className="buttonWrapper">
            <Button color="warning" className="yellow-button">Log In</Button>
          </div>
        </Link>
      </div>
    </div>
  </div>
);
}

export default WelcomePage;
