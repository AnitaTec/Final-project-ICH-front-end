import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <Link to="/" className={styles.home}>
          Home
        </Link>
        <Link to="/search" className={styles.search}>
          Search
        </Link>
        <Link to="/explore" className={styles.explore}>
          Explore
        </Link>
        <Link to="/messages" className={styles.messages}>
          Messages
        </Link>
        <Link to="/notifications" className={styles.notifications}>
          Notifications
        </Link>
        <Link to="/create" className={styles.create}>
          Create
        </Link>
      </nav>

      <p>©2025 ICHGRAM</p>
    </footer>
  );
};

export default Footer;
