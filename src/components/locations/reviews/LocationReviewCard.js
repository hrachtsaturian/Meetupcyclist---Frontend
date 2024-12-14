import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import ProfileIcon from "../../../images/profile_icon_default.png";
import { formatData } from "../../../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationsAPI from "../../../api/LocationsAPI";
import Context from "../../Context";
import LocationReviewRating from "./LocationReviewRating";

const LocationReviewCard = ({ locationReview, getReviews }) => {
  const { currentUser } = useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [reviewText, setReviewText] = useState(locationReview.text);
  const [reviewRate, setReviewRate] = useState(locationReview.rate);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    try {
      await LocationsAPI.editReview(locationReview.id, reviewText, reviewRate);
      await getReviews();
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing the review:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await LocationsAPI.deleteReview(locationReview.id);
      await getReviews();
    } catch (error) {
      console.error("Error deleting the review:", error);
    }
  };

  const showInput = () => {
    return (
      <Form onSubmit={handleSubmitEdit}>
        <FormGroup>
          <div style={{ display: "flex", gap: "8px" }}>
            <div>
              <Input
                id="editreview"
                name="text"
                type="textarea"
                value={reviewText}
                style={{ border: "1px solid #ccc" }}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <LocationReviewRating
                rating={reviewRate}
                setReviewRate={setReviewRate}
                isMuted={false}
              />
            </div>
            <div>
              <Button
                color="warning"
                className="yellow-button"
                disabled={!reviewText?.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    );
  };

  const userFullName = `${locationReview.firstName} ${locationReview.lastName}`;
  const displayName =
    locationReview.userId === locationReview.Admin
      ? `${userFullName} (Admin)`
      : userFullName;
  const displayText = isEditing ? showInput() : locationReview.text;
  const displayDate = `${formatData(locationReview.createdAt)}${
    locationReview.updatedAt ? " (edited)" : ""
  }`;

  return (
    <Card className="my-2">
      <div style={{ display: "flex", width: "600px" }}>
        <Link
          to={`/users/${locationReview.userId}`}
          style={{
            padding: "8px ",
          }}
        >
          <img
            src={locationReview.pfpUrl || ProfileIcon}
            alt="profile-photo"
            className="rounded-circle"
            id={`user-${locationReview.id}`}
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              border: "2px solid #ccc",
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`user-${locationReview.id}`}
          >
            {locationReview.firstName} {locationReview.lastName}
          </UncontrolledTooltip>
        </Link>
        <CardBody style={{ position: "relative", textAlign: "left" }}>
          <CardTitle className="fs-6">{displayName}</CardTitle>
          <hr></hr>
          <CardTitle className="fs-5" style={{ wordBreak: "break-word" }}>{displayText}</CardTitle>
          {!isEditing && <hr></hr>}
          {!isEditing && <LocationReviewRating rating={locationReview.rate} isMuted={true} />}
          <hr></hr>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardText className="fs-6 text-muted">{displayDate}</CardText>
            <div style={{ display: "flex", gap: "8px" }}>
              {currentUser.id === locationReview.userId && (
                <div
                  id={`editReviewIcon-${locationReview.id}`}
                  className="icon-wrapper"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={toggleEditMode}
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`editReviewIcon-${locationReview.id}`}
                  >
                    Edit
                  </UncontrolledTooltip>
                </div>
              )}
              {/* either createdBy or isAdmin can delete */}
              {(currentUser.id === locationReview.userId ||
                currentUser.isAdmin) && (
                <div
                  id={`deleteReviewIcon-${locationReview.id}`}
                  className="icon-wrapper"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`deleteReviewIcon-${locationReview.id}`}
                  >
                    Delete
                  </UncontrolledTooltip>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default LocationReviewCard;
