import React, { useEffect, useState } from "react";
import AttendingEventsTable from "./AttendingEventsTable";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";
import { ButtonGroup, Button } from "reactstrap";

const AttendingEvents = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  // selector by default - upcoming
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const getAttendingEventsApiRequest = async () => {
    if (selectedFilter === "upcoming") {
      const upcomingEvents = await EventsAPI.getAll({
        filter: { isAttending: true, minDate: new Date() }
      });
      return upcomingEvents;
    }
    if (selectedFilter === "past") {
      const pastEvents = await EventsAPI.getAll({
        filter: { isAttending: true, maxDate: new Date() },
        sort: { date: 'DESC' }
      });
      return pastEvents;
    }
    return [];
  };

  const getAttendingEvents = async () => {
    try {
      setLoading(true);
      const events = await getAttendingEventsApiRequest();
      setAttendingEvents(events);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching attending events:", err);
      setLoading(false);
    }
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
      <div style={{ marginBottom: "12px" }}>
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
      {loading ? (
        <Loader />
      ) : (
        <AttendingEventsTable
          attendingEvents={attendingEvents}
          getAttendingEvents={getAttendingEvents}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default AttendingEvents;
