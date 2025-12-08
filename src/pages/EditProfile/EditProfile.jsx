import { useRef, useState } from "react";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./EditProfile.module.css";
import ProfileImg from "../../assets/img/Profile.png";

const EditProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState(ProfileImg);
  const [username, setUsername] = useState("ichschool");
  const [about, setAbout] = useState(
    "- Гарантия помощи с трудоустройством в ведущие IT-компании, Гарантия помощи с трудоустройством в ведущие IT-компании,Гарантия помощи с трудоустройством в ведущие IT-компании,Гарантия помощи с трудоустройством в ведущие IT-компании"
  );
  const fileInputRef = useRef(null);

  const handleNewPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
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
                      src={avatarPreview}
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

                <form className={styles.form}>
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
                    <input className={styles.input} type="text" />
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
