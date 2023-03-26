import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ limit = 10, page = 1 }) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    return response;
  }
);
export const fetchPostSingle = createAsyncThunk(
  "posts/fetchPostSingle",
  async ({ id }) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );
    return response;
  }
);
export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async ({ id }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postComments: [],
    postSingle: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPostSingle: (state, action) => {
      state.postSingle = action.payload;
    },
    setPostComments: (state, action) => {
      state.postComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetchPosts
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //fetchPostSingle
    builder.addCase(fetchPostSingle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostSingle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postSingle = action.payload.data;
    });
    builder.addCase(fetchPostSingle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //fetchPostComments
    builder.addCase(fetchPostComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postComments = action.payload.data;
    });
    builder.addCase(fetchPostComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setPosts, addPost, removePost, setPostSingle, setPostComments } =
  postsSlice.actions;

export default postsSlice.reducer;
