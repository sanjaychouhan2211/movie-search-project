import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearWatchlist } from "./moviesSlice";

// Mock login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      if (username && password.length >= 6) {
        // Simulate a successful login
        return { username };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.username = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const logoutAndClearData = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearWatchlist());
  localStorage.removeItem("watchlist");
};
export default authSlice.reducer;
