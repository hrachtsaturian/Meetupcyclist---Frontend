import React, { useContext, useEffect, useState } from "react";
import LocationsAPI from "../../api/LocationsAPI";
import LocationsTable from "./LocationsTable";
import SearchBar from "../SearchBar";
import Context from "../Context";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Locations = () => {
  const { currentUser } = useContext(Context);

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getLocations() {
    try {
      const res = await LocationsAPI.getAll();
      setLocations(res);
      setFilteredLocations(res);
      setIsLoading(false);
    } catch (error) {
      setError(error?.message || "Failed to find locations");
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
        <h3
          style={{ fontSize: "40px" }}
          className="text-center mb-2 meetupcyclist"
        >
          Locations
        </h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <SearchBar
            data={locations}
            searchField="name"
            placeholder="Search locations..."
            onSearchResults={setFilteredLocations}
          />
          {currentUser.isAdmin ? (
            <Link to="/locations/new">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Button color="warning" className="yellow-button">
                  Create Location
                </Button>
              </div>
            </Link>
          ) : null}
        </div>
      <LocationsTable locations={filteredLocations} />
      </div>
    </div>
  );
};

export default Locations;
