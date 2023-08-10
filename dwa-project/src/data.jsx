import React, { useState } from 'react';
// import axios from 'axios'; 
const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShowPreviews = async () => {
  const response = await fetch(`${BASE_URL}/shows`);
  const data = await response.json();
  return data;
};




export const fetchShowDetails = async (showId) => {
  try {
    const response = await fetch(`${BASE_URL}/id/${showId}`);
    const data = await response.json();
    data.seasons = data.seasons || [];
    return data;
  } catch (error) {
    throw new Error('Error fetching show details:', error);
  }
};


  

// import React, { useState } from 'react';
// const [Loading, setLoading] = useState([]);
// export const fetchShowDetails = async (showId) => {
//   try {
//     setLoading(true);
//     const response = await fetch`(https://podcast-api.netlify.app/id/${showId});`
//     const data = await response.json();
//     setSelectedShow(data);
//     setSelectedSeason(null);
//     setLoading(false);
//   } catch (error) {
//     console.error('Error fetching show details:', error);
//   }
// };