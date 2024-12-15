import React from "react";
import SaveEventCard from "./SaveEventCard";
import SaveGroupCard from "./SaveGroupCard";
import SaveLocationCard from "./SaveLocationCard";

const SavesTable = ({ saves, selectedFilter, getSaves, setLoading }) => {
  return (
    <div
      className="saves-table"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        paddingTop: "20px"
      }}
    >
      {saves.length === 0 ? (
        <p>You have nothing saved yet.</p>
      ) : (
        <>
          {saves.map((save) => {
            if (selectedFilter === "events") {
              return (
                <SaveEventCard
                  key={`event-${save.id}`}
                  event={save}
                  getSaves={getSaves}
                  setLoading={setLoading}
                />
              );
            }
            if (selectedFilter === "groups") {
              return (
                <SaveGroupCard
                  key={`group-${save.id}`}
                  group={save}
                  getSaves={getSaves}
                  setLoading={setLoading}
                />
              );
            }
            if (selectedFilter === "locations") {
              return (
                <SaveLocationCard
                  key={`lcoation-${save.id}`}
                  location={save}
                  getSaves={getSaves}
                  setLoading={setLoading}
                />
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default SavesTable;
