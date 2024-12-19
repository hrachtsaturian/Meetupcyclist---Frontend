import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/home/WelcomePage";
import HomePage from "./components/home/HomePage";
import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/users/Profile";
import ProfileEdit from "./components/users/ProfileEdit";
import Event from "./components/events/Event";
import Events from "./components/events/Events";
import EventNew from "./components/events/EventNew";
import EventEdit from "./components/events/EventEdit";
import AttendingEvents from "./components/attendingEvents/AttendingEvents";
import Group from "./components/groups/Group";
import Groups from "./components/groups/Groups";
import GroupNew from "./components/groups/GroupNew";
import GroupEdit from "./components/groups/GroupEdit";
import JoinedGroups from "./components/joinedGroups/JoinedGroups";
import Location from "./components/locations/Location";
import Locations from "./components/locations/Locations";
import LocationNew from "./components/locations/LocationNew";
import LocationEdit from "./components/locations/LocationEdit";
import Saves from "./components/saves/Saves";
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

  const onAuthSuccess = (user, token) => {
    BaseAPI.token = token;
    setCurrentUser(user);
  };

  const authenticateUser = async () => {
    const authRes = await UsersAPI.authenticate();
    if (!authRes?.token) {
      setIsInitializing(false);
      return;
    }
    const { user, token } = authRes;
    onAuthSuccess(user, token);
    setIsInitializing(false);
  };

  const logout = async () => {
    await UsersAPI.logout();
    BaseAPI.token = null;
    setCurrentUser();
  };

  // App.js never re-renders, so this effect only runs once on mount
  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar isInitializing={isInitializing} logout={logout} />
          {isInitializing && <Loader />}
          {!isInitializing && (
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    currentUser ? (
                      <ProtectedRoute element={<HomePage />} />
                    ) : (
                      <WelcomePage />
                    )
                  }
                />
                <Route
                  path="/users/:id"
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                  path="/profile/edit"
                  element={<ProtectedRoute element={<ProfileEdit />} />}
                />
                <Route
                  path="/events"
                  element={<ProtectedRoute element={<Events />} />}
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
                  path="/groups"
                  element={<ProtectedRoute element={<Groups />} />}
                />
                <Route
                  path="/groups/new"
                  element={<ProtectedRoute element={<GroupNew />} />}
                />
                <Route
                  path="/groups/:id"
                  element={<ProtectedRoute element={<Group />} />}
                />
                <Route
                  path="/groups/:id/edit"
                  element={<ProtectedRoute element={<GroupEdit />} />}
                />
                <Route
                  path="/groups/:id/newevent"
                  element={<ProtectedRoute element={<EventNew />} />}
                />
                <Route
                  path="/locations"
                  element={<ProtectedRoute element={<Locations />} />}
                />
                <Route
                  path="/locations/new"
                  element={<ProtectedRoute element={<LocationNew />} />}
                />
                <Route
                  path="/locations/:id"
                  element={<ProtectedRoute element={<Location />} />}
                />
                <Route
                  path="/locations/:id/edit"
                  element={<ProtectedRoute element={<LocationEdit />} />}
                />
                <Route
                  path="/myevents"
                  element={<ProtectedRoute element={<AttendingEvents />} />}
                />
                <Route
                  path="/mygroups"
                  element={<ProtectedRoute element={<JoinedGroups />} />}
                />
                <Route
                  path="/saved"
                  element={<ProtectedRoute element={<Saves />} />}
                />
                <Route path="/login" element={<Login onAuthSuccess={onAuthSuccess} />} />
                <Route path="/signup" element={<Signup onAuthSuccess={onAuthSuccess} />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
              </Routes>
            </div>
          )}
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
