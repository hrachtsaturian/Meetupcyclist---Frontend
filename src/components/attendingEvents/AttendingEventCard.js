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
  Col,
} from "reactstrap";
import { formatData, isPastEvent } from "../../helpers/helpers";
import EventIcon from "../../images/event_icon_default.png";

const AttendingEventCard = ({
  attendingEvent,
  getAttendingEvents,
  setLoading,
}) => {
  const handleUnattend = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setLoading(true);
    try {
      await EventsAPI.unattend(attendingEvent.id);
      await getAttendingEvents();
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
      to={`/events/${attendingEvent.id}`}
    >
      <img
        alt="event-main-photo"
        src={attendingEvent.pfpUrl || EventIcon
        }
      />
      <CardBody>
        <CardText>
          <b>
            <medium className="text-muted">
              {formatData(attendingEvent.date)}
            </medium>
          </b>
        </CardText>
        <CardTitle className="fs-4">{attendingEvent.title}</CardTitle>
        <CardSubtitle>
          Organizer: {attendingEvent.firstName} {attendingEvent.lastName}
        </CardSubtitle>
        <Col style={{ paddingTop: "10px" }}>
          {!isPastEvent(attendingEvent) && (
            <Button
              color="warning"
              className="yellow-button"
              onClick={handleUnattend}
            >
              Unattend
            </Button>
          )}
        </Col>
      </CardBody>
    </Card>
  );
};

export default AttendingEventCard;
