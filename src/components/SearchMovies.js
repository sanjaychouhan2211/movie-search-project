import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null); // For error messages

  const apiUrl = "https://www.omdbapi.com/";
  const apiKey = "c9e64b2"; // Ensure this key is valid

  // Fetch movies when the query or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const response = await axios.get(
          `${apiUrl}?apiKey=${apiKey}&s=${query}&page=${page}`
        );

        if (response.data.Response === "False") {
          throw new Error(response.data.Error || "Error fetching movies");
        }

        setMovies((prevMovies) =>
          page === 1
            ? response.data.Search
            : [...prevMovies, ...response.data.Search]
        );
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Unauthorized: Something went wrong from the API server.");
        } else {
          setError(
            "An error occurred while fetching movies from the API server."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query, page]);

  // Handle scroll event for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 100 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const getMovieDetails = async (id) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
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
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
              setMovies([]);
            }}
          />
        </Form.Group>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Row>
          {movies?.length > 0 &&
            movies.map((movie) => (
              <Col md={4} key={movie.imdbID} className="mb-4">
                <MovieCard movie={movie} onClick={openModal} />
              </Col>
            ))}
        </Row>

        {loading && <p>Loading more movies...</p>}

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
