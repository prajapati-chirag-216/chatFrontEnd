import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackBar: {
    status: false,
    from: "",
    text: "",
    room: null,
    severity: null,
  },
  currentRoom: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSnackBar(state, action) {
      state.snackBar = action.payload;
    },
    setCurruntRoom(state, action) {
      state.currentRoom = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
