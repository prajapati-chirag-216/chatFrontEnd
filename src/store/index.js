import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import messageReducer from "./message-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: { user: userReducer, message: messageReducer, ui: uiReducer },
});
export default store;
