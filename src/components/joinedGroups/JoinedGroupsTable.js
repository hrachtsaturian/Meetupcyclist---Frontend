import React from "react";
import JoinedGroupRow from "./JoinedGroupRow";

const JoinedGroupsTable = ({ joinedGroups }) => {
  return (
    <div className="joinedGroups-table">
      {joinedGroups.length === 0 ? (
        <p>You have not joined any groups yet.</p>
      ) : (
        <>
          {joinedGroups.map((joinedGroup) => (
            <JoinedGroupRow joinedGroup={joinedGroup} />
          ))}
        </>
      )}
    </div>
  );
};

export default JoinedGroupsTable;
