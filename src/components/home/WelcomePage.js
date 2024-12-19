import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import LogoBig from "../../images/logo_big.png";

const WelcomePage = () => {
  return (
    <div className="nonLoggedInPage" data-testid="welcome-page">
      <div className="leftSide">
        <img src={LogoBig} alt="logo" />
      </div>
      <div className="rightSide">
        <h1 className="meetupcyclist">Meetupcyclist</h1>
        <h3>"Ride Together, Connect Forever"</h3>
        <p>
          Meetupcyclist is where motorcycle enthusiasts find their tribe. From
          epic rides to local meetups, we bring bikers together to share
          adventures, stories, and passion for the open road. Sign up, gear up,
          and let's hit the journey together!
        </p>
        <div className="nonLoggedInPage-buttons">
          <Link to="signup">
            <div className="buttonWrapper">
              <Button color="warning" className="yellow-button">
                Create account
              </Button>
            </div>
          </Link>
          <br></br>
          <hr></hr>
          <h4>Already have an account?</h4>
          <Link to="login">
            <div className="buttonWrapper">
              <Button color="warning" className="yellow-button">
                Log In
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
