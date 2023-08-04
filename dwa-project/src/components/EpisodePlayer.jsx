// import React from 'react';
// import axios from 'axios';
// import User from './userFavourites';


// const SinglePodcastPreview = ({ podcastId }) => {
//   const [podcastData, setPodcastData] = React.useState(null);
//   const [progress, setProgress] = React.useState({}); // State to track user progress

//   React.useEffect(() => {
//     axios.get(`https://podcast-api.netlify.app/id/${podcastId}`)
//       .then(response => {
//         setPodcastData(response.data);
//       })
//       .catch(error => {
//         console.log('Error fetching podcast details:', error);
//       });

//     // Load user progress from localStorage if available
//     const storedProgress = localStorage.getItem(`progress_${podcastId}`);
//     if (storedProgress) {
//       setProgress(JSON.parse(storedProgress));
//     }
//   }, [podcastId]);

//   // Function to update user progress when an episode is played
//   const updateProgress = (seasonIndex, episodeIndex, currentTime) => {
//     const updatedProgress = { ...progress };
//     if (!updatedProgress[seasonIndex]) {
//       updatedProgress[seasonIndex] = {};
//     }
//     updatedProgress[seasonIndex][episodeIndex] = currentTime;
//     setProgress(updatedProgress);
//   };

//   // Function to reset user progress
//   const resetProgress = () => {
//     const updatedProgress = {};
//     setProgress(updatedProgress);
//     localStorage.setItem(`progress_${podcastId}`, JSON.stringify(updatedProgress));
//   };

//   if (!podcastData) {
//     return <div className='loadingState'>Loading...</div>;
//   }

//   const { image, title, genre, seasons } = podcastData;

//   const formatTime = (seconds) => {
//     const date = new Date(0);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 8);
//   };

//   return (
//     <div className='episodes grid-item'>
      
//       <div className='single-season grid-item'>
//         <h2 className='podcast-title'>{title}</h2>
//         <img className='img showImg' src={image} alt={title} />
//         <p>Genre: {genre}</p>
//         <h2 className='title-seasons'>Seasons</h2>
//       </div>

//       <div className="user-favours">
//         <div><User /></div>
//         <div className='userDiv'>
//           <button className="reset-progress-button" onClick={resetProgress}>
//             Reset Progress
//           </button>
//         </div>
//       </div>

//       {seasons.map((season, seasonIndex) => (
//         <div key={seasonIndex} className='grid-item'>
//           <h3 className='title-seasons'>{season.title}</h3>
//           <p className="num-episodes">Number of Episodes: {season.episodes.length}</p>
//           <ul >
//             {season.episodes.map((episode, episodeIndex) => {
//               const episodeProgress = progress[seasonIndex]?.[episodeIndex];
//               const currentTime = episodeProgress ? formatTime(episodeProgress) : 'Not Started';

//               return (
//                 <li key={episodeIndex} className="li-episode">
//                   {episode.title}
//                   <audio
//                     controls
//                     onPlay={(e) => updateProgress(seasonIndex, episodeIndex, e.target.currentTime)}
//                   >
//                     <source src={episode.file} type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>
//                   <span>Progress: {currentTime}</span>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//       ))}
//     </div>
//   );
// };

// export default SinglePodcastPreview;
import React from 'react';

const Episode = ({ episode, isPlaying, onTogglePlay, onPause }) => {
  // Function to handle play/pause button click
  const handleTogglePlay = () => {
    if (isPlaying) {
      onPause();
    } else {
      onTogglePlay();
    }
  };

  return (
    <div className="audio-player">
      <h2>Audio Player</h2>
      <h3>{episode.title}</h3>
      <audio src={episode.audioUrl} controls={true} autoPlay={isPlaying} />
      <button onClick={handleTogglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default Episode;