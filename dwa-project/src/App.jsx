
// App.jsx
//App.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { fetchShowPreviews, fetchShowDetails } from './data';
import ShowPreview from './components/preview';
import FavoritesList from './components/FavoriteList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { supabase } from './supabaseClient';
import './App.css';
import Fuse from 'fuse.js'; // Import the Fuse.js library for fuzzy searching
import Hero from './components/Hero'


const App = () => {
  const [showPreviews, setShowPreviews] = useState([]);
  const [view, setView] = useState('login');
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalShowPreviews, setOriginalShowPreviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState('signUpPhase');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); // State for selected genre

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      setShowPreviews(originalShowPreviews);
    } else {
      let filteredPreviews = [...originalShowPreviews];

      // Filter by search query using Fuse.js
      if (searchQuery) {
        const fuse = new Fuse(filteredPreviews, { keys: ['title'] });
        filteredPreviews = fuse.search(searchQuery).map((result) => result.item);
      }

      // Filter by genre (assuming you have selectedGenre as a state variable)
      if (selectedGenre) {
        filteredPreviews = filteredPreviews.filter((preview) =>
          preview.genres.includes(parseInt(selectedGenre))
        );
      }

      setShowPreviews(filteredPreviews);
    }
  };

  useEffect(() => {
    const getShowPreviews = async () => {
      setLoading(true);
      try {
        const previews = await fetchShowPreviews();
        setShowPreviews(previews);
        setOriginalShowPreviews(previews); // Store the original previews in state
      } catch (error) {
        console.error('Error fetching show previews:', error);
      } finally {
        setLoading(false);
      }
    };
    getShowPreviews();
  }, []);

  const handleSort = (criteria) => {
    setSortBy(criteria);
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
      default:
        // If the criteria is not recognized, do nothing or provide a default sorting
        break;
    }

    setShowPreviews(sortedShows);
  };

  const handleShowFavorites = () => {
    if (isLoggedIn === 'favoritesList') {
      setView('startPhase'); // If already in favorites list view, go back to show list
    } else {
      setView('favoritesList'); // If not, switch to favorites list view
    }
  };

  const removeFromFavorites = (showId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== showId));
  };

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

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in successfully:', session.user.email);
        setIsLoggedIn('startPhase');
      }
    });
    // return () => {
    //   authListener.unsubscribe();
    // };
  }, []);

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
          setSelectedGenre={setSelectedGenre} // Pass the setSelectedGenre function to the Navbar
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
                          <div className='image--'>
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
                  <Hero/>
                  {showPreviews.map((show) => (
                    <ShowPreview key={show.id} show={show} favorites={favorites} setFavorites={setFavorites} handleShowClick={handleShowClick} />
                  ))}
                  <FavoritesList favorites={favorites} showPreviews={showPreviews} removeFromFavorites={removeFromFavorites} />
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;


