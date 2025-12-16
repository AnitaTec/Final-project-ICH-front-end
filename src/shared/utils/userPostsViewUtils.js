import ProfileImg from "../../assets/img/Profile.png";
import { fetchPostViewApi } from "../api/postsApi";

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

const toStrId = (x) => String(x?._id || x?.id || x || "");

export const getCommentView = (c, postId, meId, me) => {
  const cid = c?._id || c?.id || `${postId}-${Math.random()}`;

  const rawUser = c?.user || c?.owner || c?.author || null;
  const userObj = rawUser && typeof rawUser === "object" ? rawUser : null;

  const userId = toStrId(userObj || rawUser);
  const isMine = Boolean(meId && userId && String(meId) === String(userId));

  const cun =
    userObj?.username ||
    userObj?.email ||
    (isMine ? me?.username || me?.email || "user" : "user");

  const cav =
    userObj?.avatarURL || (isMine ? me?.avatarURL || ProfileImg : ProfileImg);

  const text = c?.text || "";
  const createdAt = c?.createdAt || null;

  return { cid, cun, cav, text, createdAt, userId };
};

export const loadPostViewIntoState = ({
  postId,
  setLocalComments,
  setLocalLikes,
  setLiked,
}) => {
  let cancelled = false;

  (async () => {
    try {
      const data = await fetchPostViewApi(postId);
      if (cancelled) return;

      const viewComments = Array.isArray(data?.comments) ? data.comments : [];
      setLocalComments(viewComments);

      const viewLikesCount = Number(
        data?.likesCount ?? data?.likes?.length ?? 0
      );
      setLocalLikes(viewLikesCount);

      if (typeof data?.isLiked === "boolean") setLiked(data.isLiked);
    } catch (e) {
      console.log("fetch post view error:", e);
    }
  })();

  return () => {
    cancelled = true;
  };
};
