import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    registerSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      // Save the token to localStorage
      localStorage.setItem("token", action.payload.token);
    },
    registerFail: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
    authError: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
  },
});
export const { userLoaded, registerSuccess, registerFail, authError } =
  authSlice.actions;

// Async function to load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Set auth token if present
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch(userLoaded(res.data)); // Dispatch userLoaded if successful
  } catch (err) {
    dispatch(authError()); // Dispatch authError if there’s an issue
  }
};

export default authSlice.reducer;
