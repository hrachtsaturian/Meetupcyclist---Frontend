import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import Context from "../Context";
import Loader from "../Loader";
import { Button, Col, Row, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDateMY } from "../../helpers/helpers";
import ProfileIcon from "../../images/profile_icon_default.png";

import "../../styles/Profile.css";
import EventsAPI from "../../api/EventsAPI";
import GroupsAPI from "../../api/GroupsAPI";
import UserGroupCard from "./UserGroupCard";
import UserEventCard from "./UserEventCard";

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const [user, setUser] = useState();
  const [groups, setGroups] = useState(true);
  const [events, setEvents] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const getUser = async () => {
    const res = await UsersAPI.get(id);
    setUser(res);
  };

  const getUserEvents = async () => {
    const res = await EventsAPI.getAll({
      filter: { createdBy: id, minDate: new Date() },
    });
    setEvents(res);
  };

  const getUserGroups = async () => {
    const res = await GroupsAPI.getAll({
      createdBy: id,
    });
    setGroups(res);
  };

  const getData = async () => {
    try {
      await Promise.all([getUser(), getUserEvents(), getUserGroups()]);
      setIsLoading(false);
    } catch (e) {
      setError(e?.message || "Failed to get user");
    }
  };

  const handleDeactivate = async () => {
    setIsSubmitting(true);
    try {
      const user = await UsersAPI.deactivate(id);
      setUser(user);
    } catch (e) {
      setError(e?.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function showAlertOnDeactivate() {
    if (
      window.confirm(
        "Are you sure you want to deactivate this user? This action not reversible."
      )
    ) {
      handleDeactivate();
    }
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error || "Failed to find user info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let sameUser = currentUser.id === user.id;
  let isAdmin = currentUser.isAdmin === true;

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Profile
      </h3>
      <div className="page-container">
        <div className="profile-container">
          <Row>
            <Col md="4" className="profile-sidebar">
              <div className="profile-header">
                <div className="profile-photo">
                  <img src={user.pfpUrl || ProfileIcon} alt="profile-photo" />
                </div>
                <h4 className="profile-name">{`${user.firstName} ${user.lastName}`}</h4>
                <p className="profile-date">
                  Member since: {formatDateMY(user.createdAt)}
                </p>
                {sameUser && (
                  <div>
                    <div
                      id="editIcon"
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        marginTop: "10px",
                      }}
                      onClick={() => navigate(`/profile/edit`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                      <UncontrolledTooltip placement="top" target="editIcon">
                        Edit
                      </UncontrolledTooltip>
                    </div>
                  </div>
                )}
                {isAdmin && !sameUser && !user.isAdmin && (
                  <div>
                    <Button
                      color="danger"
                      className="yellow-button"
                      disabled={user.deactivatedAt || isSubmitting}
                      onClick={() => {
                        showAlertOnDeactivate();
                      }}
                    >
                      {user.deactivatedAt ? "Deactivated" : "Deactivate"}
                    </Button>
                  </div>
                )}
                {!isAdmin && user.deactivatedAt && (
                  <p>
                    <i>Account Deactivated</i>
                  </p>
                )}
              </div>
            </Col>
            <Col md="8" className="profile-content">
              <div className="bio-section">
                <h5>Bio</h5>
                <p>{user.bio || "No bio provided yet."}</p>
              </div>
              <hr></hr>
              <div className="groups-section">
                <h5>Founded Groups:</h5>
                {groups && groups.length > 0 ? (
                  <div>
                    {groups.map((group) => (
                      <div key={group.id} style={{ marginBottom: "10px" }}>
                        <UserGroupCard group={group} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No groups founded yet.</p>
                )}
              </div>
              <div className="events-section">
                <h5>Organizing Events:</h5>
                {events && events.length > 0 ? (
                  <div>
                    {events.map((event) => (
                      <div key={event.id} style={{ marginBottom: "10px" }}>
                        <UserEventCard event={event} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No events organized yet.</p>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Profile;
