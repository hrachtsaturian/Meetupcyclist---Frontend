import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";
import Context from "../Context";
import { Button, Col } from "reactstrap";
import { formatData } from "../../helpers/helpers";

const Event = () => {
  const { id } = useParams();

  const [event, setEvent] = useState();
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
        const {
          title,
          description,
          date,
          location,
          createdBy,
          isSaved,
          isAttending,
        } = await EventsAPI.get(id);
        setIsAttending(isAttending);
        setIsSaved(isSaved);
        setEvent({ title, description, date, location, createdBy });
        setIsLoading(false);
      } catch (error) {
        setError(error);
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

  return (
    <>
      <h3 className="text-center mb-4">Event</h3>
      <div className="event-header">
        <h5>{event.title}</h5>
        <p>{event.description}</p>
        <b>{formatData(event.date)}</b>
        <b>{event.location}</b>
        <Col>
          <Button onClick={toggleAttendance}>
            {isAttending ? "Unattend" : "Attend"}
          </Button>
        </Col>
        <Col>
          <Button onClick={toggleSave}>{isSaved ? "Unsave" : "Save"}</Button>
        </Col>
        {sameUser ? (
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button tag={Link} to={`/events/${id}/edit`}>
              Edit
            </Button>
            <Button color="danger" onClick={handleDelete} className="ms-2">
              Delete
            </Button>
          </Col>
        ) : null}
      </div>
    </>
  );
};

export default Event;
