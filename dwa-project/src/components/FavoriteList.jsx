import React from 'react';

const FavoritesList = ({
  favoriteEpisodes,
  favoriteEpisodesSearchQuery,
  favoriteEpisodesSortBy,
  addToFavoriteEpisodes,
  removeFromFavoriteEpisodes,
}) => {
  const renderFavoriteEpisodes = () => {
    const filteredFavoriteEpisodes = favoriteEpisodes.filter((episode) =>
      episode.title.toLowerCase().includes(favoriteEpisodesSearchQuery.toLowerCase())
    );
    const sortedFavoriteEpisodes = [...filteredFavoriteEpisodes];
    if (favoriteEpisodesSortBy === 'title') {
      sortedFavoriteEpisodes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (favoriteEpisodesSortBy === 'date') {
      sortedFavoriteEpisodes.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    return (
      <ul>
        {sortedFavoriteEpisodes.map((episode) => (
          <li key={episode.id}>
            <h4>{episode.name}</h4>
            <p>{episode.title}</p>
            <audio controls>
              <source src={episode.file} />
            </audio>
            {favoriteEpisodes.some((fav) => fav.id === episode.id) ? (
              <button onClick={() => removeFromFavoriteEpisodes(episode.id)}>
                Remove from Favorites
              </button>
            ) : (
              <button onClick={() => addToFavoriteEpisodes(episode)}>Add to Favorites</button>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="favorites-list">
      <div className="favorite-episodes">
        <h2>Your Favorite Episodes</h2>
        {renderFavoriteEpisodes()} {/* Call the renderFavoriteEpisodes function */}
      </div>
    </div>
  );
};

export default FavoritesList;



