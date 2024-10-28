import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutAndClearData } from "../features/authSlice"; // Assuming you have an authSlice
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAndClearData());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/search">
          Movie Search App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/watchlist">
                    Watchlist
                  </Link>
                </li>
                <li className="nav-item custom-padding">
                  <span className="nav-link">Hello, {username}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
