export const decodeBase64Url = (str) => {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad) base64 += "=".repeat(4 - pad);
    return atob(base64);
  } catch {
    return null;
  }
};

export const getMyIdFromToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const json = decodeBase64Url(parts[1]);
    if (!json) return null;

    const payload = JSON.parse(json);
    return payload.id || payload._id || payload.userId || null;
  } catch {
    return null;
  }
};

export const formatAgo = (dateValue) => {
  const d = dateValue ? new Date(dateValue) : null;
  if (!d || Number.isNaN(d.getTime())) return "";

  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (year >= 1) return `${year} ${year === 1 ? "year" : "years"}`;
  if (month >= 1) return `${month} ${month === 1 ? "month" : "months"}`;
  if (week >= 1) return `${week} ${week === 1 ? "week" : "weeks"}`;
  if (day >= 1) return `${day} ${day === 1 ? "day" : "days"}`;
  if (hr >= 1) return `${hr} ${hr === 1 ? "hour" : "hours"}`;
  if (min >= 1) return `${min} ${min === 1 ? "min" : "mins"}`;
  return "just now";
};

export const isSameId = (a, b) => String(a) === String(b);

export const getOtherParticipant = (conv, myId) => {
  if (!conv?.participants?.length) return null;

  const participants = conv.participants.map((p) =>
    typeof p === "string" ? { _id: p } : p
  );

  if (!myId) return participants[0];

  return participants.find((p) => !isSameId(p._id, myId)) || participants[0];
};

export const getLastMsgPreview = (conv, myId) => {
  const lm = conv?.lastMessage;
  if (!lm) return { line1: "No messages yet", line2: "" };

  const senderId = lm.sender?._id || lm.sender;
  const mine = myId ? isSameId(senderId, myId) : false;

  const other = getOtherParticipant(conv, myId);
  const otherName = other?.username || other?.email || "User";

  const senderName = mine
    ? "You"
    : lm.sender?.username || lm.sender?.email || otherName;

  const ago = formatAgo(lm.createdAt || lm.updatedAt || conv.updatedAt);

  return {
    line1: `${senderName} sent a message.`,
    line2: ago ? `· ${ago}` : "",
  };
};
