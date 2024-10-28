import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWatchlist } from "../features/watchlistSlice";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const dummyImage = "../dummyImage.png";

  return (
    <>
      <Container>
        <h2>My Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No movies added to watchlist yet.</p>
        ) : (
          <Row>
            {watchlist.map((movie) => (
              <Col md={4} key={movie.imdbID} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      movie.Poster !== "N/A" && movie.Poster !== ""
                        ? movie.Poster
                        : dummyImage
                    }
                    className="watchlist-img-class"
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(removeFromWatchlist(movie.imdbID))
                      }
                    >
                      Remove from Watchlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Watchlist;
