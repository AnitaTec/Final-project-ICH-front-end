export const selectFollowCountsByUserId = (userId) => (state) => {
  const id = String(userId || "");
  return state.follow?.byUserId?.[id] || { followers: 0, following: 0 };
};

export const selectIsFollowingByUserId = (userId) => (state) => {
  const id = String(userId || "");
  return Boolean(state.follow?.byUserId?.[id]?.isFollowing);
};
