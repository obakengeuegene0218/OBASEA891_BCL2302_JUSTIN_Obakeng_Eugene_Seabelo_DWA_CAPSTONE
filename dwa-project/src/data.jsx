import React, { useState } from 'react';

const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShowPreviews = async () => {
  const response = await fetch(`${BASE_URL}/shows`);
  const data = await response.json();
  return data;
};

export const fetchShowDetails = async (showId, setLoading, setSelectedShow, setSelectedSeason) => {
  try {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/id/${showId}`);
    const data = await response.json();
    setSelectedShow(data);
    setSelectedSeason(null);

    // Extract and store the seasons separately in the state
    setSelectedSeasons(data.seasons || []);

    setLoading(false);
  } catch (error) {
    console.error('Error fetching show details:', error);
    setLoading(false);
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