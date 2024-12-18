import React, { useState } from "react";
import LocationsAPI from "../../api/LocationsAPI";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import LocationIcon from "../../images/location_icon_default.png";

const SaveLocationCard = ({ location, getSaves, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUnsave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setIsLoading(true);
    try {
      await LocationsAPI.removeSave(location.id);
      await getSaves();
    } catch (e) {
      setError(e?.message || "Error unsaving the location");
    }
    setIsLoading(false);
  };

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/locations/${location.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={location.pfpUrl || LocationIcon}
          alt="location-main-photo"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
      </div>
      <CardBody>
        <CardTitle className="fs-4">{location.name}</CardTitle>
        <CardSubtitle>
          Created by: {location.firstName} {location.lastName}
        </CardSubtitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {
            <Button
              color="warning"
              className="yellow-button"
              disabled={isLoading}
              onClick={handleUnsave}
            >
              Unsave
            </Button>
          }
        </div>
      </CardBody>
    </Card>
  );
};

export default SaveLocationCard;
