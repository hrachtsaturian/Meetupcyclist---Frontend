import React, { useEffect, useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import GroupsTable from "./GroupsTable";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  console.log({ groups });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getGroups() {
    try {
      const res = await GroupsAPI.getAll();
      setGroups(res);
      setIsLoading(false);
    } catch (error) {
      setError(error || "Failed to find groups");
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
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
        <h3 className="text-center mb-4">Groups</h3>
        <GroupsTable groups={groups} />
      </div>
      <div className="create-group-container">
        <h4>Would like to create a new group?</h4>
        <Link to="/groups/new">
          <Col>
            <Button>Create</Button>
          </Col>
        </Link>
      </div>
    </div>
  );
};

export default Groups;
