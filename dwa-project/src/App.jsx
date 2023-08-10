// Import necessary modules and components
import React, { useState, useEffect, Fragment } from 'react';
import { fetchShowPreviews, fetchShowDetails } from './data';
import ShowPreview from './components/preview';
import FavoritesList from './components/FavoriteList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { supabase } from './supabaseClient';
import './App.css';
import Fuse from 'fuse.js'; // Import the Fuse.js library for fuzzy searching
import Hero from './components/Hero';


const App = () => {
  // State variables using React hooks
  const [showPreviews, setShowPreviews] = useState([]);
  const [view, setView] = useState('login');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalShowPreviews, setOriginalShowPreviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState('signUpPhase');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); // State for selected genre
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);




  // Add to favorite shows
  const addToFavoriteShows = (show) => {
    setFavoriteShows((prevFavorites) => [...prevFavorites, show]);
  };



  // Remove from favorite shows
  const removeFromFavoriteShows = (showId) => {
    setFavoriteShows((prevFavorites) => prevFavorites.filter((fav) => fav.id !== showId));
  };





  // Function to handle search
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
  
    if (trimmedQuery === '') {
      setShowPreviews(originalShowPreviews);
    } else {
      const fuse = new Fuse(originalShowPreviews, { keys: ['title', 'keywords'] });
      const searchResults = fuse.search(trimmedQuery); // Use trimmedQuery instead of searchQuery
  
      const filteredPreviews = searchResults.map((result) => result.item);
  
      setShowPreviews(filteredPreviews);
    }
  };
  
  
  
  





  // Fetch show previews on component mount
  useEffect(() => {
    const getShowPreviews = async () => {
      setLoading(true);
      try {
        const previews = await fetchShowPreviews();
        setShowPreviews(previews);
        setOriginalShowPreviews(previews);
      } catch (error) {
        console.error('Error fetching show previews:', error);
      } finally {
        setLoading(false);
      }
    };
    getShowPreviews();
  }, []);






  // Function to handle sorting of shows
  const handleSort = (criteria) => {
    const sortedShows = [...showPreviews];

    switch (criteria) {
      case 'titleAZ':
        sortedShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZA':
        sortedShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateUpdatedAscending':
        sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case 'dateUpdatedDescending':
        sortedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'genre':
        if (selectedGenre) {
          sortedShows.sort((a, b) => a.genres.includes(parseInt(selectedGenre)) ? -1 : 1);
        }
        break;
      default:
        break;
    }

    setShowPreviews(sortedShows);
  };






  // Function to remove a show from favorites
  const removeFromFavoriteEpisodes = (episodeId) => {
    setFavoriteEpisodes((prevFavorites) => prevFavorites.filter((fav) => fav.id !== episodeId));
  };



  // Function to handle clicking on a show to view details
  const handleShowClick = async (showId) => {
    try {
      setLoading(true);
      const data = await fetchShowDetails(showId);
      setSelectedShow(data);
      setSelectedSeason(null);
      setView('showDetail');
    } catch (error) {
      console.error('Error fetching show details:', error);
    } finally {
      setLoading(false);
    }
  };




  // Function to handle clicking on a season to view episodes
  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };




  // Authentication listener to update login status
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in successfully:', session.user.email);
        setIsLoggedIn('startPhase');
      }
    });
    return () => {
      // authListener.unsubscribe();
    };
  }, []);

  // Function to handle genre change
  
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  
    // Filter show previews based on selected genre
    const filteredShows = originalShowPreviews.filter((preview) =>
      genre === '' || preview.genres.includes(parseInt(genre))
    );
  
    setShowPreviews(filteredShows); // Use setShowPreviews instead of setFilteredPreviews
  };
  


  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="app-container">
        <header>
          <h1 className="head">Podcast App</h1>
        </header>
        <Navbar
          user={user}
          onSort={handleSort}
          onShowFavorites={handleShowFavorites}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedGenre={setSelectedGenre}
          favoriteShows={favoriteShows}
          addToFavoriteShows={addToFavoriteShows}
          removeFromFavoriteShows={removeFromFavoriteShows}
          onGenreChange={handleGenreChange}
/>
        <main>
          {isLoggedIn === 'signUpPhase' && <Login onLogin={() => setIsLoggedIn('startPhase')} />}
          {isLoggedIn === 'startPhase' && (
            <div>
              {view === 'showDetail' && selectedShow ? (
                <div className="episodes-container">
                  <button onClick={() => setView('startPhase')}>Back to Show List</button>
                  <div>
                    <h2>{selectedShow.title}</h2>
                    {selectedShow.seasons.map((season) => (
                      <div key={season.number}>
                        <h3>Season {season.number}</h3>
                        {selectedSeason === season.number ? (
                          <ul>
                            {season.episodes.map((episode) => (
                              <Fragment key={episode.id}>
                                <h4>{episode.name}</h4>
                                <li>{episode.title}</li>
                                <p>{episode.description}</p>
                                <audio controls>
                                  <source src={episode.file} />
                                </audio>
                              </Fragment>
                            ))}
                          </ul>
                        ) : (
                          <div className="image--">
                            <img className="showImg" src={season.image} alt={`Season ${season.number}`} />
                            <div>{season.episodes.length} Episodes</div>
                            <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2>Shows</h2>
                  <Hero />
                  {showPreviews.map((show) => (
                    <ShowPreview key={show.id} show={show} favorites={favorites} setFavorites={setFavorites} handleShowClick={handleShowClick} />
                  ))}
                </>
              )}
              <FavoritesList
            favoriteEpisodes={favoriteEpisodes}
            addToFavoriteEpisodes={addToFavoriteEpisodes}
            removeFromFavoriteEpisodes={removeFromFavoriteEpisodes}
          />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;





