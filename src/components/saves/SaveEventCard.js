import React from "react";
import EventsAPI from "../../api/EventsAPI";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { formatDate } from "../../helpers/helpers";
import EventIcon from "../../images/event_icon_default.png";

const SaveEventCard = ({ event, getSaves, setLoading }) => {
  const handleUnsave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setLoading(true);
    try {
      await EventsAPI.removeSave(event.id);
      await getSaves();
    } catch (error) {
      console.error("Error unsaving the event:", error);
    }
  };

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/events/${event.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={event.pfpUrl || EventIcon}
          alt="event-main-photo"
          style={{
            width: '200px',
            height: '200px',
            objectFit: "contain",
          }}
        />
      </div>
      <CardBody>
        <CardText>
          <b>
            <medium className="text-muted">{formatDate(event.date)}</medium>
          </b>
        </CardText>
        <CardTitle className="fs-4">{event.title}</CardTitle>
        <CardSubtitle>
          Organizer: {event.firstName} {event.lastName}
        </CardSubtitle>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {(
            <Button
              color="warning"
              className="yellow-button"
              onClick={handleUnsave}
            >
              Unsave
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SaveEventCard;
