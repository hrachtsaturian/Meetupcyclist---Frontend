import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import Context from "../Context";
import Loader from "../Loader";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDataMY } from "../../helpers/helpers";
import ProfileIcon from "../../images/profile_icon_default.png";

import "../../styles/Profile.css";

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await UsersAPI.get(id);
        setUser(res);
        setIsLoading(false);
      } catch (error) {
        setError(error?.message);
      }
    }
    getData();
  }, [id]);

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
                  <img
                    src={user.pfpUrl || ProfileIcon}
                    alt="profile-photo"
                  />
                </div>
                <h4 className="profile-name">{`${user.firstName} ${user.lastName}`}</h4>
                <p className="profile-date">
                  Member since: {formatDataMY(user.createdAt)}
                </p>
                {/* is this correct? */}
                {(sameUser || isAdmin) && (
                  <div>
                    <div
                      id="editIcon"
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        marginTop: "10px",
                      }}
                      onClick={() => navigate(`/users/${id}/edit`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                      <UncontrolledTooltip
                        placement="top"
                        target="editIcon"
                      >
                        Edit
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                {/* {user.groups && user.groups.length > 0 ? (
                <ul>
                  {user.groups.map((group) => (
                    <li key={group.id}>
                      <strong>{group.name}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No groups founded yet.</p>
              )} */}
              </div>
              <div className="events-section">
                <h5>Organizing Events:</h5>
                {/* {user.events && user.events.length > 0 ? (
                <ul>
                  {user.events.map((event) => (
                    <li key={event.id}>
                      <strong>{event.name}</strong> - {formatData(event.date)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No events organized yet.</p>
              )} */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Profile;
