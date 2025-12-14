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

export const createPost = createPostApi;
export const fetchMyPosts = fetchMyPostsApi;
export const fetchPostsByUsername = fetchPostsByUsernameApi;
export const fetchExplorePosts = fetchExplorePostsApi;
