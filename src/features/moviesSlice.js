import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
    try {
      const response = await api.get(
        `/?s=${searchTerm}&apikey=${process.env.REACT_APP_API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  movies: [],
  watchlist: [],
  loading: false,
};

const loadWatchlist = (username) => {
  const savedWatchlist = localStorage.getItem(`watchlist_${username}`);
  return savedWatchlist ? JSON.parse(savedWatchlist) : [];
};

const saveWatchlist = (username, watchlist) => {
  localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
      saveWatchlist(action.payload.username, state.watchlist);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload.id
      );
      saveWatchlist(action.payload.username, state.watchlist);
    },
    loadUserWatchlist: (state, action) => {
      state.watchlist = loadWatchlist(action.payload); // Load watchlist for the specific user
    },
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.Search || [];
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  loadUserWatchlist,
  clearWatchlist,
} = moviesSlice.actions;
export default moviesSlice.reducer;
