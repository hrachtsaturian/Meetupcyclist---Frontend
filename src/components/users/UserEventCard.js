import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import EventIcon from "../../images/event_icon_default.png";
import { formatDate } from "../../helpers/helpers";

const UserEventCard = ({ event }) => {
  return (
    <Card
      style={{
        width: "500px",
      }}
      tag={Link}
      to={`/events/${event.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          alt="event-main-photo"
          src={event.pfpUrl || EventIcon}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain'
          }}
        />
        <CardBody>
          <CardTitle className="fs-5">{event.title}</CardTitle>
          <CardSubtitle className="fs-6">{`Attendees: ${event.attendeesCount}`}</CardSubtitle>
          <b>
            <medium className="text-muted">{formatDate(event.date)}</medium>
          </b>
        </CardBody>
      </div>
    </Card>
  );
};

export default UserEventCard;
