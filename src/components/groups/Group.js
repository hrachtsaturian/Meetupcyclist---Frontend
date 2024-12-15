import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import truncate from "lodash/truncate";
import GroupsAPI from "../../api/GroupsAPI";
import Loader from "../Loader";
import Context from "../Context";
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
  CardSubtitle,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Form,
  UncontrolledTooltip,
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
import GroupIcon from "../../images/group_icon_default.png";
import EventsAPI from "../../api/EventsAPI";
import PostsTable from "../shared/PostsTable";
import GroupPostCard from "./GroupPostCard";
import { formatDate } from "../../helpers/helpers";

const Group = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();

  const [group, setGroup] = useState();
  const [groupEvents, setGroupEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenCanvas, setIsOpenCanvas] = useState(false);
  const [selectedEventToLink, setSelectedEventToLink] = useState();
  const [newPostText, setNewPostText] = useState("");

  const getGroup = async () => {
    const resGroup = await GroupsAPI.get(id);
    setIsJoined(resGroup.isJoined);
    setIsSaved(resGroup.isSaved);
    setGroup(resGroup);
  };

  const getGroupMembers = async () => {
    const resMembers = await GroupsAPI.getMembers(id);
    setMembers(resMembers);
  };

  const getGroupEvents = async () => {
    const resEvents = await GroupsAPI.getEvents(id);
    setGroupEvents(resEvents);
  };

  const getGroupPosts = async () => {
    const groupPosts = await GroupsAPI.getPosts(id);
    setPosts(groupPosts);
  };

  const getData = async () => {
    try {
      await Promise.all([
        getGroup(),
        getGroupMembers(),
        getGroupEvents(),
        getGroupPosts(),
      ]);
      setIsLoading(false);
    } catch (error) {
      setError(error[0]?.message || "Failed to get group");
    }
  };

  const getMyEvents = async () => {
    try {
      const res = await EventsAPI.getAll({
        filter: { createdBy: currentUser.id, minDate: new Date() },
      });
      const groupEventsIds = groupEvents?.map(({ id }) => id);
      const filteredRes = res.filter((e) => !groupEventsIds.includes(e.id));
      setMyEvents(filteredRes);
    } catch (error) {
      setError(error?.message);
    }
  };

  const linkEvent = async () => {
    try {
      await GroupsAPI.linkEvent(group.id, selectedEventToLink.id);
      await getGroupEvents();
      setSelectedEventToLink();
      setIsOpenCanvas(false);
    } catch (error) {
      setError(error?.message);
    }
  };

  const unlinkEvent = async (eventId) => {
    try {
      await GroupsAPI.unlinkEvent(group.id, eventId);
      await getGroupEvents();
    } catch (error) {
      setError(error?.message);
    }
  };

  const handleDelete = async () => {
    try {
      await GroupsAPI.delete(id);
      navigate("/groups");
    } catch (error) {
      setError("Failed to delete the group");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await GroupsAPI.createPost(id, newPostText);
      await getGroupPosts();
      setNewPostText("");
    } catch (error) {
      setError("Failed to create new post");
    }
  };

  // do we need loading state to prevent double click?
  const toggleMembership = async () => {
    try {
      if (isJoined) {
        await GroupsAPI.leave(id); // Leave the group
        setIsJoined(false);
      } else {
        await GroupsAPI.join(id); // Join the group
        setIsJoined(true);
      }
      await getGroupMembers();
    } catch (error) {
      setError(error?.message);
    }
  };

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    try {
      if (isSaved) {
        await GroupsAPI.removeSave(id); // Unsave the group
        setIsSaved(false);
      } else {
        await GroupsAPI.makeSave(id); // Save the group
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
      <div className="alert alert-danger" role="alert">
        {error || "Failed to find group info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const toggleOffcanvas = async () => {
    setIsOpenCanvas((prev) => !prev);
    await getMyEvents();
  };
  const toggleDropdown = () => setIsOpenDropdown((prev) => !prev);

  let sameUser = currentUser.id === group.createdBy;
  let isAdmin = currentUser.isAdmin === true;

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Group
      </h3>
      <hr></hr>
      <Container className="mt-4">
        <Row>
          {/* Main Photo and Edit/Delete/Organize an event*/}
          <Col md="4">
            <Card className="rounded-4 mb-4" style={{ border: "none" }}>
              <CardImg
                top
                src={group.pfpUrl || GroupIcon}
                alt="group-main-photo"
                className="rounded-top-4"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <CardBody>
                <div className="icon-button-row">
                  {sameUser ? (
                    <>
                      <div>
                        <Button
                          color="warning"
                          className="yellow-button"
                          onClick={toggleOffcanvas}
                          style={{ width: "200px" }}
                        >
                          Organize an event
                        </Button>
                      </div>
                    </>
                  ) : null}
                  {sameUser && (
                    <div
                      id="editIcon"
                      className="icon-wrapper"
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                      onClick={() => navigate(`/groups/${id}/edit`)}
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
                  {!sameUser && (
                    <Button
                      color="warning"
                      className="yellow-button"
                      onClick={toggleMembership}
                    >
                      {isJoined ? "Leave" : "Join"}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* Group Details */}
          <Col md="8">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h2">{group.name}</CardTitle>
              <CardSubtitle>
                Founded by:{" "}
                <Link to={`/users/${group.createdBy}`}>
                  <b>
                    <i>{`${group.firstName} ${group.lastName}`}</i>
                  </b>
                </Link>
              </CardSubtitle>
              <CardText className="text-muted" style={{ marginTop: "20px" }}>
                {group.description}
              </CardText>
            </div>
          </Col>
        </Row>
        {/* Members Section */}
        <Row className="mt-4">
          <Col md="4">
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h4" style={{ marginBottom: "8px" }}>
                Members: {members?.length || 0}
              </CardTitle>
              <div className="d-flex flex-wrap">
                {members?.map((member) => {
                  const memberId = `member-${member.userId}`;
                  return (
                    <div key={member.userId} className="me-2 mb-2">
                      <Link to={`/users/${member.userId}`}>
                        <img
                          src={member.pfpUrl || ProfileIcon}
                          alt="profile-photo"
                          className="rounded-circle"
                          id={`member-${memberId}`}
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
                        target={`member-${memberId}`}
                      >
                        {member.firstName} {member.lastName}
                      </UncontrolledTooltip>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Group Events Section */}
            <div style={{ padding: "12px" }}>
              <CardTitle tag="h4" style={{ marginBottom: "8px" }}>
                Upcoming group events: {groupEvents.length}
              </CardTitle>
              {groupEvents?.map((groupEvent) => {
                return (
                  <Card
                    className="my-2"
                    tag={Link}
                    to={`/events/${groupEvent.id}`}
                  >
                    <div style={{ display: "flex", width: "400px" }}>
                      <CardImg
                        alt="event-main-photo"
                        src={groupEvent.pfpUrl || EventIcon}
                        style={{
                          width: "120px",
                          objectFit: "contain",
                        }}
                      />
                      <CardBody
                        style={{ position: "relative", textAlign: "left" }}
                      >
                        <CardTitle className="fs-5">
                          {groupEvent.title}
                        </CardTitle>
                        <hr></hr>
                        <CardText className="fs-6">
                          {formatDate(groupEvent.date)}
                        </CardText>
                        <CardText>
                          Attendees: {groupEvent.attendeesCount}
                        </CardText>
                        {(sameUser || isAdmin) && (
                          <Button
                            color="warning"
                            onClick={(e) => {
                              e.preventDefault();
                              unlinkEvent(groupEvent.id);
                            }}
                          >
                            Unlink
                          </Button>
                        )}
                      </CardBody>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Col>
          {/* Group Posts Section */}
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
                getPosts={getGroupPosts}
                CardComponent={GroupPostCard}
              />
            </div>
          </Col>
        </Row>

        <Offcanvas isOpen={isOpenCanvas} toggle={toggleOffcanvas}>
          <OffcanvasHeader toggle={toggleOffcanvas}>
            Organize Group Event
          </OffcanvasHeader>
          <OffcanvasBody>
            <div
              style={{
                overflow: "hidden",
                padding: "8px",
                width: 300,
                objectFit: "contain",
              }}
            >
              <Button
                color="warning"
                tag={Link}
                to={`/groups/${group?.id}/newevent`}
              >
                Create new group event
              </Button>
              <br />
              <br />
              <b>OR</b>
              <br />
              <br />
              <h5>Link the existing event</h5>
              <Dropdown
                isOpen={isOpenDropdown}
                toggle={toggleDropdown}
                direction="down"
              >
                <DropdownToggle
                  caret
                  color="secondary"
                  outline
                  style={{ width: "100%" }}
                >
                  {truncate(selectedEventToLink?.title, { length: 30 }) ||
                    "Select event"}
                </DropdownToggle>
                <DropdownMenu
                  container="body"
                  style={{ zIndex: 9001, maxight: "300px", overflowY: "auto" }}
                >
                  {myEvents?.map((event) => (
                    <DropdownItem
                      key={event.id}
                      onClick={() => setSelectedEventToLink(event)}
                    >
                      {event.title}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              *List of events you've created
              <br />
              <Button
                color="warning"
                disable={!selectedEventToLink}
                onClick={linkEvent}
              >
                Submit
              </Button>
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </Container>
    </>
  );
};

export default Group;
