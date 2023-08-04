import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ episode, isPlaying, onTogglePlay, onPause }) => {
  const audioRef = useRef(null);

  // Pause the audio when the component unmounts
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  // Function to handle play/pause button click
  const handleTogglePlay = () => {
    if (isPlaying) {
      onPause();
    } else {
      onTogglePlay();
    }
  };

  // Function to handle audio play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="audio-player">
      <h2>Audio Player</h2>
      <h3>{episode.title}</h3>
      <audio ref={audioRef} src={episode.audioUrl} controls={true} autoPlay={isPlaying} />
      <button onClick={handleTogglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;






