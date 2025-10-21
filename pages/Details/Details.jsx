import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import Cards from "../../components/Cards/Cards";
import { Card } from "react-bootstrap";
import Fav from "../../components/Fav/Fav";
import Loader from "../../components/loader/loader";
const Details = () => {
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjdlNTdjMDRjNmYxNjM1MDVhYzE1YjhkZDA5MzQ2MSIsIm5iZiI6MTc1NzUwMTAzMy4wNzQsInN1YiI6IjY4YzE1NjY5ZjcxYTYyNjRlYzFiZDhkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejCjS3TO9sKhfq6bIV2PFzfjv8Y_tjZA9Gb-VOaF8zg",
    },
  };

  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Fetch movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // Fetch movie cast (actors)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast?.slice(0, 10) || [])); // أول 10 ممثلين فقط
  }, [id]);

  console.log(movie);
  console.log("Cast:", cast);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    < >
    <div 
      style={{
        position: "relative",
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        backgroundSize: "cover",
        height: "88vh",
        borderRadius: "20px",
        
      }}
      >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          borderRadius: "20px",
        }}
        >
        <div className="movie">
          {movie.backdrop_path && (
            <img
            className="pho"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            >
            <h1
              style={{
                margin: "20px",
                fontFamily: "serif",
                fontSize: "2rem",
                color: "white",
              }}
              >
              {movie.title} <h1>{movie.release_date}</h1>
            </h1>
            <h1>OverView :</h1>
            <p>{movie.overview}</p>
            <Fav movie={movie}/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 style={{color:"white", textAlign:"center", marginTop:"20px"}}>Cast</h2>
      <div className="pp" style={{ padding: "20px" }}>
        {cast.map((actor) => (
          <Card key={actor.id} style={{ width: "300px", margin: "10px" }}>
            {actor.profile_path ? (
              <Card.Img 
                variant="middle"
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                style={{
                  height: "250px",
                  objectFit: "cover"
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "250px",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666"
              }}>
                No Image
              </div>
            )}
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title style={{ fontSize: "1rem" }}>
                {actor.name}
              </Card.Title>
              <Card.Text style={{ color: "#888", fontSize: "0.9rem" }}>
                {actor.character}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
              </>
  );
};

export default Details;
