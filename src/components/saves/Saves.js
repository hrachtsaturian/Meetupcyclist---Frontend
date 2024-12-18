import React, { useEffect, useState } from "react";
import SavesTable from "./SavesTable";
import EventsAPI from "../../api/EventsAPI";
import GroupsAPI from "../../api/GroupsAPI";
import LocationsAPI from "../../api/LocationsAPI";
import Loader from "../Loader";
import { ButtonGroup, Button } from "reactstrap";

const Saves = () => {
  const [saves, setSaves] = useState([]);
  // selector by default - events
  const [selectedFilter, setSelectedFilter] = useState("events");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getSavesApiRequest = async () => {
    if (selectedFilter === "events") {
      const savedEvents = await EventsAPI.getAll({
        filter: { isSaved: true },
        sort: { date: "DESC" },
      });
      return savedEvents;
    }
    if (selectedFilter === "groups") {
      const savedGroups = await GroupsAPI.getAll({ isSaved: true });
      return savedGroups;
    }
    if (selectedFilter === "locations") {
      const savedLocations = await LocationsAPI.getAll({ isSaved: true });
      return savedLocations;
    }
    return [];
  };

  const getSaves = async () => {
    setIsLoading(true);
    try {
      const saves = await getSavesApiRequest();
      setSaves(saves);
    } catch (e) {
      setError(e?.message || "Error fetching saved data");
      setSaves([]); // override with empty array since we are changing the filter
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Saved
      </h3>
      <hr></hr>
      <div style={{ marginBottom: "12px", textAlign: "center" }}>
        <ButtonGroup>
          <Button
            onClick={() => setSelectedFilter("events")}
            active={selectedFilter === "events"}
            color={selectedFilter === "events" ? "warning" : "outline"}
          >
            Events
          </Button>
          <Button
            onClick={() => setSelectedFilter("groups")}
            active={selectedFilter === "groups"}
            color={selectedFilter === "groups" ? "warning" : "outline"}
          >
            Groups
          </Button>
          <Button
            onClick={() => setSelectedFilter("locations")}
            active={selectedFilter === "locations"}
            color={selectedFilter === "locations" ? "warning" : "outline"}
          >
            Locations
          </Button>
        </ButtonGroup>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <SavesTable
          saves={saves}
          selectedFilter={selectedFilter}
          getSaves={getSaves}
          setError={setError}
        />
      )}
    </>
  );
};

export default Saves;
