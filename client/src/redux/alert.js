// import { createSlice } from "@reduxjs/toolkit";
// import uuid from "uuid";

// const alertSlice = createSlice({
//   name: "alert",
//   initialState: [],
//   reducers: {
//     setAlert: (state, action) => {
//       state.push(action.payload);
//     },
//     removeAlert: (state, action) => {
//       return state.filter((alert) => alert.id !== action.payload);
//     },
//   },
// });

// export const { setAlert, removeAlert } = alertSlice.actions;
// export default alertSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const alertSlice = createSlice({
  name: "alert",
  initialState: [],
  reducers: {
    setAlert: (state, action) => {
      // const { msg, alertType } = action.payload;
      // const newAlert = {
      //   id: uuidv4(), // Assign a unique ID
      //   msg,
      //   alertType,
      // };
      // state.push(newAlert);

      // concise way
      // state.push({ id: uuidv4(), ...action.payload });

      // pass Id from outside
      const { msg, alertType, id } = action.payload;
      state.push({ id: id || uuidv4(), msg, alertType });
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
