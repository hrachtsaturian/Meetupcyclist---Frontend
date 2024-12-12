import React, { useEffect, useState } from "react";
import JoinedGroupsTable from "./JoinedGroupsTable";
import GroupsAPI from "../../api/GroupsAPI";
import Loader from "../Loader";

const JoinedGroups = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getJoinedGroups() {
    try {
      const groups = await GroupsAPI.getAll({ isJoined: true });
      setJoinedGroups(groups);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching joined groups:", err);
    }
  }

  useEffect(() => {
    getJoinedGroups();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 style={{fontSize: "40px" }}className="text-center mb-2 meetupcyclist">My Groups</h3>
      <hr></hr>
      <JoinedGroupsTable
        joinedGroups={joinedGroups}
        getJoinedGroups={getJoinedGroups}
        setLoading={setLoading}
      />
    </>
  );
};

export default JoinedGroups;
