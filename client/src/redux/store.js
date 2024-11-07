import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import authReducer from "./auth";
import profileReducer from "./profile";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
