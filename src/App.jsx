import { useEffect, useRef, useState } from "react";
import "./app.css";

import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Details from "../pages/Details/Details";
import Favorites from "../pages/Favorites/Favorites";
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Context from "./Context/Context";
import Loader from "../components/loader/loader";
import { NavbarLink } from "flowbite-react";

function MyVerticallyCenteredModal({ show, onHide, movie }) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ backgroundColor: "#00000013" }} closeButton>
        <Modal.Title>{movie.title || movie.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#ffffff1e",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
          alt={movie.title}
          style={{ alignContent: "center" }}
        />
        <p>{movie.overview}</p>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#00000013",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [fave, setFave] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);
  const input = useRef();

  // ✅ fetch movies
  useEffect(() => {
    const API_OPTIONS = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjdlNTdjMDRjNmYxNjM1MDVhYzE1YjhkZDA5MzQ2MSIsIm5iZiI6MTc1NzUwMTAzMy4wNzQsInN1YiI6IjY4YzE1NjY5ZjcxYTYyNjRlYzFiZDhkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejCjS3TO9sKhfq6bIV2PFzfjv8Y_tjZA9Gb-VOaF8zg",
      },
    };

    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}&include_adult=false`
      : `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}&include_adult=false`;

    fetch(endpoint, API_OPTIONS)
      .then((res) => res.json())
      .then((res) => setMovies(res.results || []))
      .catch((err) => console.error(err));
      setTimeout(() => setLoading(false), 2000);
  }, [page, query]);

  const HandleAdd = (movie) => {
    if (fave.find((fav) => fav.id === movie.id)) {
      setFave(fave.filter((fav) => fav.id !== movie.id));
    } else {
      setFave([...fave, movie]);
    }
  };

  if (loading) return <Loader />;

  return (
    <Context.Provider value={{ HandleAdd, fave }}>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>

       
        <Navbar expand="lg" className={`${darkMode ? "bg-dark" : "bg-light"} p-0`} variant={darkMode ? "dark" : "light"} style={{ padding: "5px 0" }}>
          <Container fluid style={{ padding: "0 10px" }}>
            <Navbar.Brand href="/" style={{ margin: 0, padding: "5px 0" }}>
              <img
                src="Gemini_Generated_Image_jqf30ajqf30ajqf3-removebg-preview.png"
                alt="logo"
                style={{ width: "90px", height: "70px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" style={{ padding: "5px 10px", fontSize: "1rem" }} />
            <Navbar.Collapse id="navbarScroll" style={{ padding: "5px 0" }}>
              <Nav className="me-auto my-2 my-lg-0" navbarScroll style={{ gap: "5px" }}>
                <NavLink className={"home"} to="/movies">Movies</NavLink>
                <NavLink className={"home"} to="/favorites">Favorites</NavLink>
              </Nav>
              <Button
                variant={darkMode ? "outline-danger" : "outline-dark"}
                className="me-2"
                onClick={() => setDarkMode(!darkMode)}
                style={{ padding: "6px 12px", fontSize: "0.9rem" }}
              >
                {darkMode ? (
                  <i className="fa fa-sun-o" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-moon-o"></i>
                )}
              </Button>
              <Form
                className="d-flex me-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                  setQuery(input.current.value);
                }}
                style={{ gap: "5px" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="form-control"
                  aria-label="Search"
                  ref={input}
                  style={{ margin: 0, padding: "6px 10px", fontSize: "0.9rem" }}
                />
                <Button type="submit" variant="outline-danger" className="btn" style={{ margin: 0, padding: "6px 12px", fontSize: "0.9rem" }}>
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="mx-auto col-10">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    movies={movies}
                    setModalShow={setModalShow}
                    setPage={setPage}
                    page={page}
                    setSelected={setSelected}
                    modalShow={modalShow}
                    HandleAdd={HandleAdd}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <Movies
                    movies={movies}
                    setSelected={setSelected}
                    setModalShow={setModalShow}
                    modalShow={modalShow}
                    selected={selected}
                    setPage={setPage}
                    page={page}
                    HandleAdd={HandleAdd}
                  />
                }
              />
              <Route path="/favorites" element={<Favorites fave={fave} />} />
              <Route
                path="/details/:id"
                element={
                  <Details
                    movies={movies}
                    setModalShow={setModalShow}
                    setSelected={setSelected}
                    modalShow={modalShow}
                    selected={selected}
                  />
                }
              />
            </Routes>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              movie={selected}
            />
        </div>
      </BrowserRouter>

        <footer className={darkMode ? "bg-dark text-center" : "bg-body-tertiary text-center"}>
  <div className="container p-4 pb-0">
    <section className="mb-4">
      <a
      data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#3b5998"}}
        href="#!"
        role="button"
        >
          <i className="fa fa-facebook-f" aria-hidden="true"></i>
      </a>

      <a
        data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#55acee"}}
        href="#!"
        role="button"
        >
        <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>

      <a
        data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#dd4b39"}}
        href="#!"
        role="button"
        >
          <i className="fa fa-google-plus" aria-hidden="true"></i>
      </a>

      <a
        data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{background: "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"}}
        href="#!"
        role="button"
        >
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>

      <a
        data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#0082ca"}}
        href="#!"
        role="button"
        ><i className="fa fa-linkedin" aria-hidden="true"></i>
      
      </a>
      <a
        data-mdb-ripple-init="true"
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#333333"}}
        href="#!"
        role="button"
        ><i className="fa fa-github" aria-hidden="true"></i></a>
    </section>
  </div>

  <div className="text-center p-3" style={{backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)", color: darkMode ? "#fff" : "inherit"}}>
    © 2025 Copyright:
    <a className={darkMode ? "text-light ms-1" : "text-body ms-1"} href="">Mahmoud Hamdi</a>
  </div>
</footer>
      </div>
    </Context.Provider>
  );

}

export default App;
