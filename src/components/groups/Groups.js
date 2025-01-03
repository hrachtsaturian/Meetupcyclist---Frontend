import React, { useEffect, useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import GroupsTable from "./GroupsTable";
import SearchBar from "../SearchBar";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getGroups = async () => {
    try {
      const res = await GroupsAPI.getAll();
      setGroups(res);
      setFilteredGroups(res);
      setIsLoading(false);
    } catch (e) {
      setError(e?.message || "Failed to find groups");
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger container" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="groups-page">
      <div className="groups-table-container">
        <h3
          style={{ fontSize: "40px" }}
          className="text-center mb-2 meetupcyclist"
        >
          Groups
        </h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <SearchBar
            data={groups}
            searchField="name"
            placeholder="Search groups..."
            onSearchResults={setFilteredGroups}
          />
          <Link to="/groups/new">
            <Button color="warning" className="yellow-button">
              Create Group
            </Button>
          </Link>
        </div>
        <GroupsTable groups={filteredGroups} />
      </div>
    </div>
  );
};

export default Groups;
