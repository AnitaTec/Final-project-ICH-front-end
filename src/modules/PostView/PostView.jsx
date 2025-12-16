import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./PostView.module.css";
import ProfileImg from "../../assets/img/Profile.png";
import Like from "../../assets/icons/Like.svg";
import Comment from "../../assets/icons/Coment.svg";
import Frame from "../../assets/icons/frame.png";
import OptionsMenuModal from "../OptionsMenu/OptionsMenuModal";

import { fetchMyPosts } from "../../store/posts/postsSlice";
import { deletePostApi } from "../../shared/api/postsApi";

const safeId = (p) => p?._id || p?.id || p?.postId || p?.uuid || "";

const timeAgo = (iso) => {
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

const PostView = ({ post, onClose }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const owner = post?.owner || null;
  const username = owner?.username || owner?.email || "username";
  const avatarSrc = owner?.avatarURL || ProfileImg;

  const created = post?.createdAt || post?.created_at || post?.date || null;

  const caption = post?.caption || "";
  const comments = Array.isArray(post?.comments) ? post.comments : [];

  const likesCount = Number(post?.likesCount ?? post?.likes?.length ?? 0);

  const postId = useMemo(() => safeId(post), [post]);

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

  const onCopyLink = async () => {
    const url = `${window.location.origin}/post/${postId}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } finally {
      setIsMenuOpen(false);
    }
  };

  const onGoToPost = () => {
    setIsMenuOpen(false);
    onClose();
  };

  const onDelete = async () => {
    if (!postId) return;

    try {
      await deletePostApi(postId);
      setIsMenuOpen(false);
      onClose();
      dispatch(fetchMyPosts());
    } catch {
      setIsMenuOpen(false);
    }
  };

  if (!post) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <OptionsMenuModal
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onDelete={onDelete}
          onCopyLink={onCopyLink}
          onGoToPost={onGoToPost}
          onEdit={() => setIsMenuOpen(false)}
        />

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
            </div>

            <button
              type="button"
              className={styles.moreBtn}
              onClick={() => setIsMenuOpen(true)}
              aria-label="More"
            >
              …
            </button>
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
                const cid = c?._id || c?.id || `${postId}-${Math.random()}`;
                const cu = c?.user || c?.owner || c?.author || {};
                const cun = cu?.username || cu?.email || "user";
                const cav = cu?.avatarURL || ProfileImg;

                return (
                  <div key={cid} className={styles.commentRow}>
                    <img
                      className={styles.avatarSmall}
                      src={cav}
                      alt="avatar"
                    />
                    <div className={styles.commentText}>
                      <span className={styles.usernameInline}>{cun}</span>
                      <span className={styles.comment}>{c?.text || ""}</span>
                      <div className={styles.commentMeta}>
                        <span>{timeAgo(c?.createdAt)}</span>
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

export default PostView;
