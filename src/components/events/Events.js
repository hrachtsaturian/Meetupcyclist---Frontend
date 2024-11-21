import React, { useEffect, useState } from "react";
import EventsAPI from "../../api/EventsAPI";
import EventsTable from "./EventsTable";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

const Events = () => {
  const [events, setEvents] = useState([]);
  console.log({events});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getEvents() {
    try {
      const res = await EventsAPI.getAll();
      setEvents(res);
      setIsLoading(false);
    } catch (error) {
      setError(error || "Failed to find events");
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="events-page">
      <div className="events-table-container">
        <h3 className="text-center mb-4">Events</h3>
        <EventsTable events={events} />
      </div>
      <div className="create-event-container">
        <h4>Would like to create a new event?</h4>
        <Link to="/events/new">
          <Col>
            <Button>Create</Button>
          </Col>
        </Link>
      </div>
    </div>
  );
}

export default Events;
