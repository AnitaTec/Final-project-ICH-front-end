import { Link } from "react-router-dom";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./MyProfilePage.module.css";
import TestPost from "../../assets/img/TestPost.png";
import TestPost2 from "../../assets/img/TestPost2.png";
import ProfileImg from "../../assets/img/Profile.png";

const MyProfilePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <Menu />
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            <div className={styles.contentRow}>
              <div className={styles.textBlock}>
                <header className={styles.profileHeader}>
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatarInner}>
                      <img
                        src={ProfileImg}
                        alt="Profile avatar"
                        className={styles.avatar}
                      />
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.topRow}>
                      <h2 className={styles.username}>itcareerhub</h2>

                      <Link to="/edit" className={styles.editBtn}>
                        Edit profile
                      </Link>
                    </div>

                    <ul className={styles.stats}>
                      <li>
                        <span className={styles.statNumber}>129</span> posts
                      </li>
                      <li>
                        <span className={styles.statNumber}>9,993</span>{" "}
                        followers
                      </li>
                      <li>
                        <span className={styles.statNumber}>59</span> following
                      </li>
                    </ul>

                    <div className={styles.bio}>
                      <p>• Гарантия помощи с трудоустройством</p>
                      <p>• Выпускники зарабатывают от 45k евро</p>
                      <p>Бесплатная </p>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className={styles.link}
                      >
                        bit.ly/your-link
                      </a>
                    </div>
                  </div>
                </header>

                <section className={styles.postsSection}>
                  <div className={styles.postsGrid}>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost}
                        alt="Test post 1"
                        className={styles.postImg}
                      />
                    </div>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost2}
                        alt="Test post 2"
                        className={styles.postImg}
                      />
                    </div>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost}
                        alt="Test post 3"
                        className={styles.postImg}
                      />
                    </div>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost2}
                        alt="Test post 4"
                        className={styles.postImg}
                      />
                    </div>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost}
                        alt="Test post 5"
                        className={styles.postImg}
                      />
                    </div>
                    <div className={styles.postItem}>
                      <img
                        src={TestPost2}
                        alt="Test post 6"
                        className={styles.postImg}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage;
