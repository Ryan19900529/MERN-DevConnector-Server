import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
  },
  reducers: {
    get_profile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    profile_error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clear_profile: (state) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
  },
});

export const { get_profile, profile_error, clear_profile } =
  profileSlice.actions;

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");

    dispatch(get_profile(res.data));
  } catch (err) {
    dispatch(
      profile_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Create or update profile
export const createProfile =
  (fromData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/profile", fromData);
      dispatch(get_profile(res.data));
      const alertId = uuidv4();
      dispatch(
        setAlert({
          id: alertId,
          msg: [edit ? "Profile Updated" : "Profile Created"],
          alertType: "success",
        })
      );

      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      dispatch(
        profile_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          const alertId = uuidv4();
          dispatch(
            setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
          );
        });
      }
    }
  };
export default profileSlice.reducer;
