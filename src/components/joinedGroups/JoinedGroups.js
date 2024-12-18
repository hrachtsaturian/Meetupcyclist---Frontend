import React, { useEffect, useState } from "react";
import JoinedGroupsTable from "./JoinedGroupsTable";
import GroupsAPI from "../../api/GroupsAPI";
import Loader from "../Loader";

const JoinedGroups = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getJoinedGroups = async () => {
    setIsLoading(true);
    try {
      const groups = await GroupsAPI.getAll({ isJoined: true });
      setJoinedGroups(groups);
    } catch (e) {
      setError(e?.message || "Error fetching joined groups");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getJoinedGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        My Groups
      </h3>
      <hr></hr>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <JoinedGroupsTable
          joinedGroups={joinedGroups}
          getJoinedGroups={getJoinedGroups}
          setError={setError}
        />
      )}
    </>
  );
};

export default JoinedGroups;
