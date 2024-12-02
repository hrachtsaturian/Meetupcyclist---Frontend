import React from "react";
import AttendingEventCard from "./AttendingEventCard";

const AttendingEventsTable = ({ attendingEvents }) => {
  return (
    <div className="attendingEvents-table" style={{ display: 'flex', gap: '16px' }}>
      {attendingEvents.length === 0 ? (
        <p>You have no attending events yet.</p>
      ) : (
        <>
          {attendingEvents.map((attendingEvent) => (
            <AttendingEventCard attendingEvent={attendingEvent} />
          ))}
        </>
      )}
    </div>
  );
};

export default AttendingEventsTable;
