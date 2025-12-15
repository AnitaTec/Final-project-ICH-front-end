import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserPostView.module.css";
import Like from "../../assets/icons/Like.svg";
import Comment from "../../assets/icons/Coment.svg";
import Frame from "../../assets/icons/frame.png";

import {
  safeId,
  timeAgo,
  getOwnerInfo,
  getPostMeta,
  getCommentView,
} from "../../shared/utils/userPostsViewUtils";

import { selectUser } from "../../store/auth/authSelectors";
import {
  selectFollowCountsByUserId,
  selectIsFollowingByUserId,
} from "../../store/follow/followSelectors";
import {
  fetchFollowInfo,
  setCounts,
  setIsFollowing,
} from "../../store/follow/followSlice";
import { followApi, unfollowApi } from "../../shared/api/followApi";

const UserPostView = ({ post, onClose }) => {
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const me = useSelector(selectUser);

  const [comment, setComment] = useState("");
  const [followBusy, setFollowBusy] = useState(false);

  const postId = useMemo(() => safeId(post), [post]);

  const { owner, username, avatarSrc } = getOwnerInfo(post);
  const { created, caption, comments, likesCount } = getPostMeta(post);

  const ownerId = useMemo(() => String(owner?._id || owner?.id || ""), [owner]);
  const meId = useMemo(() => String(me?._id || me?.id || ""), [me]);

  const isMe = Boolean(ownerId && meId && ownerId === meId);

  const counts = useSelector(selectFollowCountsByUserId(ownerId));
  const followed = useSelector(selectIsFollowingByUserId(ownerId));

  useEffect(() => {
    if (!accessToken || !ownerId) return;
    dispatch(fetchFollowInfo({ userId: ownerId, accessToken }));
  }, [dispatch, accessToken, ownerId]);

  const onSubmitComment = () => {
    if (!comment.trim()) return;
    setComment("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitComment();
    }
  };

  const onToggleFollow = async () => {
    if (!accessToken || !ownerId || followBusy || isMe) return;

    const prevFollowed = followed;
    const prevFollowers = Number(counts.followers || 0);
    const prevFollowing = Number(counts.following || 0);

    setFollowBusy(true);

    dispatch(setIsFollowing({ userId: ownerId, isFollowing: !prevFollowed }));
    dispatch(
      setCounts({
        userId: ownerId,
        followers: prevFollowed
          ? Math.max(0, prevFollowers - 1)
          : prevFollowers + 1,
        following: prevFollowing,
      })
    );

    try {
      if (prevFollowed) await unfollowApi(ownerId, accessToken);
      else await followApi(ownerId, accessToken);

      if (meId) dispatch(fetchFollowInfo({ userId: meId, accessToken }));
    } catch {
      dispatch(setIsFollowing({ userId: ownerId, isFollowing: prevFollowed }));
      dispatch(
        setCounts({
          userId: ownerId,
          followers: prevFollowers,
          following: prevFollowing,
        })
      );
    } finally {
      setFollowBusy(false);
    }
  };

  if (!post) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.left}>
          <img
            className={styles.photo}
            src={post.image}
            alt={caption || "post"}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.user}>
              <div className={styles.avatarFrame}>
                <img className={styles.frameImg} src={Frame} alt="frame" />
                <img
                  className={styles.avatarInFrame}
                  src={avatarSrc}
                  alt="avatar"
                />
              </div>

              <span className={styles.username}>{username}</span>

              {!isMe && (
                <button
                  type="button"
                  className={styles.followBtn}
                  onClick={onToggleFollow}
                  disabled={followBusy}
                >
                  {followed ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.captionRow}>
              <div className={styles.avatarFrame}>
                <img className={styles.frameImg} src={Frame} alt="frame" />
                <img
                  className={styles.avatarInFrame}
                  src={avatarSrc}
                  alt="avatar"
                />
              </div>

              <div className={styles.captionText}>
                <span className={styles.usernameInline}>{username}</span>
                <span className={styles.caption}>{caption}</span>
              </div>
            </div>

            <div className={styles.comments}>
              {comments.map((c) => {
                const v = getCommentView(c, postId);

                return (
                  <div key={v.cid} className={styles.commentRow}>
                    <img
                      className={styles.avatarSmall}
                      src={v.cav}
                      alt="avatar"
                    />
                    <div className={styles.commentText}>
                      <span className={styles.usernameInline}>{v.cun}</span>
                      <span className={styles.comment}>{v.text}</span>
                      <div className={styles.commentMeta}>
                        <span>{timeAgo(v.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.actions}>
              <div className={styles.actionsLeft}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label="Like"
                >
                  <img className={styles.actionIcon} src={Like} alt="like" />
                </button>

                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label="Comment"
                >
                  <img
                    className={styles.actionIcon}
                    src={Comment}
                    alt="comment"
                  />
                </button>
              </div>
            </div>

            <div className={styles.likes}>{likesCount} likes</div>
            <div className={styles.time}>{timeAgo(created)}</div>

            <div className={styles.addComment}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Add a comment..."
              />
              <button
                type="button"
                className={styles.postBtn}
                onClick={onSubmitComment}
                disabled={!comment.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostView;
