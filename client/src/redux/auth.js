import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

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
    loginSuccess: (state, action) => {
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
    loginFail: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
    logout: (state) => {
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
    account_deleted: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
  },
});
export const {
  userLoaded,
  registerSuccess,
  loginSuccess,
  registerFail,
  loginFail,
  logout,
  authError,
  account_deleted,
} = authSlice.actions;

/**
 * In the case of loadUser, it is an example of a manual action creator. Unlike setAlert and removeAlert (which are
 * automatically generated and paired with reducers by createSlice), loadUser is defined manually as an asynchronous
 * thunk.
 * loadUser is an asynchronous action creator, sometimes called a "thunk" in Redux terminology.
 * It's a manual action creator because you are defining it outside of createSlice and it performs asynchronous work
 * (like making an API call).
 * Inside the action, you're manually calling dispatch to send the result of that asynchronous work (e.g.,
 * userLoaded or authError).
 *
 * *When to Create Manual Action Creators*
 * 1. API calls: When you need to load data from a server, such as user authentication, fetching posts, etc.
 * 2. Complex logic: When actions require more complex decision-making or have side effects like logging out,
 * refreshing tokens, etc.
 **/

// The loadUser function is an action creator that returns an async function. This async function takes dispatch as its argument.
// When loadUser is dispatched (e.g., dispatch(loadUser())), Redux will call the function returned by loadUser and automatically pass the dispatch function to it. (using Redux Thunk)
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Set auth token if present
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth", { email, password });
    dispatch(loginSuccess({ token: response.data.token }));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const alertId = uuidv4();
        dispatch(
          setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
        );
      });
      dispatch(loginFail());
    }
  }
};

export default authSlice.reducer;
