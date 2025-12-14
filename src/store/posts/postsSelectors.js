import { createSelector } from "@reduxjs/toolkit";

const EMPTY = [];

export const selectPostsState = (state) => state.posts;

export const makeSelectPostsByOwnerKey = (ownerKey) =>
  createSelector([selectPostsState], (postsState) => {
    const byUser = postsState?.byUser || {};
    return byUser[ownerKey] || EMPTY;
  });

export const selectMyOwnerKey = (state) =>
  state.auth?.user?.username ||
  state.auth?.user?.email ||
  state.auth?.user?.user?.username ||
  state.auth?.user?.user?.email ||
  "";

export const selectMyPosts = createSelector(
  [selectPostsState, selectMyOwnerKey],
  (postsState, ownerKey) => {
    const byUser = postsState?.byUser || {};
    return byUser[ownerKey] || EMPTY;
  }
);
