import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isAuthLoading: true,
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setIsAuth, setIsAuthLoading } = postsSlice.actions;

export default postsSlice.reducer;
