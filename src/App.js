import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SearchMovies from "./components/SearchMovies";
import Watchlist from "./components/Watchlist";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import MyNavbar from "./components/MyNavbar";
import './App.css';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      {isLoggedIn && <MyNavbar />}
      <div className="content">
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/search" /> : <Login />}
          />
          <Route
            path="/search"
            element={isLoggedIn ? <SearchMovies /> : <Navigate to="/login" />}
          />
          <Route
            path="/watchlist"
            element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/search" : "/login"} />}
          />
        </Routes>
      </div>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
