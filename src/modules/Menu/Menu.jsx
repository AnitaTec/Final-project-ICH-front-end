import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import IchImg from "../../assets/icons/ICHgram.svg";
import HomeImg from "../../assets/icons/Home.svg";
import ExploreImg from "../../assets/icons/Explore.svg";
import CreateImg from "../../assets/icons/Create.svg";
import MessagesImg from "../../assets/icons/Messages.svg";
import NotificationsImg from "../../assets/icons/Notifications.svg";
import SearchImg from "../../assets/icons/Search.svg";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <img className={styles.LogoImg} src={IchImg} alt="IchImg" />

      <ul className={styles.list}>
        <li>
          <Link to="/home">
            <img src={HomeImg} alt="Home" />
            Home
          </Link>
        </li>

        <li>
          <Link to="/search">
            <img src={SearchImg} alt="Search" />
            Search
          </Link>
        </li>

        <li>
          <Link to="/explore">
            <img src={ExploreImg} alt="Explore" />
            Explore
          </Link>
        </li>

        <li>
          <Link to="/messages">
            <img src={MessagesImg} alt="Messages" />
            Messages
          </Link>
        </li>

        <li>
          <Link to="/notifications">
            <img src={NotificationsImg} alt="Notifications" />
            Notifications
          </Link>
        </li>

        <li>
          <Link to="/create">
            <img src={CreateImg} alt="Create" />
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
