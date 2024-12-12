import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";
import Context from "../Context";
import { formatData, isPastEvent } from "../../helpers/helpers";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Badge,
  CardSubtitle,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBookmark as faSolidBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import EventIcon from "../../images/event_icon_default.png";
import ProfileIcon from "../../images/profile_icon_default.png";

const Event = () => {
  const { id } = useParams();

  const [event, setEvent] = useState();
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleAttendance = async () => {
    if (isAttending) {
      await EventsAPI.unattend(id); // Unattend the event
      setIsAttending(false);
    } else {
      await EventsAPI.attend(id); // Attend the event
      setIsAttending(true);
    }
  };

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await EventsAPI.removeSave(id); // Unsave the event
      setIsSaved(false);
    } else {
      await EventsAPI.makeSave(id); // Save the event
      setIsSaved(true);
    }
  };


  useEffect(() => {
    async function getData() {
      try {
        // promise.all?
        const event = await EventsAPI.get(id);
        const attendees = await EventsAPI.getAttendees(id);
        setIsAttending(event.isAttending);
        setIsSaved(event.isSaved);
        setEvent(event);
        setAttendees(attendees);
        setIsLoading(false);
      } catch (error) {
        setError(error?.message);
      }
    }
    getData();
  }, [id]);



  const handleDelete = async () => {
    try {
      await EventsAPI.delete(id);
      navigate("/events");
    } catch (error) {
      setError("Failed to delete the event");
    }
  };

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find event info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let sameUser = currentUser.id === event.createdBy;
  let isAdmin = currentUser.isAdmin === true;

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Event
      </h3>
      <hr></hr>
      <Container className="mt-4">
        <Row>
          {/* Main Photo and Edit/Delete */}
          <Col md="4">
            <Card
              className="rounded-4 mb-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "none",
              }}
            >
              <CardImg
                top
                src={event.pfpUrl || EventIcon}
                alt="event-main-photo"
                className="rounded-top-4"
              />
              <CardBody className="text-center">
                <div className="icon-button-row">
                  {sameUser || isAdmin ? (
                    <>
                      <div
                        id="editIcon"
                        className="icon-wrapper"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={() => navigate(`/events/${id}/edit`)}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="fa-xl"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="editIcon"
                        >
                          Edit
                        </UncontrolledTooltip>
                      </div>
                      <div
                        id="deleteIcon"
                        className="icon-wrapper"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={handleDelete}
                      >
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                        <UncontrolledTooltip
                          placement="top"
                          target="deleteIcon"
                        >
                          Delete
                        </UncontrolledTooltip>
                      </div>
                    </>
                  ) : null}
                  <div
                    id="saveIcon"
                    className="icon-wrapper"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                    onClick={toggleSave}
                  >
                    <FontAwesomeIcon
                      icon={isSaved ? faSolidBookmark : faRegularBookmark}
                      className="fa-xl"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="saveIcon"
                    >
                      {isSaved ? "Unsave" : "Save"}
                    </UncontrolledTooltip>
                  </div>
                  {!isPastEvent(event) && (
                    <Button
                      color="warning"
                      className="yellow-button"
                      onClick={toggleAttendance}
                    >
                      {isAttending ? "Unattend" : "Attend"}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* Event Details */}
          <Col md="8">
            <Card
              className="rounded-4 mb-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "none",
              }}
            >
              <CardBody>
                <CardTitle tag="h2">{event.title}</CardTitle>
                <CardSubtitle>
                  Organized by:{" "}
                  <Link to={`/users/${event.createdBy}`}>
                    <b>
                      <i>{`${event.firstName} ${event.lastName}`}</i>
                    </b>
                  </Link>
                  <CardText>
                    Status:{" "}
                    <span
                      style={{
                        color: isPastEvent(event) ? "red" : "green",
                      }}
                    >
                      {isPastEvent(event) ? "Past" : "Upcoming"}
                    </span>
                  </CardText>
                </CardSubtitle>
                <CardText
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Badge color="secondary" className="me-2">
                    <h6>{formatData(event.date)}</h6>
                  </Badge>
                  <Badge color="dark" className="me-2">
                    <h6>{event.location}</h6>
                  </Badge>
                </CardText>
                <CardText className="text-muted">{event.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Attendees Section */}
        <Row className="mt-4">
          <Col>
            <Card
              className="rounded-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "none",
                display: "flex",
                alignItems: "start",
              }}
            >
              <CardBody>
                <CardTitle tag="h4">Attendees: {event.attendeesCount}</CardTitle>
                <div className="d-flex flex-wrap">
                  {attendees?.map((attendee) => {
                    const attendeeId = `attendee-${attendee.userId}`;
                    return (
                      <div key={attendee.userId} className="me-2 mb-2">
                        <Link to={`/users/${attendee.userId}`}>
                          <img
                            src={attendee.pfpUrl || ProfileIcon}
                            alt="profile-photo"
                            className="rounded-circle"
                            id={`attendee-${attendeeId}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                              border: "2px solid #ccc",
                            }}
                          />
                        </Link>
                        <UncontrolledTooltip
                          placement="top"
                          target={`attendee-${attendeeId}`}
                        >
                          {attendee.firstName} {attendee.lastName}
                        </UncontrolledTooltip>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Event;
