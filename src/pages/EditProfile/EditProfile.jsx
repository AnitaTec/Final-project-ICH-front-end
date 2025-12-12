import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "../../store/auth/authOperations";
import { selectUser } from "../../store/auth/authSelectors";
import * as authApi from "../../shared/api/auth-api";

import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./EditProfile.module.css";
import ProfileImg from "../../assets/img/Profile.png";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (!username) setUsername(user.username || "");
      if (!about) setAbout(user.about || "");
      if (!website) setWebsite(user.website || "");
      if (avatarPreview === null) setAvatarPreview(user.avatarURL || "");
    }
  }, [user]);

  const handleNewPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setAvatarBase64(base64);
      setAvatarPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      avatar: avatarBase64 || null,
      about,
      website,
    };

    try {
      await authApi.updateProfile(payload);
      dispatch(getCurrentUser());
    } catch {}
  };

  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <Menu />
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            <div className={styles.contentRow}>
              <div className={styles.textBlock}>
                <h1 className={styles.title}>Edit profile</h1>

                <section className={styles.topCard}>
                  <div className={styles.topLeft}>
                    <img
                      src={avatarPreview || ProfileImg}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                    <div className={styles.topText}>
                      <p className={styles.topName}>{username}</p>
                      <p className={styles.topSubtitle}>{about}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.newPhotoBtn}
                    onClick={handleNewPhotoClick}
                  >
                    New photo
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </section>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <label className={styles.field}>
                    <span className={styles.labelText}>Username</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.labelText}>Website</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.labelText}>About</span>
                    <div className={styles.textareaWrapper}>
                      <textarea
                        className={styles.textarea}
                        maxLength={150}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                      <div className={styles.counter}>{about.length} / 150</div>
                    </div>
                  </label>

                  <button type="submit" className={styles.saveBtn}>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
