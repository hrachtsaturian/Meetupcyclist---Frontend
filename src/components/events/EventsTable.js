import React from "react";
import EventRow from "./EventRow";

const EventsTable = ({ events }) => {
  return (
    <div className="events-table">
      {events?.length > 0
        ? events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))
        : "No events yet"}
    </div>
  );
}

export default EventsTable;
