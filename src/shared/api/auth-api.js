import instance from "./instance";

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
  await instance.post("/logout");
  instance.defaults.headers["Authorization"] = "";
};

export const getCurrent = async (token) => {
  const { data } = await instance.get("/auth/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
