import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LocationsAPI from "../../api/LocationsAPI";
import Loader from "../Loader";
import Context from "../Context";
import { Button, Col } from "reactstrap";

const Location = () => {
  const { id } = useParams();

  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await LocationsAPI.removeSave(id); // Unsave the location
      setIsSaved(false);
    } else {
      await LocationsAPI.makeSave(id); // Save the location
      setIsSaved(true);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { name, description, address, createdBy, isSaved } =
          await LocationsAPI.get(id);
        setIsSaved(isSaved);
        setLocation({ name, description, address, createdBy });
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await LocationsAPI.delete(id);
      navigate("/locations");
    } catch (error) {
      setError("Failed to delete the location");
    }
  };

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find location info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let isAdmin = currentUser.isAdmin;
  let sameUser = currentUser.id === location.createdBy;

  return (
    <>
      <h3 className="text-center mb-4">Location</h3>
      <div className="location-header">
        <h5>{location.name}</h5>
        <p>{location.description}</p>
        <p>{location.address}</p>
        <Col>
          <Button onClick={toggleSave}>
            {isSaved ? "Unsave" : "Save"}
          </Button>
        </Col>
        {isAdmin || sameUser ? (
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button tag={Link} to={`/locations/${id}/edit`}>
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

export default Location;
