import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { selectUser } from "../../store/auth/authSelectors";
import styles from "./Menu.module.css";
import ProfileImg from "../../assets/img/Profile.png";

import IchImg from "../../assets/icons/ICHgram.svg";
import HomeImg from "../../assets/icons/Home.svg";
import ExploreImg from "../../assets/icons/Explore.svg";
import CreateImg from "../../assets/icons/Create.svg";
import MessagesImg from "../../assets/icons/Messages.svg";
import NotificationsImg from "../../assets/icons/Notifications.svg";
import SearchImg from "../../assets/icons/Search.svg";

import HomeAct from "../../assets/icons/homeActive.svg";
import ExplAct from "../../assets/icons/exploreActive.svg";
import NotificAct from "../../assets/icons/notificationsActive.svg";
import SearchAct from "../../assets/icons/searchActive.svg";
import MessageAct from "../../assets/icons/messageActive.svg";

import CreatePopup from "../../modules/Create/CreatePopup.jsx";
import NotificationsPopup from "../../modules/Notifications/NotificationsPopup.jsx";
import SearchPopup from "../../modules/Search/SearchPopup.jsx";

const Menu = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const location = useLocation();
  const user = useSelector(selectUser);

  const avatarSrc = user?.avatarURL || ProfileImg;

  const getIcon = (type) => {
    switch (type) {
      case "home":
        return !showSearch &&
          !showNotifications &&
          location.pathname === "/home"
          ? HomeAct
          : HomeImg;
      case "explore":
        return !showSearch &&
          !showNotifications &&
          location.pathname === "/explore"
          ? ExplAct
          : ExploreImg;
      case "search":
        return showSearch ? SearchAct : SearchImg;
      case "messages":
        return !showSearch &&
          !showNotifications &&
          location.pathname === "/messages"
          ? MessageAct
          : MessagesImg;
      case "notifications":
        return showNotifications ? NotificAct : NotificationsImg;
      default:
        return "";
    }
  };

  return (
    <nav className={styles.menu}>
      <img className={styles.LogoImg} src={IchImg} alt="IchImg" />

      <ul className={styles.list}>
        <li>
          <Link to="/home">
            <img src={getIcon("home")} alt="Home" />
            Home
          </Link>
        </li>

        <li>
          <div
            className={styles.popUp}
            onClick={() => {
              setShowSearch(!showSearch);
              setShowNotifications(false);
            }}
          >
            <img src={getIcon("search")} alt="Search" />
            Search
            {showSearch && <SearchPopup onClose={() => setShowSearch(false)} />}
          </div>
        </li>

        <li>
          <Link to="/explore">
            <img src={getIcon("explore")} alt="Explore" />
            Explore
          </Link>
        </li>

        <li>
          <Link to="/messages">
            <img src={getIcon("messages")} alt="Messages" />
            Messages
          </Link>
        </li>

        <li>
          <div
            className={styles.popUp}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSearch(false);
            }}
          >
            <img src={getIcon("notifications")} alt="Notifications" />
            Notifications
            {showNotifications && (
              <NotificationsPopup onClose={() => setShowNotifications(false)} />
            )}
          </div>
        </li>

        <li>
          <div
            className={styles.popUp}
            onClick={() => {
              setShowCreate(true);
              setShowNotifications(false);
              setShowSearch(false);
            }}
          >
            <img src={CreateImg} alt="Create" />
            Create
            {showCreate && <CreatePopup onClose={() => setShowCreate(false)} />}
          </div>
        </li>
        <li>
          <Link
            to="/profile"
            className={styles.profileLink}
            style={{
              fontWeight: location.pathname === "/profile" ? "700" : "400",
            }}
          >
            <img src={avatarSrc} alt="Profile" className={styles.profileIcon} />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
