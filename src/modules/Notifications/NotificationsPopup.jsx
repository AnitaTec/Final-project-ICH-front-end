import styles from "./NotificationsPopup.module.css";
import ProfileImg from "../../assets/img/ProfileImg.png";
import PostImg from "../../assets/img/PostImg.png";

const NotificationsPopup = ({ onClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup}>
        <h4>Notifications</h4>
        <p>New</p>

        <ul className={styles.list}>
          <li className={styles.item}>
            <img src={ProfileImg} className={styles.avatar} alt="avatar" />

            <div className={styles.textBlock}>
              <span className={styles.username}>sashaa</span>
              <span className={styles.action}>
                liked your <br /> photo.
                <span className={styles.time}> 2 d</span>
              </span>
            </div>

            <img src={PostImg} className={styles.post} alt="post" />
          </li>

          <li className={styles.item}>
            <img src={ProfileImg} className={styles.avatar} alt="avatar" />

            <div className={styles.textBlock}>
              <span className={styles.username}>sashaa</span>
              <span className={styles.action}>
                commented <br />
                your photo.
                <span className={styles.time}> 2 week</span>
              </span>
            </div>

            <img src={PostImg} className={styles.post} alt="post" />
          </li>

          <li className={styles.item}>
            <img src={ProfileImg} className={styles.avatar} alt="avatar" />

            <div className={styles.textBlock}>
              <span className={styles.username}>sashaa</span>
              <span className={styles.action}>
                started <br /> following.
                <span className={styles.time}> 2 d</span>
              </span>
            </div>

            <img src={PostImg} className={styles.post} alt="post" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPopup;
