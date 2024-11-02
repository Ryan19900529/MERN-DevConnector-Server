// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { thunk } from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";

const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export default store;
