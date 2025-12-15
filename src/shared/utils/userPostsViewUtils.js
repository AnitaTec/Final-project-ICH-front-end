import ProfileImg from "../../assets/img/Profile.png";

export const safeId = (p) => p?._id || p?.id || p?.postId || p?.uuid || "";

export const timeAgo = (iso) => {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const sec = Math.max(1, Math.floor(ms / 1000));
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const week = Math.floor(day / 7);

  if (week >= 1) return `${week} w`;
  if (day >= 1) return `${day} d`;
  if (hr >= 1) return `${hr} h`;
  if (min >= 1) return `${min} m`;
  return `${sec} s`;
};

export const getOwnerInfo = (post) => {
  const owner = post?.owner || null;
  const username = owner?.username || owner?.email || "username";
  const avatarSrc = owner?.avatarURL || ProfileImg;
  return { owner, username, avatarSrc };
};

export const getPostMeta = (post) => {
  const created = post?.createdAt || post?.created_at || post?.date || null;
  const caption = post?.caption || "";
  const comments = Array.isArray(post?.comments) ? post.comments : [];
  const likesCount = Number(post?.likesCount ?? post?.likes?.length ?? 0);
  return { created, caption, comments, likesCount };
};

export const getCommentView = (c, postId) => {
  const cid = c?._id || c?.id || `${postId}-${Math.random()}`;
  const cu = c?.user || c?.owner || c?.author || {};
  const cun = cu?.username || cu?.email || "user";
  const cav = cu?.avatarURL || ProfileImg;
  const text = c?.text || "";
  const createdAt = c?.createdAt || null;

  return { cid, cun, cav, text, createdAt };
};
