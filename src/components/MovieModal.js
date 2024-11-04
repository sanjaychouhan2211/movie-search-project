import React from "react";
import { Modal, Button, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/watchlistSlice";

const dummyImage = "../dummyImage.png"; // Placeholder image path

const MovieModal = ({ movie, show, onHide }) => {
  const dispatch = useDispatch();
  const newWatchlist = useSelector((state) => state.watchlist?.watchlist) || [];
  const isInWatchlist = movie && newWatchlist.some((m) => m.imdbID === movie.imdbID);
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.imdbID));
      alert(`${movie.Title} removed from watchlist.`);
    } else {
      dispatch(addToWatchlist(movie));
      alert(`${movie.Title} added to watchlist.`);
    }
  };

  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Row>
          <Col md={4} className="text-center">
            <img
              src={movie.Poster !== "" ? movie.Poster : dummyImage}
              alt={`${movie.Title} Poster`}
              className="img-fluid mb-3"
              style={{ width: "100%", height: "300px", objectFit: "cover" }} // Ensure no white space
            />
          </Col>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>Year: {movie.Year}</ListGroup.Item>
              <ListGroup.Item>Rated: {movie.Rated}</ListGroup.Item>
              <ListGroup.Item>Released: {movie.Released}</ListGroup.Item>
              <ListGroup.Item>Runtime: {movie.Runtime}</ListGroup.Item>
              <ListGroup.Item>Genre: {movie.Genre}</ListGroup.Item>
              <ListGroup.Item>Director: {movie.Director}</ListGroup.Item>
              <ListGroup.Item>Writer: {movie.Writer}</ListGroup.Item>
              <ListGroup.Item>Actors: {movie.Actors}</ListGroup.Item>
              <ListGroup.Item>Plot: {movie.Plot}</ListGroup.Item>
              <ListGroup.Item>Language: {movie.Language}</ListGroup.Item>
              <ListGroup.Item>
                Ratings:
                {movie?.Ratings?.map((rating, index) => (
                  <div key={index}>
                    {rating.Source}: {rating.Value}
                  </div>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant={isInWatchlist ? "danger" : "primary"}
          onClick={handleWatchlistToggle}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
