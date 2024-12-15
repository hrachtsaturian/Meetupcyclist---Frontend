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
import { formatDate, isPastEvent } from "../../helpers/helpers";
import EventIcon from "../../images/event_icon_default.png";

const UpcomingEventCard = ({
  event,
  getEvents,
  setIsLoading,
}) => {
  const handleUnattend = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setIsLoading(true);
    try {
      await EventsAPI.unattend(event.id);
      await getEvents();
      setIsLoading(false);
    } catch (error) {
      console.error("Error unattending the event:", error);
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
      <div style={{ justifyContent: "center", display: "flex" }}>
        <img
          alt="event-main-photo"
          src={event.pfpUrl || EventIcon
          }
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'contain'
          }}
        />
      </div>
      <CardBody>
        <CardText>
          <b>
            <medium className="text-muted">
              {formatDate(event.date)}
            </medium>
          </b>
        </CardText>
        <CardTitle className="fs-4">{event.title}</CardTitle>
        <CardSubtitle>
          Organizer: {event.firstName} {event.lastName}
        </CardSubtitle>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {!isPastEvent(event) && (
            <Button
              color="warning"
              className="yellow-button"
              onClick={handleUnattend}
            >
              Unattend
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default UpcomingEventCard;
