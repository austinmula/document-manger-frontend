import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import filesReducer from "../features/files/filesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    files: filesReducer,
  },
});
