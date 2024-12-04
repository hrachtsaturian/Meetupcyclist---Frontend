import React, { useEffect, useState } from "react";
import LocationsAPI from "../../api/LocationsAPI";
import LocationsTable from "./LocationsTable";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  console.log({ locations });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getLocations() {
    try {
      const res = await LocationsAPI.getAll();
      setLocations(res);
      setIsLoading(false);
    } catch (error) {
      setError(error || "Failed to find locations");
    }
  }

  useEffect(() => {
    getLocations();
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
    <div className="locations-page">
      <div className="locations-table-container">
        <h3 className="text-center mb-4">Locations</h3>
        <LocationsTable locations={locations} />
      </div>
      <div className="create-location-container">
        <Link to="/locations/new">
          <Col>
            <Button>Create a new location</Button>
          </Col>
        </Link>
      </div>
    </div>
  );
};

export default Locations;
