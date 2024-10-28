import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Container, Form, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { fetchMovies } from "../features/moviesSlice";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  //const { apiUrl, apiKey } = useSelector((state) => state.config);
  const apiUrl = "https://www.omdbapi.com/";
  const apiKey = "b00d63e2";
  useEffect(() => {
    if (query.length > 0) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${apiUrl}?apiKey=${apiKey}&s=${query}`
          );
          setMovies(response.data.Search || []);
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          setLoading(false);
        }
      };

      const delayDebounceFn = setTimeout(() => {
        fetchMovies();
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, apiUrl, apiKey]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(fetchMovies(e.target.value));
  };

  const getMovieDetails = async (id) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=b00d63e2`
    );
    setSelectedMovie(response.data);
  };

  const openModal = (movie) => {
    setShowModal(true);
    getMovieDetails(movie?.imdbID);
  };

  return (
    <>
      <Container>
        <Form.Group controlId="search" className="my-4">
          <Form.Control
            type="text"
            placeholder="Search for movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Row>
          {movies?.length > 0 &&
            movies?.map((movie) => (
              <Col md={4} key={movie.imdbID} className="mb-4">
                <MovieCard movie={movie} onClick={openModal} />
              </Col>
            ))}
        </Row>
        <MovieModal
          movie={selectedMovie}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </Container>
    </>
  );
};

export default SearchMovies;
