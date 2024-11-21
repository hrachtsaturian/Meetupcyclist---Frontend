import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/users/Profile";
import ProfileEdit from "./components/users/ProfileEdit";
import Event from "./components/events/Event";
import Events from "./components/events/Events";
import EventNew from "./components/events/EventNew";
import EventEdit from "./components/events/EventEdit";
import Favorites from "./components/favorites/Favorites";
import Context from "./components/Context";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import BaseAPI from "./api/BaseAPI";
import UsersAPI from "./api/UsersAPI";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isInitializing, setIsInitializing] = useState(true);

  const checkUserLoggedIn = async (userToken) => {
    // first, try to find token
    if (userToken) {
      // if found token, parse token to find id
      const { id } = jwtDecode(userToken);
      // if id is found, make an api call to find user record
      BaseAPI.token = userToken;
      try {
        const user = await UsersAPI.get(id);
        // store user in the state
        setCurrentUser(user);
      } catch (error) {
        // if failed to initialize - ignore
        BaseAPI.token = null;
      }
    }
    setIsInitializing(false);
  };

  const login = (userToken) => {
    checkUserLoggedIn(userToken);
    window.localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setCurrentUser();
    window.localStorage.removeItem("token");
  };

  // when on the website, check if user is already logged in
  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    checkUserLoggedIn(userToken);
  }, []);

  return (
    <div className="App">
      {isInitializing && <Loader />}
      {!isInitializing && (
        <BrowserRouter>
          <Context.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar logout={logout} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/users/:id"
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                  path="/users/:id/edit"
                  element={<ProtectedRoute element={<ProfileEdit />} />}
                />
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute
                      element={<Events />}
                    />
                  }
                />
                <Route
                  path="/events/new"
                  element={<ProtectedRoute element={<EventNew />} />}
                />
                <Route
                  path="/events/:id"
                  element={<ProtectedRoute element={<Event />} />}
                />
                <Route
                  path="/events/:id/edit"
                  element={<ProtectedRoute element={<EventEdit />} />}
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute
                      element={<Favorites />}
                    />
                  }
                />
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/signup" element={<Signup login={login} />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
              </Routes>
            </div>
          </Context.Provider>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
