export const toShortTime = (iso) => {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";

  const diff = Date.now() - t;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;

  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;

  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;

  const w = Math.floor(d / 7);
  if (w < 4) return `${w}w`;

  const mo = Math.floor(d / 30);
  return `${mo}mo`;
};

export const norm = (v) =>
  String(v || "")
    .trim()
    .toLowerCase();

export const computeIsSelf = ({ ownerId, meId, ownerKey, meKey }) =>
  (ownerId && meId && String(ownerId) === String(meId)) ||
  (!!ownerKey && !!meKey && ownerKey === meKey);
