import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "reactstrap";
import AttendingEventsTable from "./AttendingEventsTable";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";

const AttendingEvents = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  // selector by default - upcoming
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getAttendingEventsApiRequest = async () => {
    if (selectedFilter === "upcoming") {
      const upcomingEvents = await EventsAPI.getAll({
        filter: { isAttending: true, minDate: new Date() },
      });
      return upcomingEvents;
    }
    if (selectedFilter === "past") {
      const pastEvents = await EventsAPI.getAll({
        filter: { isAttending: true, maxDate: new Date() },
        sort: { date: "DESC" },
      });
      return pastEvents;
    }
    return [];
  };

  const getAttendingEvents = async () => {
    setIsLoading(true);
    try {
      const events = await getAttendingEventsApiRequest();
      setAttendingEvents(events);
    } catch (e) {
      setError(e?.message || "Error fetching attending events");
      setAttendingEvents([]); // override with empty array since we are changing the filter
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAttendingEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        My Events
      </h3>
      <hr></hr>
      <div style={{ marginBottom: "12px", textAlign: "center" }}>
        <ButtonGroup>
          <Button
            onClick={() => setSelectedFilter("upcoming")}
            active={selectedFilter === "upcoming"}
            color={selectedFilter === "upcoming" ? "warning" : "outline"}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => setSelectedFilter("past")}
            active={selectedFilter === "past"}
            color={selectedFilter === "past" ? "warning" : "outline"}
          >
            Past
          </Button>
        </ButtonGroup>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <AttendingEventsTable
          attendingEvents={attendingEvents}
          getAttendingEvents={getAttendingEvents}
          setError={setError}
        />
      )}
    </>
  );
};

export default AttendingEvents;
