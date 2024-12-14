import React, { useState } from "react";
import LocationsAPI from "../../api/LocationsAPI";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import LocationIcon from "../../images/location_icon_default.png";

const LocationRow = ({ location }) => {
  const [isSaved, setIsSaved] = useState(location.isSaved);

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await LocationsAPI.removeSave(location.id); // Unsave the location
      setIsSaved(false);
    } else {
      await LocationsAPI.makeSave(location.id); // Save the location
      setIsSaved(true);
    }
  };

  return (
    <Card className="my-2" tag={Link} to={`/locations/${location.id}`}>
      <div style={{ display: "flex", width: "700px" }}>
        <CardImg
          alt="location-main-photo"
          src={location.pfpUrl || LocationIcon}
          style={{
            width: "200px",
            height: '200px',
            objectFit: "contain",
          }}
        />
        <CardBody style={{ position: "relative", textAlign: "left" }}>
          <CardTitle className="fs-4">{location.name}</CardTitle>
          <CardSubtitle>
            Created by: {location.firstName} {location.lastName}
          </CardSubtitle>
          <hr></hr>
          <CardSubtitle>
            Avg. Rating: {location.avgRating} / Reviews: {location.reviewsCount}
          </CardSubtitle>
          <div
            id={`saveIcon-${location.id}`}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the icon
              toggleSave();
            }}
          >
            <FontAwesomeIcon
              icon={isSaved ? faSolidBookmark : faRegularBookmark}
              className="fa-xl"
            />
            <UncontrolledTooltip
              placement="top"
              target={`saveIcon-${location.id}`}
            >
              {isSaved ? "Unsave" : "Save"}
            </UncontrolledTooltip>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default LocationRow;
