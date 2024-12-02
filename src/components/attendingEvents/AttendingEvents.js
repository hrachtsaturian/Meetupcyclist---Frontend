import React, { useEffect, useState } from "react";
import AttendingEventsTable from "./AttendingEventsTable";
import Loader from "../Loader";
import EventsAPI from "../../api/EventsAPI";

const AttendingEvents = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAttendingEvents() {
      try {
        const events = await EventsAPI.getAll({ showAttendingEvents: true });
        setAttendingEvents(events);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attending events:", err);
        setLoading(false);
      }
    }

    getAttendingEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="text-center mb-4">My Events</h3>
      <AttendingEventsTable attendingEvents={attendingEvents} />
    </>
  );
};

export default AttendingEvents;
