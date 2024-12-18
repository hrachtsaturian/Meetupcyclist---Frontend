import React from "react";
import JoinedGroupCard from "./JoinedGroupCard";

const JoinedGroupsTable = ({ joinedGroups, getJoinedGroups, setError }) => {
  return (
    <div
      className="joinedGroups-table"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      {joinedGroups.length === 0 ? (
        <p>You have not joined any groups yet.</p>
      ) : (
        <>
          {joinedGroups.map((joinedGroup, i) => (
            <JoinedGroupCard
              key={i}
              joinedGroup={joinedGroup}
              getJoinedGroups={getJoinedGroups}
              setError={setError}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default JoinedGroupsTable;
