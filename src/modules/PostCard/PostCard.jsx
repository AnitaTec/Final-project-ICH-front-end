import { useState } from "react";
import styles from "./PostCard.module.css";
import test from "../../assets/img/test.png";
import Like from "../../assets/icons/Like.svg";
import Comment from "../../assets/icons/Coment.svg";
import ProfileImg from "../../assets/img/Profile.png";

const PostCard = ({
  avatar,
  username,
  time,
  image,
  likes: initialLikes,
  caption,
  commentsCount,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img className={styles.avatar} src={ProfileImg} alt="avatar" />

        <div className={styles.userInfo}>
          <span className={styles.username}>{username} Anita</span>
          <span className={styles.time}>{time}•2 w •</span>
        </div>

        <button className={styles.follow}>follow</button>
      </div>

      <div className={styles.imageBox}>
        <img className={styles.mainImg} src={test} alt="post" />
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

      <div className={styles.caption}>
        <span className={styles.bold}>{username}</span> {caption}
      </div>

      <div className={styles.comments}>View all comments ({commentsCount})</div>
    </div>
  );
};

export default PostCard;
