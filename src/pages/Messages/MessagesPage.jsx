import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MessagesPage.module.css";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import { selectUser } from "../../store/auth/authSelectors";
import {
  fetchConversations,
  fetchMessages,
} from "../../shared/api/messagesApi";
import {
  connectSocket,
  disconnectSocket,
} from "../../shared/api/socket/socket";

import ProfileImg from "../../assets/img/Profile.png";

import {
  getMyIdFromToken,
  isSameId,
  getOtherParticipant,
  getLastMsgPreview,
} from "../Messages/messages.helpers";

const MessagesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authUser = useSelector((state) => state.auth.user);

  const tokenUserId = useMemo(
    () => getMyIdFromToken(accessToken),
    [accessToken]
  );

  const myId =
    authUser?._id ||
    authUser?.id ||
    authUser?.user?._id ||
    authUser?.user?.id ||
    user?._id ||
    user?.id ||
    user?.user?._id ||
    user?.user?.id ||
    tokenUserId ||
    null;

  const myAvatar = user?.avatarURL || user?.user?.avatarURL || ProfileImg;

  const currentUsername =
    user?.username || user?.user?.username || user?.email || "username";

  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cid = params.get("cid");
    if (!cid) return;

    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) return;

      setActiveId((prev) => {
        if (String(prev) === String(cid)) return prev;
        return cid;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [location.search]);

  const activeConversation = useMemo(
    () => conversations.find((c) => String(c._id) === String(activeId)),
    [conversations, activeId]
  );

  const otherInActive = activeConversation
    ? getOtherParticipant(activeConversation, myId)
    : null;

  useEffect(() => {
    if (!accessToken) return;

    fetchConversations(accessToken).then(setConversations);

    const s = connectSocket(accessToken);

    s.on("message:new", (msg) => {
      const convId = msg.conversationId?._id || msg.conversationId;
      if (convId && String(convId) === String(activeId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    s.on("conversation:updated", ({ conversationId, lastMessage }) => {
      setConversations((prev) =>
        prev.map((c) =>
          String(c._id) === String(conversationId) ? { ...c, lastMessage } : c
        )
      );
    });

    return () => {
      s.off("message:new");
      s.off("conversation:updated");
      disconnectSocket();
    };
  }, [accessToken, activeId]);

  useEffect(() => {
    if (!accessToken || !activeId) return;

    fetchMessages(activeId, accessToken).then(setMessages);

    const s = connectSocket(accessToken);
    s.emit("conversation:join", activeId);

    return () => {
      s.emit("conversation:leave", activeId);
    };
  }, [activeId, accessToken]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = () => {
    if (!text.trim() || !activeId) return;
    const s = connectSocket(accessToken);
    s.emit("message:send", { conversationId: activeId, text: text.trim() });
    setText("");
  };

  const onViewProfile = () => {
    if (!otherInActive?.username) return;
    navigate(`/users/${otherInActive.username}`);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <Menu />

        <main className={styles.main}>
          <div className={styles.wrap}>
            <div className={styles.left}>
              <div className={styles.leftHeader}>
                <span className={styles.headerTitle}>{currentUsername}</span>
              </div>

              <div className={styles.convList}>
                {conversations.map((c) => {
                  const other = getOtherParticipant(c, myId);
                  const preview = getLastMsgPreview(c, myId);

                  return (
                    <button
                      key={c._id}
                      className={`${styles.convItem} ${
                        String(activeId) === String(c._id) ? styles.active : ""
                      }`}
                      onClick={() => setActiveId(c._id)}
                    >
                      <img
                        className={styles.convAvatar}
                        src={other?.avatarURL || ProfileImg}
                        alt=""
                      />

                      <div className={styles.convMeta}>
                        <div className={styles.convName}>
                          {other?.username || other?.email || "User"}
                        </div>

                        <div className={styles.convPreview}>
                          {preview.line1}{" "}
                          {preview.line2 ? (
                            <span className={styles.convTime}>
                              {preview.line2}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.right}>
              {!activeConversation ? (
                <div className={styles.empty}>Choose a chat</div>
              ) : (
                <>
                  <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderLeft}>
                      <img
                        className={styles.chatHeaderAvatar}
                        src={otherInActive?.avatarURL || ProfileImg}
                        alt=""
                      />
                      <div className={styles.chatHeaderName}>
                        {otherInActive?.username ||
                          otherInActive?.email ||
                          "Chat"}
                      </div>
                    </div>
                  </div>

                  <div className={styles.profileCard}>
                    <img
                      className={styles.profileCardAvatar}
                      src={otherInActive?.avatarURL || ProfileImg}
                      alt=""
                    />
                    <div className={styles.profileCardName}>
                      {otherInActive?.username ||
                        otherInActive?.email ||
                        "User"}
                    </div>

                    <button
                      type="button"
                      className={styles.profileCardBtn}
                      onClick={onViewProfile}
                    >
                      View profile
                    </button>
                  </div>

                  <div className={styles.chatBody}>
                    {messages.map((m) => {
                      const senderId = m.sender?._id || m.sender;
                      const mine = myId ? isSameId(senderId, myId) : false;

                      const senderAvatar = m.sender?.avatarURL || ProfileImg;
                      const avatarToShow = mine ? myAvatar : senderAvatar;

                      return (
                        <div
                          key={m._id}
                          className={`${styles.msgRow} ${
                            mine ? styles.mine : styles.theirs
                          }`}
                        >
                          {!mine && (
                            <img
                              className={styles.msgAvatar}
                              src={avatarToShow}
                              alt=""
                            />
                          )}

                          <div className={styles.bubble}>{m.text}</div>

                          {mine && (
                            <img
                              className={styles.msgAvatar}
                              src={avatarToShow}
                              alt=""
                            />
                          )}
                        </div>
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>

                  <div className={styles.chatInput}>
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write message"
                      onKeyDown={onInputKeyDown}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MessagesPage;
