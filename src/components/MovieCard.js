import React, { useState } from "react";
import { Card, Button} from "react-bootstrap";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomToast from "./CustomToast";

const dummyImage = "./dummyImage.png";
const MovieCard = ({ movie, onClick }) => {
  const dispatch = useDispatch();
  const getWatchlist = useSelector((state) => state.watchlist) || [];
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isInWatchlist = getWatchlist.some((m) => m.imdbID === movie.imdbID);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.imdbID));
      setToastMessage(`${movie.Title} removed from watchlist.`);
    } else {
      dispatch(addToWatchlist(movie));
      setToastMessage(`${movie.Title} added to watchlist.`);
    }
    setShowToast(true);
  };

  return (
    <>
      <Card className="movie-card mb-3">
        <Card.Img
          variant="top"
          src={
            movie.Poster !== "N/A" && movie.Poster !== ""
              ? movie.Poster
              : dummyImage
          }
          alt={movie.Title}
          className="movie-image"
        />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>Year: {movie.Year}</Card.Text>
          <div className="movie-card-buttons">
            <Button
              className="custom-font"
              variant="secondary"
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>

            <Button
              className="custom-font"
              variant="primary"
              onClick={() => onClick(movie)}
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
      <CustomToast
        message={toastMessage}
        show={showToast}
        setShow={setShowToast}
      />
    </>
  );
};

export default MovieCard;
