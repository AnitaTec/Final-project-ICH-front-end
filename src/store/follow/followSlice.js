import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFollowCountsApi, isFollowingApi } from "../../shared/api/followApi";

const normalizeId = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    if (typeof v.$oid === "string") return v.$oid;
    if (typeof v.toString === "function") {
      const s = v.toString();
      return s === "[object Object]" ? "" : s;
    }
  }
  return "";
};

export const fetchFollowInfo = createAsyncThunk(
  "follow/fetchFollowInfo",
  async ({ userId, accessToken }, { rejectWithValue }) => {
    try {
      const id = normalizeId(userId);
      if (!id || !accessToken) return rejectWithValue("missing_params");

      const [counts, rel] = await Promise.all([
        getFollowCountsApi(id, accessToken),
        isFollowingApi(id, accessToken),
      ]);

      return {
        userId: id,
        followers: Number(counts?.followers || 0),
        following: Number(counts?.following || 0),
        isFollowing: Boolean(rel?.isFollowing),
      };
    } catch {
      return rejectWithValue("error");
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState: {
    byUserId: {},
  },
  reducers: {
    setCounts: (state, action) => {
      const id = normalizeId(action.payload?.userId);
      if (!id) return;
      const prev = state.byUserId[id] || {
        followers: 0,
        following: 0,
        isFollowing: false,
      };
      state.byUserId[id] = {
        ...prev,
        followers: Number(action.payload?.followers ?? prev.followers ?? 0),
        following: Number(action.payload?.following ?? prev.following ?? 0),
      };
    },
    setIsFollowing: (state, action) => {
      const id = normalizeId(action.payload?.userId);
      if (!id) return;
      const prev = state.byUserId[id] || {
        followers: 0,
        following: 0,
        isFollowing: false,
      };
      state.byUserId[id] = {
        ...prev,
        isFollowing: Boolean(action.payload?.isFollowing),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFollowInfo.fulfilled, (state, action) => {
      const id = normalizeId(action.payload?.userId);
      if (!id) return;
      const prev = state.byUserId[id] || {
        followers: 0,
        following: 0,
        isFollowing: false,
      };
      state.byUserId[id] = {
        ...prev,
        followers: Number(action.payload?.followers || 0),
        following: Number(action.payload?.following || 0),
        isFollowing: Boolean(action.payload?.isFollowing),
      };
    });
  },
});

export const { setCounts, setIsFollowing } = followSlice.actions;
export default followSlice.reducer;
