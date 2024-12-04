import React from "react";
import JoinedGroupRow from "./JoinedGroupCard";

const JoinedGroupsTable = ({ joinedGroups }) => {
  return (
    <div className="joinedGroups-table" style={{ display: 'flex',  flexWrap: 'wrap', gap: '16px' }}>
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
