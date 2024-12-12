import React from "react";
import GroupRow from "./GroupRow";

const GroupsTable = ({ groups }) => {
  return (
    <div className="groups-table">
      {groups?.length > 0
        ? groups.map((group) => <GroupRow key={group.id} group={group} />)
        : "No groups yet"}
    </div>
  );
};

export default GroupsTable;
