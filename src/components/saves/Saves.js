import React, { useEffect, useState } from "react";
import SavesTable from "./SavesTable";
import EventsAPI from "../../api/EventsAPI";
import GroupsAPI from "../../api/GroupsAPI";
import LocationsAPI from "../../api/LocationsAPI";
import { ButtonGroup, Button } from "reactstrap";
import Loader from "../Loader";

const Saves = () => {
  const [saves, setSaves] = useState([]);
  // selector by default - events
  const [selectedFilter, setSelectedFilter] = useState("events");
  const [isLoading, setIsLoading] = useState(true);

  // do we need await in front of .getAll() methods for fetching data?
  const getSavesApiRequest = async (selectedFilter) => {
    if (selectedFilter === "events") {
      return EventsAPI.getAll({ showSaves: true, showPastEvents: true });
    }
    if (selectedFilter === "groups") {
      return GroupsAPI.getAll({ showSaves: true });
    }
    if (selectedFilter === "locations") {
      return LocationsAPI.getAll({ showSaves: true });
    }
    return [];
  };

  const getSaves = async (selectedFilter) => {
    try {
      setIsLoading(true);
      const saves = await getSavesApiRequest(selectedFilter);
      setSaves(saves);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching saved data:", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSaves(selectedFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <>
      <h3 className="text-center mb-4">Saved</h3>
      <div style={{ marginBottom: '12px' }}>
        <ButtonGroup>
          <Button
            onClick={() => setSelectedFilter("events")}
            active={selectedFilter === "events"}
            color={selectedFilter === "events" ? "secondary" : "outline"}
          >
            Events
          </Button>
          <Button
            onClick={() => setSelectedFilter("groups")}
            active={selectedFilter === "groups"}
            color={selectedFilter === "groups" ? "secondary" : "outline"}
          >
            Groups
          </Button>
          <Button
            onClick={() => setSelectedFilter("locations")}
            active={selectedFilter === "locations"}
            color={selectedFilter === "locations" ? "secondary" : "outline"}
          >
            Locations
          </Button>
        </ButtonGroup>
      </div>
      {isLoading ? <Loader /> : <SavesTable saves={saves} selectedFilter={selectedFilter}/>}
    </>
  );
};

export default Saves;
