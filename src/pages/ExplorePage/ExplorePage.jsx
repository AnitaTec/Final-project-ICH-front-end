import { useEffect, useState } from "react";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./ExplorePage.module.css";

import { fetchExplorePostsApi } from "../../shared/api/postsApi";
import UserPostView from "../../modules/UserPostView/UserPostView";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [activePost, setActivePost] = useState(null);

  const withOwnerObject = (p) => {
    if (!p) return p;

    if (p.owner && typeof p.owner === "object") return p;

    const ownerUsername =
      p.ownerUsername || p.username || p.ownerEmail || p.email || "";

    const ownerAvatar = p.ownerAvatarURL || p.avatarURL || p.ownerAvatar || "";

    if (!ownerUsername && !ownerAvatar) return p;

    return {
      ...p,
      owner: {
        username: ownerUsername || undefined,
        email: ownerUsername || undefined,
        avatarURL: ownerAvatar || undefined,
      },
    };
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setStatus("loading");
        const data = await fetchExplorePostsApi(24);
        if (cancelled) return;
        setPosts(Array.isArray(data) ? data : []);
        setStatus("success");
      } catch (e) {
        console.log("explore error:", e);
        if (cancelled) return;
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <Menu />
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            <div className={styles.contentRow}>
              <div className={styles.textBlock}>
                {status === "loading" ? (
                  <div className={styles.centerText}>Loading...</div>
                ) : status === "error" ? (
                  <div className={styles.centerText}>Error loading explore</div>
                ) : (
                  <div className={styles.grid}>
                    {posts.map((p) => (
                      <div
                        key={p._id || p.id}
                        className={styles.item}
                        onClick={() => setActivePost(withOwnerObject(p))}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={p.image}
                          alt={p.caption || "post"}
                          className={styles.img}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {activePost && (
        <UserPostView post={activePost} onClose={() => setActivePost(null)} />
      )}
    </div>
  );
};

export default ExplorePage;
