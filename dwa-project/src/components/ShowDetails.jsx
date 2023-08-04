import React, { useState, useEffect } from 'react';
import { fetchShowDetails } from '../data'; // Import the function to fetch show details

const ShowDetailsPage = ({ show }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const genresList = show.genres ? show.genres.join(', ') : 'Unknown';

  useEffect(() => {
    const fetchShowDetailsData = async () => {
      try {
        // Check if showId exists before making the API request
        if (show.id) {
          const showData = await fetchShowDetails(show.id);
          // Check if the response is valid and contains data
          if (showData) {
            setShowDetails(showData);
          } else {
            console.error('Error fetching show details: Empty response');
          }
        }
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };
    fetchShowDetailsData();
  }, [show.id]);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
  };

  return (
    <div>
      <h2>{show.title}</h2>
      <img src={show.image} alt={show.title} />
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
      <p>Genres: {genresList}</p>

      {showDetails ? (
        <div>
          <h3>Seasons:</h3>
          {showDetails.seasons.map((season) => (
            <div key={season.number}>
              <h4 onClick={() => handleSeasonClick(season)}>Season {season.number}</h4>
              {selectedSeason === season && (
                <div>
                  <p>Number of Episodes: {season.episodes.length}</p>
                  {season.episodes.map((episode) => (
                    <div key={episode.id}>
                      <p>{episode.title}</p>
                      <audio controls>
                        <source src={episode.file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetailsPage;





