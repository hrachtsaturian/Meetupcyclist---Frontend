import React, { useEffect, useState } from 'react';
import FavoritesTable from './FavoritesTable';
import axios from 'axios';
import Loader from '../Loader';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function getFavorites() {
        try {
          const res = await axios.get("/events?showFavorites=true");
          setFavorites(res.data.data)
          console.log(favorites)
          setLoading(false);
        } catch (err) {
          console.error("Error fetching favorite events:", err);
          setLoading(false);
        }
      }
  
      getFavorites();
    }, []);
  
    if (loading) {
      return <Loader />
    }

  return (
    <>
      <h3 className="text-center mb-4">My Favorites</h3>
          <FavoritesTable favorites={favorites} />
    </>
  );
};

export default Favorites;
