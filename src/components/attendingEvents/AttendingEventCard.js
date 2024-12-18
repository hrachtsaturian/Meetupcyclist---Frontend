import React, { useState } from "react";
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

const AttendingEventCard = ({
  attendingEvent,
  getAttendingEvents,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUnattend = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setIsLoading(true);
    try {
      await EventsAPI.unattend(attendingEvent.id);
      await getAttendingEvents();
      setError();
    } catch (e) {
      setError(e?.message || "Error unattending the event");
    }
    setIsLoading(false);
  };

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/events/${attendingEvent.id}`}
    >
      <div style={{ justifyContent: "center", display: "flex" }}>
        <img
          alt="event-main-photo"
          src={attendingEvent.pfpUrl || EventIcon}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
      </div>
      <CardBody>
        <CardText>
          <b>
            <medium className="text-muted">
              {formatDate(attendingEvent.date)}
            </medium>
          </b>
        </CardText>
        <CardTitle className="fs-4">{attendingEvent.title}</CardTitle>
        <CardSubtitle>
          Organizer: {attendingEvent.firstName} {attendingEvent.lastName}
        </CardSubtitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {!isPastEvent(attendingEvent) && (
            <Button
              color="warning"
              className="yellow-button"
              disabled={isLoading}
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

export default AttendingEventCard;
