import instance from "./instance";
import { store } from "../../store/store";

export const register = async (payload) => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await instance.post("/auth/login", payload);
  instance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
  return data;
};

export const logout = async () => {
  const { accessToken } = store.getState().auth;

  if (!accessToken) return;

  const { data } = await instance.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  instance.defaults.headers["Authorization"] = "";
  return data;
};

export const getCurrent = async (token) => {
  const { data } = await instance.get("/auth/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateProfile = async (payload) => {
  const { accessToken } = store.getState().auth;

  const response = await instance.patch("/auth/profile", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.user;
};

export const getUserById = async (userId, token) => {
  const { data } = await instance.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchUserByUsername = async (username, token) => {
  const { data } = await instance.get(`/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const searchUsers = async (q) => {
  const { accessToken } = store.getState().auth;

  const { data } = await instance.get("/users/search", {
    params: { q },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
