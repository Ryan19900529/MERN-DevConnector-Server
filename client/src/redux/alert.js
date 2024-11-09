import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Actions are automatically created and paired with the respective reducers when you use createSlice. This removes the need to write separate action creators, simplifying the code and making it more concise.
const alertSlice = createSlice({
  name: "alert", // Redux Toolkit uses it to automatically generate action type strings like alert/setAlert. It doesn’t need to match any key in configureStore.
  initialState: [],
  reducers: {
    set_Alert: (state, action) => {
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
    remove_Alert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { set_Alert, remove_Alert } = alertSlice.actions;

export const setAlert =
  ({ msg, alertType, id }, timeout = 3000) =>
  (dispatch) => {
    dispatch(set_Alert({ msg, alertType, id }));

    setTimeout(() => dispatch(remove_Alert(id)), timeout);
  };
export default alertSlice.reducer;
