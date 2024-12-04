import React, { useEffect, useState } from "react";
import AttendingEventsTable from "./AttendingEventsTable";
import EventsAPI from "../../api/EventsAPI";
import Loader from "../Loader";

const AttendingEvents = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAttendingEvents() {
    try {
      const events = await EventsAPI.getAll({
        showAttendingEvents: true,
        showPastEvents: true,
      });
      setAttendingEvents(events);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching attending events:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAttendingEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="text-center mb-4">My Events</h3>
      <AttendingEventsTable
        attendingEvents={attendingEvents}
        getAttendingEvents={getAttendingEvents}
        setLoading={setLoading}
      />
    </>
  );
};

export default AttendingEvents;
