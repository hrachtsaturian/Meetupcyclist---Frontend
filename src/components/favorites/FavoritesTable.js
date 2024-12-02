import React from "react";
import FavoriteEventCard from "./FavoriteEventCard";

const FavoritesTable = ({ favorites, selectedFilter }) => {
  return (
    <div className="favorites-table">
      {favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <>
          {favorites.map((favorite) => {
            if (selectedFilter === "events") {
              return <FavoriteEventCard event={favorite} />;
            }
            // if (selectedFilter === "groups") {
            //   return <FavoriteGroupCard event={favorite} />;
            // }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default FavoritesTable;
