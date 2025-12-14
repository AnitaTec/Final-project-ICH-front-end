import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchPopup.module.css";
import ProfileImg from "../../assets/img/Profile.png";

import { searchUsers } from "../../shared/api/auth-api";

const SearchPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    const q = value.trim();
    if (!q) {
      setUsers([]);
      return;
    }

    try {
      const data = await searchUsers(q);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("searchUsers error:", err);
      setUsers([]);
    }
  };

  const handlePick = (username) => {
    onClose?.();
    navigate(`/users/${username}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h4>Search</h4>

        <input
          type="text"
          className={styles.input}
          placeholder="Search username"
          value={query}
          onChange={handleChange}
          autoFocus
        />

        <p>Results</p>

        <ul className={styles.list}>
          {users.map((u) => (
            <li
              key={u._id || u.username}
              className={styles.item}
              onClick={() => handlePick(u.username)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={u.avatarURL || ProfileImg}
                className={styles.avatar}
                alt="avatar"
              />
              <span className={styles.username}>{u.username}</span>
            </li>
          ))}

          {query.trim() && users.length === 0 ? (
            <li className={styles.item}>
              <span className={styles.username}>No matches</span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default SearchPopup;
