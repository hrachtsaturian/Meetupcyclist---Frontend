import React, { useContext } from "react";
import LoggedInHomepage from "./LoggedInHomepage";
import NonLoggedInHomepage from "./NonLoggedInHomepage";
import Context from "./Context";

const Home = () => {
  const { currentUser } = useContext(Context);
  // if the user is logged in - hide buttons and display 'Welcome Back!'
  return <div style={{ marginTop: '100px' }}>{currentUser ? <LoggedInHomepage /> : <NonLoggedInHomepage />}</div>;
}

export default Home;
