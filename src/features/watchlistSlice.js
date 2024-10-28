import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: [],
  reducers: {
    addToWatchlist: (state, action) => {
      const movieExists = state.some(movie => movie.imdbID === action.payload.imdbID);
      if (!movieExists) {
        state.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      return state.filter(movie => movie.imdbID !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
