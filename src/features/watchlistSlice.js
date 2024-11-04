import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlist: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const movieExists = state.watchlist.some(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (!movieExists) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      const mewData = state.watchlist.filter(
        (movie) => movie.imdbID !== action.payload
      );
      state.watchlist = mewData;
    },
    clearWatchList: (state) => {
      state.watchlist = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchList } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
