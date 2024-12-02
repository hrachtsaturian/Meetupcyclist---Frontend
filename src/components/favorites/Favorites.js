import React, { useEffect, useState } from "react";
import FavoritesTable from "./FavoritesTable";
import Loader from "../Loader";
import EventsAPI from "../../api/EventsAPI";
import { ButtonGroup, Button } from "reactstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  // selector by default - events
  const [selectedFilter, setSelectedFilter] = useState("events");
  const [isLoading, setIsLoading] = useState(true);

  const getFavoritesApiRequest = async (selectedFilter) => {
    if (selectedFilter === "events") {
      return EventsAPI.getAll({ showFavorites: true });
    }
    // if (selectedFilter === "groups") {
    //   return GroupsAPI.getAll({ showFavorites: true });
    // }
    return [];
  };

  const getFavorites = async (selectedFilter) => {
    try {
      setIsLoading(true);
      const favorites = await getFavoritesApiRequest(selectedFilter);
      setFavorites(favorites);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching favorite data:", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFavorites(selectedFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <>
      <h3 className="text-center mb-4">My Favorites</h3>
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
      {isLoading ? <Loader /> : <FavoritesTable favorites={favorites} selectedFilter={selectedFilter}/>}
    </>
  );
};

export default Favorites;
