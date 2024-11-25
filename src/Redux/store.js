import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

export default store;
