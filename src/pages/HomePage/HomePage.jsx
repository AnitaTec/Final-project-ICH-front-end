import { useEffect, useState } from "react";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./HomePage.module.css";
import UpdateImg from "../../assets/img/Update.png";
import PostCard from "../../modules/PostCard/PostCard";

import { fetchFeedPostsApi } from "../../shared/api/postsApi";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (!cancelled) setStatus("loading");
    });

    (async () => {
      try {
        const data = await fetchFeedPostsApi(24);
        if (cancelled) return;
        setPosts(Array.isArray(data) ? data : []);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        console.log("feed error:", e);
        setPosts([]);
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <Menu />

        <main className={styles.main} data-status={status}>
          <div className={styles.grid}>
            {posts.map((p) => (
              <PostCard key={p._id || p.id} post={p} />
            ))}
          </div>

          <div className={styles.update}>
            <img src={UpdateImg} alt="UpdateImg" />
            <p className={styles.title}>You've seen all the updates</p>
            <p className={styles.info}>You have viewed all new publications</p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
