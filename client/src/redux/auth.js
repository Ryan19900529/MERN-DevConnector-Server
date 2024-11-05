import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
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
  },
});

export const { registerSuccess, registerFail } = authSlice.actions;
export default authSlice.reducer;
