import React,  { useState } from 'react';

const Navbar = ({ onSort, onShowFavorites, onLogout, user, onLogin, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim()); // Pass the trimmed search query to the onSearch prop
  };


  return (
    
    <nav>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick}>Search</button>
      <select id="sortDropdown" onChange={(e) => onSort(e.target.value)  }>
        <option value="" disabled selected>
          Select an option
        </option>
        <option value="titleAZ">Title A-Z</option>
        <option value="titleZA">Title Z-A</option>
        <option value="dateUpdatedAscending">Date Updated (Ascending)</option>
        <option value="dateUpdatedDescending">Date Updated (Descending)</option>
      </select>
      <div className="nav-center">
        <select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="True Crime and Investigative Journalism">True Crime and Investigative Journalism</option>
          <option value="History">History</option>
          {/* Add other genre options here */}
        </select>
      </div>
      <button onClick={onShowFavorites}>Favorites List</button>
      {user ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;


