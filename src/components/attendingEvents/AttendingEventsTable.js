import React from "react";
import AttendingEventCard from "./AttendingEventCard";

const AttendingEventsTable = ({
  attendingEvents,
  getAttendingEvents,
  setError,
}) => {
  return (
    <div
      className="attendingEvents-table"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      {attendingEvents.length === 0 ? (
        <p>You have nothing yet.</p>
      ) : (
        <>
          {attendingEvents.map((attendingEvent, i) => {
            return (
              <AttendingEventCard
                key={i}
                attendingEvent={attendingEvent}
                getAttendingEvents={getAttendingEvents}
                setError={setError}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default AttendingEventsTable;
