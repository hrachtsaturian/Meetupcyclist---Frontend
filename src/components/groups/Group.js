import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import GroupsAPI from "../../api/GroupsAPI";
import Loader from "../Loader";
import Context from "../Context";
import { Button, Col } from "reactstrap";

const Group = () => {
  const { id } = useParams();

  const [group, setGroup] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleMembership = async () => {
    if (isJoined) {
      await GroupsAPI.leave(id); // Leave the group
      setIsJoined(false);
    } else {
      await GroupsAPI.join(id); // Join the group
      setIsJoined(true);
    }
  };

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await GroupsAPI.removeSave(id); // Unsave the group
      setIsSaved(false);
    } else {
      await GroupsAPI.makeSave(id); // Save the group
      setIsSaved(true);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { name, description, createdBy, isSaved, isJoined } =
          await GroupsAPI.get(id);
        setIsJoined(isJoined);
        setIsSaved(isSaved);
        setGroup({ name, description, createdBy });
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await GroupsAPI.delete(id);
      navigate("/groups");
    } catch (error) {
      setError("Failed to delete the group");
    }
  };

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find group info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let sameUser = currentUser.id === group.createdBy;

  return (
    <>
      <h3 className="text-center mb-4">Group</h3>
      <div className="group-header">
        <h5>{group.name}</h5>
        <p>{group.description}</p>
        <Col>
          <Button onClick={toggleMembership}>
            {isJoined ? "Leave" : "Join"}
          </Button>
        </Col>
        <Col>
          <Button onClick={toggleSave}>{isSaved ? "Unsave" : "Save"}</Button>
        </Col>
        {sameUser ? (
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button tag={Link} to={`/groups/${id}/edit`}>
              Edit
            </Button>
            <Button color="danger" onClick={handleDelete} className="ms-2">
              Delete
            </Button>
          </Col>
        ) : null}
      </div>
    </>
  );
};

export default Group;
