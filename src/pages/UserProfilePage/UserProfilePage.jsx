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

import UserPostView from "../../modules/UserPostView/UserPostView";

import { followApi, unfollowApi } from "../../shared/api/followApi";
import {
  fetchFollowInfo,
  setCounts,
  setIsFollowing,
} from "../../store/follow/followSlice";
import {
  selectFollowCountsByUserId,
  selectIsFollowingByUserId,
} from "../../store/follow/followSelectors";
import { selectUser } from "../../store/auth/authSelectors";

import {
  getSafeUsername,
  getEntityId,
  getProfileMeta,
  resolveProfileStatusFromError,
  computeNextFollowers,
} from "../../shared/utils/userProfilePageUtils";

const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const me = useSelector(selectUser);

  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [activePost, setActivePost] = useState(null);
  const [followBusy, setFollowBusy] = useState(false);

  const safeUsername = useMemo(() => getSafeUsername(username), [username]);

  const selectPostsForThisUser = useMemo(
    () => makeSelectPostsByOwnerKey(safeUsername),
    [safeUsername]
  );
  const posts = useSelector(selectPostsForThisUser);

  useEffect(() => {
    if (!safeUsername || !accessToken) return;

    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const data = await fetchUserByUsername(safeUsername, accessToken);
        if (cancelled) return;
        setProfile(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        const nextStatus = resolveProfileStatusFromError(err);
        if (nextStatus === "notfound") setProfile(null);
        setStatus(nextStatus);
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

  const profileId = getEntityId(profile);
  const meId = getEntityId(me);

  const counts = useSelector(selectFollowCountsByUserId(profileId));
  const followed = useSelector(selectIsFollowingByUserId(profileId));

  useEffect(() => {
    if (!accessToken || !profileId) return;
    dispatch(fetchFollowInfo({ userId: profileId, accessToken }));
  }, [dispatch, accessToken, profileId]);

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

  const { avatarSrc, website } = getProfileMeta(profile, ProfileImg);

  const onMessage = async () => {
    if (!accessToken || !profile?._id) return;

    try {
      const conv = await createConversation(profile._id, accessToken);
      const cid = conv?._id || conv?.id;

      if (cid) navigate(`/messages?cid=${cid}`);
      else navigate("/messages");
    } catch (err) {
      console.log("createConversation error:", err);
      navigate("/messages");
    }
  };

  const onToggleFollow = async () => {
    if (!accessToken || !profileId || followBusy) return;

    const prevFollowed = followed;
    const prevFollowers = Number(counts.followers || 0);
    const prevFollowing = Number(counts.following || 0);

    setFollowBusy(true);

    dispatch(setIsFollowing({ userId: profileId, isFollowing: !prevFollowed }));
    dispatch(
      setCounts({
        userId: profileId,
        followers: computeNextFollowers(prevFollowed, prevFollowers),
        following: prevFollowing,
      })
    );

    try {
      if (prevFollowed) {
        await unfollowApi(profileId, accessToken);
      } else {
        await followApi(profileId, accessToken);
      }

      if (meId) {
        dispatch(fetchFollowInfo({ userId: meId, accessToken }));
      }
    } catch (err) {
      console.log("follow error:", err);
      dispatch(
        setIsFollowing({ userId: profileId, isFollowing: prevFollowed })
      );
      dispatch(
        setCounts({
          userId: profileId,
          followers: prevFollowers,
          following: prevFollowing,
        })
      );
    } finally {
      setFollowBusy(false);
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

                      <button
                        className={styles.follow}
                        onClick={onToggleFollow}
                        disabled={followBusy}
                      >
                        {followed ? "Following" : "Follow"}
                      </button>

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
                        <span className={styles.statNumber}>
                          {counts.followers}
                        </span>{" "}
                        followers
                      </li>
                      <li>
                        <span className={styles.statNumber}>
                          {counts.following}
                        </span>{" "}
                        following
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
        <UserPostView post={activePost} onClose={() => setActivePost(null)} />
      )}
    </div>
  );
};

export default UserProfilePage;
