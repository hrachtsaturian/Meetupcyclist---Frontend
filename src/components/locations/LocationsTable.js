import React from "react";
import LocationRow from "./LocationRow";

const LocationsTable = ({ locations }) => {
  return (
    <div className="locations-table">
      {locations?.length > 0
        ? locations.map((location) => (
            <LocationRow key={location.id} location={location} />
          ))
        : "No results"}
    </div>
  );
};

export default LocationsTable;
