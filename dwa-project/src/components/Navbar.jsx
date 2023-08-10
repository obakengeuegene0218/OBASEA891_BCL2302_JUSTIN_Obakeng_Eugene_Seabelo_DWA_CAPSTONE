import React, { useState } from 'react';

const Navbar = ({ onSort, onShowFavorites, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim());
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onGenreChange(e.target.value); // Make sure you have this function in the parent component
  }

  return (
    <nav className="bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange} // Use handleSearchChange for input change
        placeholder="Search shows..."
      />
      <button onClick={handleSearchClick}>Search</button>
      <select id="sortDropdown" onChange={(e) => onSort(e.target.value)}>
        <option value="" disabled defaultValue>
          Select an option
        </option>
        <option value="titleAZ">Title A-Z</option>
        <option value="titleZA">Title Z-A</option>
        <option value="dateUpdatedAscending">Date Updated (Ascending)</option>
        <option value="dateUpdatedDescending">Date Updated (Descending)</option>
      </select>
      <div className="nav-center">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="True Crime and Investigative Journalism">True Crime and Investigative Journalism</option>
          <option value="History">History</option>
          <option value="Comedy">Comedy</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="News">News</option>
          <option value="Kids and Family">Kids and Family</option>
        </select>
      </div>
      <button onClick={onShowFavorites}>Favorites List</button>
    </nav>
  );
};

export default Navbar;
