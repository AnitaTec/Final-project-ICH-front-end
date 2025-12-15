import instance from "./instance";

export const getFollowCountsApi = async (userId, accessToken) => {
  const { data } = await instance.get(`/follow/${userId}/counts`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const isFollowingApi = async (userId, accessToken) => {
  const { data } = await instance.get(`/follow/${userId}/is-following`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const followApi = async (userId, accessToken) => {
  const { data } = await instance.post(
    `/follow/${userId}`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return data;
};

export const unfollowApi = async (userId, accessToken) => {
  const { data } = await instance.delete(`/follow/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const getFollowersApi = async (userId, accessToken) => {
  const { data } = await instance.get(`/follow/${userId}/followers`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const getFollowingApi = async (userId, accessToken) => {
  const { data } = await instance.get(`/follow/${userId}/following`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
