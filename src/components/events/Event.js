import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";
import Context from "../Context";
import { formatDate, isPastEvent } from "../../helpers/helpers";
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
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBookmark as faSolidBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import ProfileIcon from "../../images/profile_icon_default.png";
import EventIcon from "../../images/event_icon_default.png";
import MapFrame from "../MapFrame";
import EventPostCard from "./EventPostCard";
import PostsTable from "../shared/PostsTable";

const Event = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();

  const [event, setEvent] = useState();
  const [attendees, setAttendees] = useState([]);
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [newPostText, setNewPostText] = useState("");

  const getEvent = async () => {
    const resEvent = await EventsAPI.get(id);
    setIsAttending(resEvent.isAttending);
    setIsSaved(resEvent.isSaved);
    setEvent(resEvent);
  };

  const getEventAttendees = async () => {
    const resAttendees = await EventsAPI.getAttendees(id);
    setAttendees(resAttendees);
  };

  const getEventPosts = async () => {
    const eventPosts = await EventsAPI.getPosts(id);
    setPosts(eventPosts);
  };

  const getData = async () => {
    try {
      await Promise.all([getEvent(), getEventAttendees(), getEventPosts()]);
      setIsLoading(false);
    } catch (error) {
      setError(error[0]?.message || "Failed to get event");
    }
  };

  const handleDelete = async () => {
    try {
      await EventsAPI.delete(id);
      navigate("/events");
    } catch (error) {
      setError("Failed to delete the event");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await EventsAPI.createPost(id, newPostText);
      await getEventPosts();
      setNewPostText("");
    } catch (error) {
      setError("Failed to create new post");
    }
  };

  const toggleAttendance = async () => {
    try {
      if (isAttending) {
        await EventsAPI.unattend(id); // Unattend the event
        setIsAttending(false);
      } else {
        await EventsAPI.attend(id); // Attend the event
        setIsAttending(true);
      }
      await getEventAttendees();
    } catch (error) {
      setError(error?.message);
    }
  };

  const toggleSave = async () => {
    try {
      if (isSaved) {
        await EventsAPI.removeSave(id); // Unsave the event
        setIsSaved(false);
      } else {
        await EventsAPI.makeSave(id); // Save the event
        setIsSaved(true);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function showAlertOnDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete this group? This action not reversible."
      )
    ) {
      handleDelete();
    }
  }

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
            <Card className="rounded-4 mb-4" style={{ border: "none" }}>
              <CardImg
                top
                src={event.pfpUrl || EventIcon}
                alt="event-main-photo"
                className="rounded-top-4"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <CardBody>
                <div className="icon-button-row">
                  {sameUser && (
                    <div
                      id="editIcon"
                      className="icon-wrapper"
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                      onClick={() => navigate(`/events/${id}/edit`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                      <UncontrolledTooltip placement="top" target="editIcon">
                        Edit
                      </UncontrolledTooltip>
                    </div>
                  )}
                  {(isAdmin || sameUser) && (
                    <div
                      id="deleteIcon"
                      className="icon-wrapper"
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                      onClick={showAlertOnDelete}
                    >
                      <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                      <UncontrolledTooltip placement="top" target="deleteIcon">
                        Delete
                      </UncontrolledTooltip>
                    </div>
                  )}
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
                    <UncontrolledTooltip placement="top" target="saveIcon">
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
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h2">{event.title}</CardTitle>
              <CardSubtitle>
                Organized by:{" "}
                <Link to={`/users/${event.createdBy}`}>
                  <b>
                    <i>{`${event.firstName} ${event.lastName}`}</i>
                  </b>
                </Link>
              </CardSubtitle>
              <CardText style={{ marginTop: "20px" }}>
                Status:{" "}
                <span
                  style={{
                    color: isPastEvent(event) ? "red" : "green",
                  }}
                >
                  {isPastEvent(event) ? "Past" : "Upcoming"}
                </span>
              </CardText>
              <CardText
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Badge color="secondary" className="me-2">
                  <h6>{formatDate(event.date)}</h6>
                </Badge>
                <Badge color="dark" className="me-2">
                  <h6>{event.location}</h6>
                </Badge>
              </CardText>
              <CardText className="text-muted" style={{ marginTop: "20px" }}>
                {event.description}
              </CardText>
            </div>
          </Col>
        </Row>
        {/* Attendees Section */}
        <Row className="mt-4">
          <Col md="4">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h4" style={{ marginBottom: "8px" }}>
                Attendees: {attendees?.length}
              </CardTitle>
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
            </div>
            {/* Maps Section */}
            <Row className="mt-4">
              <MapFrame location={event.location} />
            </Row>
          </Col>
          {/* Event Posts Section */}
          <Col md="8">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h4" style={{ marginBottom: "8px" }}>
                Feed
              </CardTitle>
              <Form onSubmit={handleCreatePost}>
                <FormGroup>
                  <Label for="newpost">New Post</Label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <Input
                      id="newpost"
                      name="text"
                      type="textarea"
                      value={newPostText}
                      style={{ width: "500px", border: "1px solid #ccc" }}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />
                    <div>
                      <Button
                        color="warning"
                        className="yellow-button"
                        disabled={!newPostText?.trim()}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </FormGroup>
              </Form>
              <PostsTable
                posts={posts}
                getPosts={getEventPosts}
                CardComponent={EventPostCard}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Event;
