import React, { useState } from "react";
import EventsAPI from "../../api/EventsAPI";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../helpers/helpers";
import EventIcon from "../../images/event_icon_default.png";

const EventRow = ({ event }) => {
  const [isSaved, setIsSaved] = useState(event.isSaved);
  const [error, setError] = useState(null);

  const toggleSave = async () => {
    try {
      if (isSaved) {
        setIsSaved(false);
        await EventsAPI.removeSave(event.id); // Unsave the event
      } else {
        setIsSaved(true);
        await EventsAPI.makeSave(event.id); // Save the event
      }
    } catch (e) {
      setError(e?.message || "Failed to save/unsave event");
      setIsSaved((prev) => !prev); // revert
    }
  };

  return (
    <Card
      className="my-2"
      tag={Link}
      to={`/events/${event.id}`}
      style={{ width: "700px" }}
    >
      <div style={{ display: "flex" }}>
        <CardImg
          alt="event-main-photo"
          src={event.pfpUrl || EventIcon}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
        <CardBody>
          <CardTitle className="fs-4">{event.title}</CardTitle>
          <CardSubtitle>
            Organizer: {event.firstName} {event.lastName}
          </CardSubtitle>
          <hr></hr>
          <CardTitle className="fs-5">{formatDate(event.date)}</CardTitle>
          <CardSubtitle>Attendees: {event.attendeesCount}</CardSubtitle>
          <div
            id={`saveIcon-${event.id}`}
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
              target={`saveIcon-${event.id}`}
            >
              {isSaved ? "Unsave" : "Save"}
            </UncontrolledTooltip>
          </div>
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ marginBottom: "20px" }}
            >
              {error}
            </div>
          )}
        </CardBody>
      </div>
    </Card>
  );
};

export default EventRow;
