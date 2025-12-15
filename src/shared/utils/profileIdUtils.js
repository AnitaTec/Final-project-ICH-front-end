export const normalizeId = (raw) => {
  if (!raw) return "";

  if (typeof raw === "string") return raw;
  if (typeof raw === "number") return String(raw);

  if (typeof raw === "object") {
    if (typeof raw.$oid === "string") return raw.$oid;

    if (raw._id) return normalizeId(raw._id);
    if (raw.id) return normalizeId(raw.id);

    if (typeof raw.toHexString === "function") {
      try {
        return raw.toHexString();
      } catch {
        return "";
      }
    }

    if (typeof raw.toString === "function") {
      const s = raw.toString();
      return s && s !== "[object Object]" ? s : "";
    }
  }

  return "";
};

export const pickFirstId = (...candidates) => {
  for (const c of candidates) {
    const id = normalizeId(c);
    if (id) return id;
  }
  return "";
};

export const resolveMyId = ({ user, posts, followByUserId }) => {
  const fromUser = pickFirstId(
    user?._id,
    user?.id,
    user?.user?._id,
    user?.user?.id,
    user?.data?._id,
    user?.data?.id,
    user?.profile?._id,
    user?.profile?.id
  );
  if (fromUser) return fromUser;

  const p0 = posts?.[0];
  const fromPosts = pickFirstId(
    p0?.owner?._id,
    p0?.owner?.id,
    p0?.ownerId,
    p0?.userId,
    p0?.user?._id,
    p0?.user?.id,
    p0?.author?._id,
    p0?.author?.id
  );
  if (fromPosts) return fromPosts;

  const keys = Object.keys(followByUserId || {});
  const fallbackFollowKey = keys.length === 1 ? keys[0] : "";
  return normalizeId(fallbackFollowKey);
};
