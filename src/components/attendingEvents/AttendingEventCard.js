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
import { formatData } from "../../helpers/helpers";

const AttendingEventCard = ({ attendingEvent, getAttendingEvents, setLoading }) => {
  // do we need to do something with backend ?
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
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{attendingEvent.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {formatData(attendingEvent.date)}
        </CardSubtitle>
        <CardText>{attendingEvent.description}</CardText>
        <Button onClick={handleUnattend}>Unattend</Button>
      </CardBody>
    </Card>
  );
};

export default AttendingEventCard;
