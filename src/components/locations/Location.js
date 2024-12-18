import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationsAPI from "../../api/LocationsAPI";
import Loader from "../Loader";
import Context from "../Context";
import {
  Badge,
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
import MapFrame from "../MapFrame";
import LocationReviewsTable from "./reviews/LocationReviewsTable";
import LocationReviewForm from "./reviews/LocationReviewForm";

const Location = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();

  const [location, setLocation] = useState();
  const [reviews, setReviews] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [isSaved, setIsSaved] = useState(false);

  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRate, setNewReviewRate] = useState(0);

  const getLocation = async () => {
    const resLocation = await LocationsAPI.get(id);
    setIsSaved(resLocation.isSaved);
    setLocation(resLocation);
  };

  const getLocationReviews = async () => {
    const locationReviews = await LocationsAPI.getReviews(id);
    setReviews(locationReviews);
  };

  const getData = async () => {
    try {
      await Promise.all([getLocation(), getLocationReviews()]);
      setIsLoading(false);
    } catch (e) {
      setError(e?.message || "Failed to get location");
    }
  };
  const handleDelete = async () => {
    try {
      await LocationsAPI.delete(id);
      navigate("/locations");
    } catch (e) {
      setError(e?.message || "Failed to delete the location");
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await LocationsAPI.createReview(id, newReviewText, newReviewRate);
      await getLocationReviews();
      setNewReviewText("");
      setNewReviewRate(0);
    } catch (e) {
      setError(e?.message || "Failed to create new review");
    }
    setIsSubmitting(false);
  };

  const toggleSave = async () => {
    try {
      if (isSaved) {
        setIsSaved(false); // optimistic update
        await LocationsAPI.removeSave(id); // Unsave the location
      } else {
        setIsSaved(true);
        await LocationsAPI.makeSave(id); // Save the location
      }
    } catch (e) {
      setError(e?.message);
      setIsSaved((prev) => !prev); // revert
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function showAlertOnDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete this location? This action not reversible."
      )
    ) {
      handleDelete();
    }
  }

  if (error) {
    return (
      <div class="alert alert-danger container" role="alert">
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
            <Card className="rounded-4 mb-4" style={{ border: "none" }}>
              <CardImg
                top
                src={location.pfpUrl || LocationIcon}
                alt="location-main-photo"
                className="rounded-top-4"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <CardBody>
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
                        <UncontrolledTooltip placement="top" target="editIcon">
                          Edit
                        </UncontrolledTooltip>
                      </div>
                      <div
                        id="deleteIcon"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={showAlertOnDelete}
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
                  <UncontrolledTooltip placement="top" target="saveIcon">
                    {isSaved ? "Unsave" : "Save"}
                  </UncontrolledTooltip>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* Location Details */}
          <Col md="8">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h2">{location.name}</CardTitle>
              <CardSubtitle>
                Created by:{" "}
                <Link to={`/users/${location.createdBy}`}>
                  <b>
                    <i>{`${location.firstName} ${location.lastName}`}</i>
                  </b>
                </Link>
              </CardSubtitle>
              <br></br>
              <CardSubtitle>
                Average Rating: {location.avgRating} / 5
              </CardSubtitle>
              <br></br>
              <CardText
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Badge color="dark" className="me-2">
                  <h6>{location.address}</h6>
                </Badge>
              </CardText>
              <CardText className="text-muted" style={{ marginTop: "20px" }}>
                {location.description}
              </CardText>
            </div>
          </Col>
        </Row>
        {/* Maps Section */}
        <Row className="mt-4">
          <MapFrame location={location.address} />
          {/* Location Reviews Section */}
          <Col md="8">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h4" style={{ marginBottom: "8px" }}>
                Reviews
              </CardTitle>
              <LocationReviewForm
                isSubmitting={isSubmitting}
                newReviewText={newReviewText}
                newReviewRate={newReviewRate}
                setNewReviewText={setNewReviewText}
                setNewReviewRate={setNewReviewRate}
                handleCreateReview={handleCreateReview}
              />
              <LocationReviewsTable
                locationReviews={reviews}
                getReviews={getLocationReviews}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Location;
