import axios from "axios";
import { store } from "./app/store";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to check login
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    if (!state.auth.user) {
      throw new Error("User not logged in");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
