export const patchPostInList = (list, postId, patch) => {
  const id = String(postId || "");
  return (Array.isArray(list) ? list : []).map((p) => {
    const pid = String(p?._id || p?.id || "");
    return pid === id ? { ...p, ...patch } : p;
  });
};
