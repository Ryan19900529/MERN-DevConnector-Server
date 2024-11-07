import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import { account_deleted } from "./auth";

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
    update_profile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    clear_profile: (state) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
  },
});

export const { get_profile, profile_error, update_profile, clear_profile } =
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
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/profile", formData);
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
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          const alertId = uuidv4();
          dispatch(
            setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
          );
        });
      }
      dispatch(
        profile_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);
    dispatch(update_profile(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Experience Added",
        alertType: "success",
      })
    );

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const alertId = uuidv4();
        dispatch(
          setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
        );
      });
    }
    dispatch(
      profile_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);
    dispatch(update_profile(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Education Added",
        alertType: "success",
      })
    );

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const alertId = uuidv4();
        dispatch(
          setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
        );
      });
    }
    dispatch(
      profile_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);

    dispatch(update_profile(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Experience Removed",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      profile_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);

    dispatch(update_profile(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Education Removed",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      profile_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you suer? This can NOT be undone!")) {
    try {
      const res = await axios.delete("api/profile");

      dispatch(clear_profile());
      dispatch(account_deleted());

      const alertId = uuidv4();
      dispatch(
        setAlert({
          id: alertId,
          msg: "Your account has been permanently deleted",
          alertType: "",
        })
      );
    } catch (err) {
      dispatch(
        profile_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
};

export default profileSlice.reducer;
