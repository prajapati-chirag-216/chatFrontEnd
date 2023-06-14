import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  userId: null,
  users: [],
  privateUsers: [],
  activeUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUsersInRoom(state, action) {
      state.users = action.payload;
    },
    setPrivateUsers(state, action) {
      state.privateUsers = action.payload;
    },
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
