import React, { useEffect, useState } from "react";
import EventsAPI from "../../api/EventsAPI";
import EventsTable from "./EventsTable";
import SearchBar from "../SearchBar";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getEvents = async () => {
    try {
      const res = await EventsAPI.getAll({ filter: { minDate: new Date() } });
      setEvents(res);
      setFilteredEvents(res);
      setIsLoading(false);
    } catch (error) {
      setError(error?.message || "Failed to find events");
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
        <h3
          style={{ fontSize: "40px" }}
          className="text-center mb-2 meetupcyclist"
        >
          Events
        </h3>
        <div style={{ display: "flex", gap: '40px', justifyContent: 'space-between' }}>
          <SearchBar
            data={events}
            searchField="title"
            placeholder="Search events..."
            onSearchResults={setFilteredEvents}
          />
          <Link to="/events/new">
            <Col>
              <Button color="warning" className="yellow-button">
                Create Event
              </Button>
            </Col>
          </Link>
        </div>
        <EventsTable events={filteredEvents} />
      </div>
    </div>
  );
};

export default Events;
