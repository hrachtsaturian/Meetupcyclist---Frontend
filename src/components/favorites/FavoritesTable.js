import React from "react";
import FavoriteRow from "./FavoriteRow";

const FavoritesTable = ({ favorites }) => {
  return (
    // the idea is have sectors on the page like :
    // My Favorites

    // EVENTS
    // [ ... ]

    // GROUPS
    // [ ... ]

    // LOCATIONS
    // [ ... ]

    <div className="favorites-table">
      <h5>Events</h5>
      {favorites.length === 0 ? (
        <p>You have no favorite events yet.</p>
      ) : (
        <>
          {favorites.map((favorite) => (
            <FavoriteRow favorite={favorite} />
          ))}
        </>
      )}
    </div>
  );
};

export default FavoritesTable;
