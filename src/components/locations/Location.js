import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationsAPI from "../../api/LocationsAPI";
import Loader from "../Loader";
import Context from "../Context";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBookmark as faSolidBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import LocationIcon from "../../images/location_icon_default.png";

const Location = () => {
  const { id } = useParams();

  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await LocationsAPI.removeSave(id); // Unsave the location
      setIsSaved(false);
    } else {
      await LocationsAPI.makeSave(id); // Save the location
      setIsSaved(true);
    }
  };


  useEffect(() => {
    async function getData() {
      try {
        const location = await LocationsAPI.get(id);
        setIsSaved(location.isSaved);
        setLocation(location);
        setIsLoading(false);
      } catch (error) {
        setError(error?.message);
      }
    }
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await LocationsAPI.delete(id);
      navigate("/locations");
    } catch (error) {
      setError("Failed to delete the location");
    }
  };

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find location info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let isAdmin = currentUser.isAdmin;

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Location
      </h3>
      <hr></hr>
      <Container className="mt-4">
        <Row>
          {/* Main Photo and Edit/Delete*/}
          <Col md="4">
            <Card
              className="rounded-4 mb-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "none",
              }}
            >
              <CardImg
                top
                src={location.pfpUrl || LocationIcon}
                alt="location-main-photo"
                className="rounded-top-4"
              />
              <CardBody className="text-center">
                <div className="icon-button-row">
                  {isAdmin ? (
                    <>
                      <div
                        id="editIcon"
                        className="icon-wrapper"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={() => navigate(`/locations/${id}/edit`)}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="fa-xl"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="editIcon"
                        >
                          Edit
                        </UncontrolledTooltip>
                      </div>
                      <div
                        id="deleteIcon"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={handleDelete}
                      >
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                        <UncontrolledTooltip
                          placement="top"
                          target="deleteIcon"
                        >
                          Delete
                        </UncontrolledTooltip>
                      </div>
                    </>
                  ) : null}
                  <div
                    id="saveIcon"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                    onClick={toggleSave}
                  >
                    <FontAwesomeIcon
                      icon={isSaved ? faSolidBookmark : faRegularBookmark}
                      className="fa-xl"
                    />
                  </div>
                  <UncontrolledTooltip
                    placement="top"
                    target="saveIcon"
                  >
                    {isSaved ? "Unsave" : "Save"}
                  </UncontrolledTooltip>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* Location Details */}
          <Col md="8">
            <Card
              className="rounded-4 mb-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "none",
              }}
            >
              <CardBody>
                <CardTitle tag="h2">{location.name}</CardTitle>
                <CardSubtitle>
                  Created by:{" "}
                  <Link to={`/users/${location.createdBy}`}>
                    <b>
                      <i>{`${location.firstName} ${location.lastName}`}</i>
                    </b>
                  </Link>
                </CardSubtitle>
                <CardText className="text-muted" style={{ marginTop: "20px" }}>
                  {location.description}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Location;
