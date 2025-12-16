import instance from "./instance";
import { store } from "../../store/store";

export const createPostApi = async ({ image, caption }) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    "/posts",
    { image, caption },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const fetchMyPostsApi = async () => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.get("/posts/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const deletePostApi = async (postId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const fetchPostsByUsernameApi = async (username) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.get(`/posts/user/${username}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const fetchExplorePostsApi = async (limit = 24) => {
  const { accessToken } = store.getState().auth;
  const { data } = await instance.get("/posts/explore", {
    params: { limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const fetchFeedPostsApi = async (limit = 24) => {
  const { accessToken } = store.getState().auth;
  const { data } = await instance.get("/posts/feed", {
    params: { limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const fetchPostViewApi = async (postId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.get(`/posts/${postId}/view`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const likePostApi = async (postId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    `/posts/${postId}/like`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const unlikePostApi = async (postId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    `/posts/${postId}/unlike`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const addCommentApi = async (postId, text) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    `/posts/${postId}/comments`,
    { text },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const likeCommentApi = async (postId, commentId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    `/posts/${postId}/comments/${commentId}/like`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const unlikeCommentApi = async (postId, commentId) => {
  const { accessToken } = store.getState().auth;
  if (!accessToken) throw new Error("No accessToken");

  const { data } = await instance.post(
    `/posts/${postId}/comments/${commentId}/unlike`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
};

export const createPost = createPostApi;
export const fetchMyPosts = fetchMyPostsApi;
export const fetchPostsByUsername = fetchPostsByUsernameApi;
export const fetchExplorePosts = fetchExplorePostsApi;
export const fetchFeedPosts = fetchFeedPostsApi;
export const deletePost = deletePostApi;

export const fetchPostView = fetchPostViewApi;
export const likePost = likePostApi;
export const unlikePost = unlikePostApi;
export const addComment = addCommentApi;
export const likeComment = likeCommentApi;
export const unlikeComment = unlikeCommentApi;
