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
  const [loading, setLoading] = useState(true);

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
    try {
      setLoading(true);
      const saves = await getSavesApiRequest();
      setSaves(saves);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching saved data:", err);
      setLoading(false);
    }
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
      {loading ? (
        <Loader />
      ) : (
        <SavesTable
          saves={saves}
          selectedFilter={selectedFilter}
          getSaves={getSaves}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default Saves;
