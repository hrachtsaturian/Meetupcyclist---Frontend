import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "./Context";

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(Context);

  // control to redirect user to home page if they are not logged in

  return currentUser ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
