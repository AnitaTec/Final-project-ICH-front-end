import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import SearchPopup from "../../modules/Search/SearchPopup.jsx";
import NotificationsPopup from "../../modules/Notifications/NotificationsPopup.jsx";
import CreatePopup from "../../modules/Create/CreatePopup.jsx";

const Footer = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <footer className={styles.footer}>
      <nav>
        <Link to="/home" className={styles.home}>
          Home
        </Link>
        <Link
          to="/search"
          className={styles.search}
          onClick={(e) => {
            e.preventDefault();
            setShowSearch(true);
            setShowNotifications(false);
            setShowCreate(false);
          }}
        >
          Search
        </Link>

        <Link to="/explore" className={styles.explore}>
          Explore
        </Link>
        <Link to="/messages" className={styles.messages}>
          Messages
        </Link>
        <Link
          to="/notifications"
          className={styles.notifications}
          onClick={(e) => {
            e.preventDefault();
            setShowNotifications(true);
            setShowSearch(false);
            setShowCreate(false);
          }}
        >
          Notifications
        </Link>
        <Link
          to="/create"
          className={styles.create}
          onClick={(e) => {
            e.preventDefault();
            setShowCreate(true);
            setShowNotifications(false);
            setShowSearch(false);
          }}
        >
          Create
        </Link>
      </nav>

      <p>©2025 ICHGRAM</p>

      {showSearch && <SearchPopup onClose={() => setShowSearch(false)} />}
      {showNotifications && (
        <NotificationsPopup onClose={() => setShowNotifications(false)} />
      )}
      {showCreate && <CreatePopup onClose={() => setShowCreate(false)} />}
    </footer>
  );
};

export default Footer;
