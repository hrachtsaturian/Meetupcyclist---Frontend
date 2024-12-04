import React from "react";
import SaveEventCard from "./SaveEventCard";
import SaveGroupCard from "./SaveGroupCard";
import SaveLocationCard from "./SaveLocationCard";

const SavesTable = ({ saves, selectedFilter }) => {
  return (
    <div className="saves-table" style={{ display: 'flex',  flexWrap: 'wrap', gap: '16px' }}>
      {saves.length === 0 ? (
        <p>You have nothing saved yet.</p>
      ) : (
        <>
          {saves.map((save) => {
            if (selectedFilter === "events") {
              return <SaveEventCard event={save} />;
            }
            if (selectedFilter === "groups") {
              return <SaveGroupCard group={save} />;
            }
            if (selectedFilter === "locations") {
              return <SaveLocationCard location={save} />;
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default SavesTable;
