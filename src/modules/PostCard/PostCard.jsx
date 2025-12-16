import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./PostCard.module.css";
import Like from "../../assets/icons/Like.svg";
import Comment from "../../assets/icons/Coment.svg";
import ProfileImg from "../../assets/img/Profile.png";

import { followApi, unfollowApi } from "../../shared/api/followApi";
import {
  fetchFollowInfo,
  setIsFollowing,
} from "../../store/follow/followSlice";
import { selectIsFollowingByUserId } from "../../store/follow/followSelectors";
import { selectUser } from "../../store/auth/authSelectors";
import { getEntityId } from "../../shared/utils/userProfilePageUtils";
import {
  toShortTime,
  norm,
  computeIsSelf,
} from "../../shared/utils/postCardUtils";

import { likePostApi, unlikePostApi } from "../../shared/api/postsApi";

const toStrId = (x) => String(x?._id || x?.id || x || "");

const PostCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const me = useSelector(selectUser);

  const post = props?.post;

  const postId = useMemo(() => String(post?._id || post?.id || ""), [post]);

  const owner = post?.owner || {};
  const ownerId = owner?._id || owner?.id;

  const username = props.username || owner.username || owner.email || "user";
  const avatarSrc = props.avatar || owner.avatarURL || ProfileImg;
  const imageSrc = props.image || post?.image || "";
  const caption = props.caption ?? post?.caption ?? "";

  const timeText = useMemo(() => {
    const t = props.time || post?.createdAt || post?.updatedAt || "";
    return toShortTime(t);
  }, [props.time, post?.createdAt, post?.updatedAt]);

  const meId = getEntityId(me);

  const ownerKey = norm(owner.username || owner.email || username);
  const meKey = norm(me?.username || me?.email);

  const isSelf = computeIsSelf({ ownerId, meId, ownerKey, meKey });

  const followed = useSelector(selectIsFollowingByUserId(ownerId));
  const [followBusy, setFollowBusy] = useState(false);

  useEffect(() => {
    if (!accessToken || !ownerId || isSelf) return;
    dispatch(fetchFollowInfo({ userId: ownerId, accessToken }));
  }, [dispatch, accessToken, ownerId, isSelf]);

  const onToggleFollow = async (e) => {
    e.stopPropagation();
    if (!accessToken || !ownerId || followBusy || isSelf) return;

    const prevFollowed = !!followed;
    setFollowBusy(true);

    dispatch(setIsFollowing({ userId: ownerId, isFollowing: !prevFollowed }));

    try {
      if (prevFollowed) await unfollowApi(ownerId, accessToken);
      else await followApi(ownerId, accessToken);

      dispatch(fetchFollowInfo({ userId: ownerId, accessToken }));
      if (meId) dispatch(fetchFollowInfo({ userId: meId, accessToken }));
    } catch (err) {
      console.log("follow error:", err);
      dispatch(setIsFollowing({ userId: ownerId, isFollowing: prevFollowed }));
    } finally {
      setFollowBusy(false);
    }
  };

  const calcLikedFromPost = (p) => {
    if (typeof p?.isLiked === "boolean") return p.isLiked;
    const likesArr = Array.isArray(p?.likes) ? p.likes : [];
    return likesArr.some((x) => toStrId(x) === String(meId));
  };

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLiked(calcLikedFromPost(post));
    setLikes(
      Number(post?.likesCount ?? post?.likes?.length ?? props.likes ?? 0)
    );
  }, [post, meId, props.likes]);

  const commentsCount = Number(
    post?.commentsCount ??
      (Array.isArray(post?.comments) ? post.comments.length : 0) ??
      props.commentsCount ??
      0
  );

  const handleLike = async (e) => {
    e?.stopPropagation?.();
    if (!postId) return;

    const prevLiked = liked;
    const prevLikes = likes;

    setLiked(!prevLiked);
    setLikes(prevLiked ? Math.max(0, prevLikes - 1) : prevLikes + 1);

    try {
      const res = prevLiked
        ? await unlikePostApi(postId)
        : await likePostApi(postId);

      const nextLikesCount =
        typeof res?.likesCount === "number"
          ? res.likesCount
          : prevLiked
          ? Math.max(0, prevLikes - 1)
          : prevLikes + 1;

      const nextLiked =
        typeof res?.liked === "boolean" ? res.liked : !prevLiked;

      setLikes(nextLikesCount);
      setLiked(nextLiked);

      props.onPostUpdated?.(postId, {
        likesCount: nextLikesCount,
        isLiked: nextLiked,
      });
    } catch (err) {
      console.log("like error:", err);
      setLiked(prevLiked);
      setLikes(prevLikes);
    }
  };

  const goToProfile = (e) => {
    e?.stopPropagation?.();
    navigate(`/users/${encodeURIComponent(username)}`);
  };

  const onOpen = () => {
    props.onOpenPost?.(post);
  };

  const onOpenWithComment = (e) => {
    e?.stopPropagation?.();
    props.onOpenPost?.(post, { focusComment: true });
  };

  return (
    <div className={`${styles.card}`} onClick={onOpen}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatarSrc}
          alt="avatar"
          onClick={goToProfile}
          style={{ cursor: "pointer" }}
        />

        <div className={styles.userInfo}>
          <span
            className={styles.username}
            onClick={goToProfile}
            style={{ cursor: "pointer" }}
          >
            {username}
          </span>
          <span className={styles.time}>{timeText ? `${timeText}•` : ""}</span>
        </div>

        {!isSelf && (
          <button
            className={styles.follow}
            onClick={onToggleFollow}
            disabled={followBusy}
          >
            {followed ? "Following" : "Follow"}
          </button>
        )}
      </div>

      <div className={styles.imageBox}>
        {imageSrc ? (
          <img className={styles.mainImg} src={imageSrc} alt="post" />
        ) : null}
      </div>

      <div className={styles.actions}>
        <div className={styles.left}>
          <button className={styles.iconBtn} onClick={handleLike}>
            <img src={Like} alt="like" />
          </button>

          <button className={styles.iconBtn} onClick={onOpenWithComment}>
            <img src={Comment} alt="comment" />
          </button>
        </div>
      </div>

      <div className={styles.likes}>{likes} likes</div>

      <div className={styles.caption}>
        <span
          className={styles.bold}
          onClick={goToProfile}
          style={{ cursor: "pointer" }}
        >
          {username}
        </span>
        <span className={styles.captionText}> {String(caption || "")}</span>
      </div>

      <div className={styles.comments} onClick={onOpenWithComment}>
        View all comments ({commentsCount})
      </div>
    </div>
  );
};

export default PostCard;
