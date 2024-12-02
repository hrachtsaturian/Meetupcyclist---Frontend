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
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleMembership = async () => {
    if (isFavorite) {
      await GroupsAPI.withdraw(id); // Withdraw from the group
      setIsFavorite(false);
    } else {
      await GroupsAPI.join(id); // Join the group
      setIsFavorite(true);
    }
  };

  // do we need loading state to prevent double click?
  const toggleFavorite = async () => {
    if (isFavorite) {
      await GroupsAPI.removeFav(id); // Unfavorite the group
      setIsFavorite(false);
    } else {
      await GroupsAPI.makeFav(id); // Favorite the group
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { name, description, createdBy, isFavorite, isJoined } =
          await GroupsAPI.get(id);
        setIsJoined(isJoined);
        setIsFavorite(isFavorite);
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
            {isJoined ? "Withdraw" : "Join"}
          </Button>
        </Col>
        <Col>
          <Button onClick={toggleFavorite}>
            {isFavorite ? "Unfavorite" : "Add to Favorites"}
          </Button>
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
