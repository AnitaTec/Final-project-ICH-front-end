import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSelectors";

import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./MyProfilePage.module.css";
import ProfileImg from "../../assets/img/Profile.png";

import { selectMyPosts } from "../../store/posts/postsSelectors";
import { fetchMyPosts } from "../../store/posts/postsSlice";

import PostView from "../../modules/PostView/PostView";

const MyProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const posts = useSelector(selectMyPosts);

  const [activePost, setActivePost] = useState(null);

  const username = user?.username || user?.email || "";
  const avatarSrc = user?.avatarURL || ProfileImg;
  const website = user?.website || "";

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

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
                        src={avatarSrc}
                        alt="Profile avatar"
                        className={styles.avatar}
                      />
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.topRow}>
                      <h2 className={styles.username}>{username}</h2>
                      <Link to="/edit" className={styles.editBtn}>
                        Edit profile
                      </Link>
                    </div>

                    <ul className={styles.stats}>
                      <li>
                        <span className={styles.statNumber}>
                          {posts.length}
                        </span>{" "}
                        posts
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
                      {user?.about && <p>{user.about}</p>}
                      {website && (
                        <a
                          href={
                            website.startsWith("http")
                              ? website
                              : `https://${website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {website}
                        </a>
                      )}
                    </div>
                  </div>
                </header>

                <section className={styles.postsSection}>
                  <div className={styles.postsGrid}>
                    {posts.map((p) => (
                      <div
                        key={p._id || p.id}
                        className={styles.postItem}
                        onClick={() => setActivePost(p)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={p.image}
                          alt={p.caption || "post"}
                          className={styles.postImg}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {activePost && (
        <PostView post={activePost} onClose={() => setActivePost(null)} />
      )}
    </div>
  );
};

export default MyProfilePage;
