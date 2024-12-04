import React from "react";
import AttendingEventCard from "./AttendingEventCard";

const AttendingEventsTable = ({
  attendingEvents,
  getAttendingEvents,
  setLoading,
}) => {
  return (
    <div
      className="attendingEvents-table"
      style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
    >
      {attendingEvents.length === 0 ? (
        <p>You have no attending events yet.</p>
      ) : (
        <>
          {attendingEvents.map((attendingEvent, i) => (
            <AttendingEventCard
              key={i}
              attendingEvent={attendingEvent}
              getAttendingEvents={getAttendingEvents}
              setLoading={setLoading}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AttendingEventsTable;
