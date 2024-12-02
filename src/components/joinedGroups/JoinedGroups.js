import React, { useEffect, useState } from "react";
import JoinedGroupsTable from "./JoinedGroupsTable";
import axios from "axios";
import Loader from "../Loader";

const JoinedGroups = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJoinedGroups() {
      try {
        const res = await axios.get("/groups?showJoinedGroups=true");
        setJoinedGroups(res.data.data);
        console.log(joinedGroups);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching joined groups:", err);
        setLoading(false);
      }
    }

    getJoinedGroups();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="text-center mb-4">My Groups</h3>
      <JoinedGroupsTable joinedGroups={joinedGroups} />
    </>
  );
};

export default JoinedGroups;
