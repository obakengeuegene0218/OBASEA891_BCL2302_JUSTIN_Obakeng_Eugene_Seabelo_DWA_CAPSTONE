// FavoritesList.js

// User.jsx
import React from 'react';
import { supabase } from '../supabaseClient';

const User = ({ selectedShow }) => {
  const [favorites, setFavorites] = React.useState([]);
  const [newFavorite, setNewFavorite] = React.useState('');
  const [sortingType, setSortingType] = React.useState('name'); // 'name' or 'date'
  const [sortingOrder, setSortingOrder] = React.useState('ascending'); // 'ascending' or 'descending'

  React.useEffect(() => {
    // Load favorites from the Supabase database when the component mounts
    fetchFavoritesFromDatabase();
  }, []);

  const fetchFavoritesFromDatabase = async () => {
    try {
      // Fetch favorites data from the 'favorites' table in the Supabase database
      const { data, error } = await supabase.from('favorites').select('*');

      if (error) {
        throw new Error(error.message);
      }

      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const saveFavoriteToDatabase = async (newFav) => {
    try {
      // Insert the new favorite into the 'favorites' table in the Supabase database
      const { data, error } = await supabase.from('favorites').insert([newFav]);

      if (error) {
        throw new Error(error.message);
      }

      // Update the state with the newly inserted favorite from the database
      setFavorites([...favorites, data[0]]);
    } catch (error) {
      console.error('Error saving favorite to database:', error);
    }
  };

  const handleAddFavorite = () => {
    if (!selectedShow) {
      // If no selected show, return early
      return;
    }

    const { title, seasons } = selectedShow;

    if (newFavorite.trim() === '') {
      return;
    }

    const seasonNames = seasons.map((season) => `Season ${season.number}`);
    const showNames = [title, ...seasonNames];

    if (!favorites.some((fav) => showNames.includes(fav.name))) {
      const newFav = {
        name: newFavorite.trim(),
        date: new Date().toISOString(),
      };

      // Save the new favorite to both state and the Supabase database
      saveFavoriteToDatabase(newFav);

      setNewFavorite('');
    }
  };

  const handleRemoveFavorite = (favorite) => {
    const updatedFavorites = favorites.filter((item) => item.name !== favorite.name);
    setFavorites(updatedFavorites);
  };

  const handleSortingTypeChange = (e) => {
    setSortingType(e.target.value);
  };

  const handleSortingOrderChange = (e) => {
    setSortingOrder(e.target.value);
  };

  const handleLoggingToSupabase = () => {
    // Redirect the user to the Supabase sign-in page
    window.location.href = 'https://app.supabase.com/sign-in';
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const sortedFavorites = favorites.slice().sort((a, b) => {
    if (sortingType === 'name') {
      if (sortingOrder === 'ascending') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else {
      if (sortingOrder === 'ascending') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    }
  });

  return (
    <div className="epi-favor">
      <h2 className="h2-favourites">User Favorites</h2>
      <div className="add-favorites">
        <input
          type="text"
          className="input-favours"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Enter favorite item"
        />
        <button onClick={handleAddFavorite} className="btn-favours">
          Add Favorite
        </button>
      </div>

      <div>
        <label htmlFor="sortingType">Sort by:</label>
        <select id="sortingType" name="sortingType" value={sortingType} onChange={handleSortingTypeChange}>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>

        <label htmlFor="sortingOrder">Order:</label>
        <select id="sortingOrder" name="sortingOrder" value={sortingOrder} onChange={handleSortingOrderChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <ul className="ul-favours">
        {sortedFavorites.map((favorite, index) => (
          <li key={index} className="li-favours">
            {favorite.name} (Added on {formatDate(favorite.date)}){' '}
            <button onClick={() => handleRemoveFavorite(favorite)} className="btn-favours">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="auth">
        <button onClick={handleLoggingToSupabase} className="check-fav">
          Check Favorites
        </button>
      </div>
    </div>
  );
};

export default User;
