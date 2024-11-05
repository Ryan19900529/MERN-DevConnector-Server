import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
});

export default store;
