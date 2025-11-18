import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Context from '../../src/Context/Context';
import Fav from '../../components/Fav/Fav';
import { FaStar } from 'react-icons/fa';
import Loader from '../../components/loader/loader';
import './Favorites.css';


const Favorites = () => {
  const {fave}= useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

    console.log(fave);
  return (
    <div className="container my-4" style={{ minHeight: "calc(100vh - 200px)", paddingBottom: "40px" }}>
      <h2 className="text-center my-4 text-danger">My Favorite Movies</h2>
      {fave.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <p className="text-center text-danger" style={{ fontSize: "1.5rem" }}>No favorite movies yet!</p>
        </div>
      ) : (
        <Row xs={1} md={4} className="g-4">
          {fave.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{movie.title || movie.name}</Card.Title>
                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" ,marginTop : "10px", color: "gold" }}>
              <div>
              <FaStar style={{ marginRight: "5px" }} />
              <span>{movie.vote_average?.toFixed(1)}</span>
              </div>
              <Fav  movie={movie} />
            </div>
                  <Link 
                    to={`/details/${movie.id}`} 
                    className="btn btn-outline-danger mt-2"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
    </div>
  )
}

export default Favorites