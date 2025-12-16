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

const PostCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const me = useSelector(selectUser);

  const post = props?.post;

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

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes || 0);

  const handleLike = (e) => {
    e?.stopPropagation?.();
    setLikes((prev) => (liked ? Math.max(0, prev - 1) : prev + 1));
    setLiked((prev) => !prev);
  };

  const [isCaptionOpen, setIsCaptionOpen] = useState(false);

  const captionStr = String(caption || "");
  const isLongCaption = captionStr.length > 30;

  const goToProfile = (e) => {
    e?.stopPropagation?.();
    navigate(`/users/${encodeURIComponent(username)}`);
  };

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
      if (prevFollowed) {
        await unfollowApi(ownerId, accessToken);
      } else {
        await followApi(ownerId, accessToken);
      }

      dispatch(fetchFollowInfo({ userId: ownerId, accessToken }));
      if (meId) dispatch(fetchFollowInfo({ userId: meId, accessToken }));
    } catch (err) {
      console.log("follow error:", err);
      dispatch(setIsFollowing({ userId: ownerId, isFollowing: prevFollowed }));
    } finally {
      setFollowBusy(false);
    }
  };

  return (
    <div className={`${styles.card} ${isCaptionOpen ? styles.cardOpen : ""}`}>
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

          <button
            className={styles.iconBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={Comment} alt="comment" />
          </button>
        </div>
      </div>

      <div className={styles.likes}>{likes} likes</div>

      <div
        className={`${styles.caption} ${
          isCaptionOpen ? styles.captionOpen : ""
        }`}
      >
        <span
          className={styles.bold}
          onClick={goToProfile}
          style={{ cursor: "pointer" }}
        >
          {username}
        </span>
        <span className={styles.captionText}>
          {" "}
          {isCaptionOpen ? captionStr : captionStr.slice(0, 30)}
        </span>

        {isLongCaption && !isCaptionOpen && (
          <button
            type="button"
            className={styles.moreBtn}
            onClick={(e) => {
              e.stopPropagation();
              setIsCaptionOpen(true);
            }}
          >
            ...more
          </button>
        )}
      </div>

      <div className={styles.comments} onClick={(e) => e.stopPropagation()}>
        View all comments ({props.commentsCount || 0})
      </div>
    </div>
  );
};

export default PostCard;
