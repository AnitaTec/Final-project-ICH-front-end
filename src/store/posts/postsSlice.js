import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostApi,
  fetchMyPostsApi,
  fetchPostsByUsernameApi,
} from "../../shared/api/postsApi";

export const fetchMyPosts = createAsyncThunk("posts/fetchMyPosts", async () => {
  return await fetchMyPostsApi();
});

export const fetchPostsByUsername = createAsyncThunk(
  "posts/fetchByUsername",
  async (username) => {
    const posts = await fetchPostsByUsernameApi(username);
    return { username, posts };
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ image, caption }) => {
    return await createPostApi({ image, caption });
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    byUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
      const posts = action.payload || [];
      const ownerUsername =
        posts?.[0]?.owner?.username || posts?.[0]?.owner?.email || null;

      if (ownerUsername) state.byUser[ownerUsername] = posts;
    });

    builder.addCase(fetchPostsByUsername.fulfilled, (state, action) => {
      const { username, posts } = action.payload || {};
      if (!username) return;
      state.byUser[username] = Array.isArray(posts) ? posts : [];
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      const created = action.payload;
      const ownerUsername =
        created?.owner?.username || created?.owner?.email || null;
      if (!ownerUsername) return;

      if (!state.byUser[ownerUsername]) state.byUser[ownerUsername] = [];
      state.byUser[ownerUsername].unshift(created);
    });
  },
});

export default postsSlice.reducer;
