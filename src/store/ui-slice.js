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
  filesToLoad: {},
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
    setFileLoading(state, action) {
      state.filesToLoad = { ...state.filesToLoad, ...action.payload };
    },
    setRemoveLoading(state, action) {
      const files = state.filesToLoad;
      delete files[action.payload];
      state.filesToLoad = files;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
