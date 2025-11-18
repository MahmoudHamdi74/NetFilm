import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import './Slider.css';


const Slider = ({movies}) => {
    
  return (
    <div>  <Carousel>
        {movies.slice(0, 10).map((movie, index) => (
          <Carousel.Item key={index} interval={2000}>
            
            <img
              className="d-block w-100"
              src={"https://image.tmdb.org/t/p/w780/" + movie.backdrop_path}
              alt={movie.title || movie.name}
              style={{ 
                height: "500px", 
                objectFit: "cover", 
                borderRadius: "10px",
                maxHeight: "80vh"
              }}
            />
            <div style={{
              width: "100%", 
              height: "500px", 
              position: "absolute", 
              top: "0", 
              background: "linear-gradient(to top, rgba(0,0,0,.9) 20%, rgba(0,0,0,.1) 50%)", 
              borderRadius: "10px",
              maxHeight: "80vh"
            }}></div>
            <Carousel.Caption>
              <h3>{movie.title || movie.name}</h3>
              <p>{movie.overview?.slice(0, 100)}...</p>
              <p>{movie.release_date || movie.first_air_date}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel></div>
  )
}

export default Slider