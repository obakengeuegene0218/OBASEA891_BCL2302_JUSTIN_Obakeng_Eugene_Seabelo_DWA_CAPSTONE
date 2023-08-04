// import React from 'react'
// import  {  useState, useEffect } from 'react';
// import { fetchShowPreviews } from './data';
// import ShowPreview from './components/preview';
// import './App.css';
// import FavoritesList from './components/FavoriteList'
// import AudioPlayer from './components/AudioPlayer'


// const App = () => {
//   const [showPreviews, setShowPreviews] = React.useState([]);

//   useEffect(() => {
//     const getShowPreviews = async () => {
//       try {
//         const previews = await fetchShowPreviews();
//         setShowPreviews(previews);
//       } catch (error) {
//         console.error('Error fetching show previews:', error);
//       }
//     };
//     getShowPreviews();
//   }, []);


//   return (
//     <div className="app">
//       <header>
//         <h1 className='head'>Podcast App</h1>
//       </header>
//       <main>
//         {showPreviews.map(show => (
//           <ShowPreview key={show.id} show={show} />
//         ))}
//       </main>
//     </div>
//   );
// };

// export default App;

// App.js
// import React, { useState, useEffect } from 'react';
// import { fetchShowPreviews } from './data';
// import ShowPreview from './components/preview';
// // import FavoritesList from './components/FavoriteList';
// import './App.css';
// import AudioPlayer from './components/AudioPlayer';

// const App = () => {
//   const [showPreviews, setShowPreviews] = React.useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [sortBy, setSortBy] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');


//   const handleSearch = () => {
//     // Filter the showPreviews based on the searchQuery
//     const filteredShows = showPreviews.filter((show) => {
//       const title = show.title.toLowerCase();
//       const description = show.description.toLowerCase();
//       const genres = show.genres.map((genre) => genre.toLowerCase());

//       return title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase()) || genres.includes(searchQuery.toLowerCase());
//     });

//     // Update the showPreviews state with the filtered shows
//     setShowPreviews(filteredShows);
//   };

  
//   useEffect(() => {
//     const getShowPreviews = async () => {
//       try {
//         const previews = await fetchShowPreviews();
//         setShowPreviews(previews);
//       } catch (error) {
//         console.error('Error fetching show previews:', error);
//       }
//     };
//     getShowPreviews();
//   }, []);

//   const sortShows = (criteria) => {
//     setSortBy(criteria);
//     let sortedShows = [...showPreviews];

//     switch (criteria) {
//       case 'titleAZ':
//         sortedShows.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case 'titleZA':
//         sortedShows.sort((a, b) => b.title.localeCompare(a.title));
//         break;
//       case 'dateUpdatedAscending':
//         sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
//         break;
//       case 'dateUpdatedDescending':
//         sortedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
//         break;
//       default:
//         break;
//     }

//     setShowPreviews(sortedShows);
//   };

//   const removeFromFavorites = (episodeId) => {
//     setFavorites(favorites.filter((id) => id !== episodeId));
//   };

//   return (
//     <div className="app">
//       <header>
//         <h1 className="head">Podcast App</h1>
//         <div>
//           <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Podcasts" />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       </header>
//       <main>
//         <div>
//           <h2>Shows</h2>
//           <div>
//             <button onClick={() => sortShows('titleAZ')}>Sort by Title A-Z</button>
//             <button onClick={() => sortShows('titleZA')}>Sort by Title Z-A</button>
//             <button onClick={() => sortShows('dateUpdatedAscending')}>Sort by Date Updated (Ascending)</button>
//             <button onClick={() => sortShows('dateUpdatedDescending')}>Sort by Date Updated (Descending)</button>
//           </div>
//           {showPreviews.map((show) => (
//             <ShowPreview key={show.id} show={show} favorites={favorites} setFavorites={setFavorites} />
//           ))}
//         </div>
//         <FavoritesList
//           favorites={favorites}
//           showPreviews={showPreviews}
//           removeFromFavorites={removeFromFavorites}
//         />
//       </main>
//     </div>
//   );
// };

// // export default App;
// import React, { useState, useEffect } from 'react';
// App.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { fetchShowPreviews } from './data';
import ShowPreview from './components/preview';
import FavoritesList from './components/FavoriteList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { supabase } from './supabaseClient';

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
  const [selectedSeasons, setSelectedSeasons] = useState([]); // New state for selected seasons

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === '') {
      setShowPreviews(originalShowPreviews);
    } else {
      const genreMatched = originalShowPreviews.filter((show) => {
        const genres = show.genres.map((genre) => genre.toLowerCase());
        return typeof show.genre === 'string' && genres.includes(trimmedQuery.toLowerCase());
      });

      const titleMatched = originalShowPreviews.filter((show) => {
        const title = show.title.toLowerCase();
        return title.includes(trimmedQuery.toLowerCase());
      });

      setShowPreviews(genreMatched.length > 0 ? genreMatched : titleMatched);
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

  const handleShowClick = (showId) => {
    const selectedShow = showPreviews.find((show) => show.id === showId);
    setSelectedShow(selectedShow); // Set the selected show here
    setSelectedSeason(null); // Reset the selected season to null when a new show is selected
    setView('showDetail');
  };

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  useEffect(() => {
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
      <div className="app">
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
        />
        <main>
          {isLoggedIn === 'signUpPhase' && <Login onLogin={() => setIsLoggedIn('startPhase')} />}
          {isLoggedIn === 'startPhase' && (
            <div>
              {view === 'showDetail' && selectedShow ? (
                <div className="seas-data-container">
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
                          <div>
                            <img className="seas" src={season.image} alt={`Season ${season.number}`} />
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







// import React, { useState, useEffect } from 'react';
// App.jsx


//   if (!showData) {
//     return (
//       <div className="podcast-data-container">
//         <Header
//         searchQuery={searchQuery}
//         handleSearchChange={handleSearchChange}
//         sortBy={sortBy}
//         handleSortChange={handleSortChange}
//       />
//         <ul className="preview-list">
//           {filteredData.map((show) => (
//         <li key={show.id} className="preview-item">
//             <div className="image">
//               <img src={show.image} alt={show.title} className="preview-image" />
//               <div className="dots">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//             <div className="infos">
//               <h3>Title:{show.title}</h3>
//               <p>Seasons:{show.seasons}</p>
//             </div>
//             <button onClick={() => toggleDescription(show.id)}>Description</button>
//             <button onClick={() => handleShowClick(show.id)}>Seasons</button>
//             {selectedPreviewId === show.id && (
//               <div className="preview-description">{show.description}</div>
//             )}
//         </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
//   return (
//     <div className="seas-data-container">
//       <button onClick={() => setShowData(null)}>Back to Show List</button>
//       <div>
//         <h2>{showData.title}</h2>
//         {showData.seasons.map((season) => (
//           <div key={season.number}>
//             <h3>Season {season.number}</h3>
//             {selectedSeason === season.number ? (
//               <ul>
//                 {season.episodes.map((episode) => (
//                   <Fragment key={episode.id}>
//                     <h4>{episode.name}</h4>
//                   <li>{episode.title}</li>
//                   <p>{episode.description}</p>
//                   <audio controls>
//                 <source src ={episode.file}/>
//                   </audio>
//                   </Fragment>
//                 ))}
//               </ul>
//             ) : (
//               <div>
//                 <img className='seas' src={season.image} alt={`Season ${season.number}`} />
//                 <div>{season.episodes.length} Episodes</div>
//                 <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default PodcastData;
