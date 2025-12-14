import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./UserProfilePage.module.css";
import ProfileImg from "../../assets/img/Profile.png";

import { fetchUserByUsername } from "../../shared/api/auth-api";
import { createConversation } from "../../shared/api/messagesApi";

import { fetchPostsByUsername } from "../../store/posts/postsSlice";
import { makeSelectPostsByOwnerKey } from "../../store/posts/postsSelectors";

const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);

  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("idle");

  const safeUsername = useMemo(
    () => (username ? String(username) : ""),
    [username]
  );

  const selectPostsForThisUser = useMemo(
    () => makeSelectPostsByOwnerKey(safeUsername),
    [safeUsername]
  );
  const posts = useSelector(selectPostsForThisUser);

  useEffect(() => {
    if (!safeUsername || !accessToken) return;

    let cancelled = false;

    Promise.resolve().then(() => {
      if (!cancelled) setStatus("loading");
    });

    (async () => {
      try {
        const data = await fetchUserByUsername(safeUsername, accessToken);
        if (cancelled) return;
        setProfile(data);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        if (e?.response?.status === 404) {
          setProfile(null);
          setStatus("notfound");
        } else {
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [safeUsername, accessToken]);

  useEffect(() => {
    if (!safeUsername || !accessToken) return;
    dispatch(fetchPostsByUsername(safeUsername));
  }, [dispatch, safeUsername, accessToken]);

  if (status === "loading" || status === "idle") {
    return (
      <div className={styles.page}>
        <div className={styles.mainRow}>
          <Menu />
          <div className={styles.contentWrapper}>
            <main className={styles.main}>Loading...</main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className={styles.page}>
        <div className={styles.mainRow}>
          <Menu />
          <div className={styles.contentWrapper}>
            <main className={styles.main}>User not found</main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.page}>
        <div className={styles.mainRow}>
          <Menu />
          <div className={styles.contentWrapper}>
            <main className={styles.main}>Error loading profile</main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const avatarSrc = profile?.avatarURL || ProfileImg;
  const website = profile?.website || "";

  const onMessage = async () => {
    if (!accessToken || !profile?._id) return;

    try {
      const conv = await createConversation(profile._id, accessToken);
      const cid = conv?._id || conv?.id;

      if (cid) navigate(`/messages?cid=${cid}`);
      else navigate("/messages");
    } catch (e) {
      console.log("createConversation error:", e);
      navigate("/messages");
    }
  };

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
                      <h2 className={styles.username}>
                        {profile?.username || profile?.email}
                      </h2>
                      <button className={styles.follow}>Follow</button>
                      <button onClick={onMessage} className={styles.message}>
                        Message
                      </button>
                    </div>

                    <ul className={styles.stats}>
                      <li>
                        <span className={styles.statNumber}>
                          {posts.length}
                        </span>{" "}
                        posts
                      </li>
                      <li>
                        <span className={styles.statNumber}>0</span> followers
                      </li>
                      <li>
                        <span className={styles.statNumber}>0</span> following
                      </li>
                    </ul>

                    <div className={styles.bio}>
                      {profile?.about && <p>{profile.about}</p>}
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
                      <div key={p._id || p.id} className={styles.postItem}>
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
    </div>
  );
};

export default UserProfilePage;
