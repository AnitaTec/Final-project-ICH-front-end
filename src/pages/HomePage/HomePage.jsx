import { useEffect, useState } from "react";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./HomePage.module.css";
import UpdateImg from "../../assets/img/Update.png";
import PostCard from "../../modules/PostCard/PostCard";
import UserPostView from "../../modules/UserPostView/UserPostView";

import { fetchFeedPostsApi, fetchPostViewApi } from "../../shared/api/postsApi";
import { patchPostInList } from "../../shared/utils/postsPatchUtils";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");

  const [selectedPost, setSelectedPost] = useState(null);
  const [focusComment, setFocusComment] = useState(false);

  const onOpenPost = (post, opts) => {
    setSelectedPost(post || null);
    setFocusComment(!!opts?.focusComment);
  };

  const onClosePost = () => {
    setSelectedPost(null);
    setFocusComment(false);
  };

  const onPostUpdated = (postId, patch) => {
    setPosts((prev) => patchPostInList(prev, postId, patch));
    setSelectedPost((prev) => {
      if (!prev) return prev;
      const pid = String(prev?._id || prev?.id || "");
      return pid === String(postId) ? { ...prev, ...patch } : prev;
    });
  };

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (!cancelled) setStatus("loading");
    });

    (async () => {
      try {
        const data = await fetchFeedPostsApi(24);
        if (cancelled) return;

        const base = Array.isArray(data) ? data : [];
        setPosts(base);
        setStatus("success");
        const hydrated = await Promise.allSettled(
          base.map(async (p) => {
            const pid = p?._id || p?.id;
            if (!pid) return p;

            try {
              const view = await fetchPostViewApi(pid);

              const viewComments = Array.isArray(view?.comments)
                ? view.comments
                : [];

              const likesCount = Number(
                view?.likesCount ?? view?.likes?.length ?? p?.likesCount ?? 0
              );

              const commentsCount = Number(
                viewComments.length ??
                  p?.commentsCount ??
                  (Array.isArray(p?.comments) ? p.comments.length : 0) ??
                  0
              );

              return {
                ...p,
                ...view,
                likesCount,
                commentsCount,
              };
            } catch {
              return p;
            }
          })
        );

        if (cancelled) return;

        const next = hydrated
          .map((r) => (r.status === "fulfilled" ? r.value : null))
          .filter(Boolean);

        if (next.length) setPosts(next);
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
              <PostCard
                key={p._id || p.id}
                post={p}
                onOpenPost={onOpenPost}
                onPostUpdated={onPostUpdated}
              />
            ))}
          </div>

          <div className={styles.update}>
            <img src={UpdateImg} alt="UpdateImg" />
            <p className={styles.title}>You've seen all the updates</p>
            <p className={styles.info}>You have viewed all new publications</p>
          </div>

          {selectedPost && (
            <UserPostView
              post={selectedPost}
              onClose={onClosePost}
              focusComment={focusComment}
              onPostUpdated={onPostUpdated}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
