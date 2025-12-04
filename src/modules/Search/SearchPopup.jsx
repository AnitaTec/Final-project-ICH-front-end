import styles from "./SearchPopup.module.css";
import ProfileImg from "../../assets/img/Profile.png";

const SearchPopup = ({ onClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h4>Search</h4>

        <input type="text" className={styles.input} placeholder="Search" />

        <p>Recent</p>

        <ul className={styles.list}>
          <li className={styles.item}>
            <img src={ProfileImg} className={styles.avatar} alt="avatar" />
            <span className={styles.username}>example_user1</span>
          </li>

          <li className={styles.item}>
            <img src={ProfileImg} className={styles.avatar} alt="avatar" />
            <span className={styles.username}>example_user2</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPopup;
