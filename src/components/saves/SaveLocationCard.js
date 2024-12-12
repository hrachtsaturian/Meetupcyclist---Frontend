import React from "react";
import LocationsAPI from "../../api/LocationsAPI";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import LocationIcon from "../../images/location_icon_default.png";

const SaveLocationCard = ({ location, getSaves, setLoading }) => {
  const handleUnsave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setLoading(true);
    try {
      await LocationsAPI.removeSave(location.id);
      await getSaves();
    } catch (error) {
      console.error("Error unsaving the location:", error);
    }
  };

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/locations/${location.id}`}
    >
      <img
        src={location.pfpUrl || LocationIcon}
        alt="location-main-photo"
      />
      <CardBody>
        <CardTitle className="fs-4">{location.name}</CardTitle>
        <CardSubtitle>
          Created by: {location.firstName} {location.lastName}
        </CardSubtitle>
        <Col style={{ paddingTop: "10px" }}>
          <div
            id={`unsaveIcon-${location.id}`}
            style={{
              cursor: "pointer",
              display: "inline-block",
            }}
            onClick={handleUnsave}
          >
            <FontAwesomeIcon icon={faBookmark} className="fa-xl" />
            <UncontrolledTooltip
              placement="top"
              target={`unsaveIcon-${location.id}`}
            >
              Unsave
            </UncontrolledTooltip>
          </div>
        </Col>
      </CardBody>
    </Card>
  );
};

export default SaveLocationCard;
