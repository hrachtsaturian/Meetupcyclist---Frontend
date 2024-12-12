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
import { formatData } from "../../helpers/helpers";
import EventIcon from "../../images/event_icon_default.png";

const EventRow = ({ event }) => {
  const [isSaved, setIsSaved] = useState(event.isSaved);


  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await EventsAPI.removeSave(event.id); // Unsave the event
      setIsSaved(false);
    } else {
      await EventsAPI.makeSave(event.id); // Save the event
      setIsSaved(true);
    }
  };


  return (
    <Card className="my-2" tag={Link} to={`/events/${event.id}`} >
      <div style={{ display: 'flex', width: '700px' }}>
        <CardImg
          alt="event-main-photo"
          src={event.pfpUrl || EventIcon
          }
          style={{
            width: '200px',
            objectFit: 'contain'
          }}
        />
        <CardBody style={{ position: "relative", textAlign: 'left' }}>
          <CardTitle className="fs-4">
            {event.title}
          </CardTitle>
          <CardSubtitle>
            Organizer: {event.firstName} {event.lastName}
          </CardSubtitle>
          <hr></hr>
          <CardTitle className="fs-5">
            {formatData(event.date)}
          </CardTitle>
          <CardSubtitle>
            Attendees: {event.attendeesCount}
          </CardSubtitle>
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
        </CardBody>
      </div>
    </Card>
  );
};

export default EventRow;
