import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import authReduces from "./authSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduces,
  },
});
