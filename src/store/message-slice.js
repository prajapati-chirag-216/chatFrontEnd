import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  privateMessages: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    setPrivateMessages(state, action) {
      if (!state.privateMessages[action.payload.room]) {
        state.privateMessages[action.payload.room] = [action.payload.data];
      } else {
        state.privateMessages[action.payload.room] = [
          ...state.privateMessages[action.payload.room],
          action.payload.data,
        ];
      }
    },
    updatePrivateMessages(state, action) {
      const updatedPrivateMessages = { ...state.privateMessages };
      delete updatedPrivateMessages[action.payload];
      state.privateMessages = { ...updatedPrivateMessages };
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
