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
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleFavorite = async () => {
    if (isFavorite) {
      await EventsAPI.removeFav(id); // Unfavorite the event
      setIsFavorite(false);
    } else {
      await EventsAPI.makeFav(id); // Favorite the event
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { title, description, date, location, createdBy, isFavorite } =
          await EventsAPI.get(id);
        setIsFavorite(isFavorite);
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
          <Button onClick={toggleFavorite}>
            {isFavorite ? "Unfavorite" : "Add to Favorites"}
          </Button>
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
