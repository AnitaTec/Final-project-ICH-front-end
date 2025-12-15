import { useMemo, useState } from "react";
import styles from "./PostCard.module.css";
import Like from "../../assets/icons/Like.svg";
import Comment from "../../assets/icons/Coment.svg";
import ProfileImg from "../../assets/img/Profile.png";

const toShortTime = (iso) => {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";

  const diff = Date.now() - t;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;

  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;

  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;

  const w = Math.floor(d / 7);
  if (w < 4) return `${w}w`;

  const mo = Math.floor(d / 30);
  return `${mo}mo`;
};

const PostCard = (props) => {
  const post = props?.post;

  const owner = post?.owner || {};
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

  const handleLike = () => {
    setLikes((prev) => (liked ? Math.max(0, prev - 1) : prev + 1));
    setLiked((prev) => !prev);
  };

  const [isCaptionOpen, setIsCaptionOpen] = useState(false);

  const captionStr = String(caption || "");
  const isLongCaption = captionStr.length > 30;

  return (
    <div className={`${styles.card} ${isCaptionOpen ? styles.cardOpen : ""}`}>
      <div className={styles.header}>
        <img className={styles.avatar} src={avatarSrc} alt="avatar" />

        <div className={styles.userInfo}>
          <span className={styles.username}>{username}</span>
          <span className={styles.time}>{timeText ? `${timeText}•` : ""}</span>
        </div>

        <button className={styles.follow}>follow</button>
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

          <button className={styles.iconBtn}>
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
        <span className={styles.bold}>{username}</span>
        <span className={styles.captionText}>
          {" "}
          {isCaptionOpen ? captionStr : captionStr.slice(0, 30)}
        </span>

        {isLongCaption && !isCaptionOpen && (
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setIsCaptionOpen(true)}
          >
            ...more
          </button>
        )}
      </div>

      <div className={styles.comments}>
        View all comments ({props.commentsCount || 0})
      </div>
    </div>
  );
};

export default PostCard;
