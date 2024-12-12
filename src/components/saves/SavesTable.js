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
          {saves.map((save, i) => {
            if (selectedFilter === "events") {
              return (
                <SaveEventCard
                  key={i}
                  event={save}
                  getSaves={getSaves}
                  setLoading={setLoading}
                />
              );
            }
            if (selectedFilter === "groups") {
              return (
                <SaveGroupCard
                  key={i}
                  group={save}
                  getSaves={getSaves}
                  setLoading={setLoading}
                />
              );
            }
            if (selectedFilter === "locations") {
              return (
                <SaveLocationCard
                  key={i}
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
