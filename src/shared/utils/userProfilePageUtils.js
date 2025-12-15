export const getSafeUsername = (username) => (username ? String(username) : "");

export const getEntityId = (obj) => String(obj?._id || obj?.id || "");

export const getProfileMeta = (profile, fallbackAvatar) => {
  return {
    avatarSrc: profile?.avatarURL || fallbackAvatar,
    website: profile?.website || "",
  };
};

export const resolveProfileStatusFromError = (err) => {
  return err?.response?.status === 404 ? "notfound" : "error";
};

export const computeNextFollowers = (prevFollowed, prevFollowers) => {
  return prevFollowed ? Math.max(0, prevFollowers - 1) : prevFollowers + 1;
};
