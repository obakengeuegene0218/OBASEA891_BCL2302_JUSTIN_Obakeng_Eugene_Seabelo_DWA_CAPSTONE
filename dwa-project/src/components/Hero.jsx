import React, { useEffect, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import axios from "axios";
import "./Hero.css";
export default function Hero() {
  const [shows, setShows] = useState([]);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const slideWidth = 200;
  const slidesToShow = 5;
  const containerWidth = slideWidth * shows.length;
  
  useEffect(() => {
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const moveCarousel = (steps) => {
    const newPosition = carouselPosition + steps * slideWidth * slidesToShow;
    setCarouselPosition(Math.max(-(containerWidth - slideWidth * slidesToShow), Math.min(0, newPosition)));
  };
  let interval;
  const handleMouseDown = (steps) => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(steps), 100);
  };
  const handleMouseUp = () => {
    clearInterval(interval);
  };
  return (
    <div className="hero-section">
      <div className="carousel-container">
        <div
          className="show-info"
          style={{
            transform: `translateX(${carouselPosition}px)`,
            width: `${containerWidth}px`,
          }}
        >
          {shows.map((show) => (
            <div key={show.id} className="carousel-slide">
              <img src={show.image} alt={show.name} width={slideWidth} />
              <h1>{show.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <ArrowBackIosNewOutlinedIcon
        className="arrow-icon backward"
        onMouseDown={() => handleMouseDown(1)}
        onMouseUp={handleMouseUp}
      />
      <ArrowForwardIosOutlinedIcon
        className="arrow-icon forward"
        onMouseDown={() => handleMouseDown(-1)}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}