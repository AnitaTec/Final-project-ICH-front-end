import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import styles from "./CreatePopup.module.css";

import DropZoneIcon from "../../assets/icons/Drop.svg";
import EmojiIcon from "../../assets/icons/Emoji.svg";

import { createPost } from "../../store/posts/postsSlice";

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const CreatePopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const [imageDataUrl, setImageDataUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setImageDataUrl(dataUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    maxSize: 3 * 1024 * 1024,
  });

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const onShare = async () => {
    if (!imageDataUrl) return;

    setIsSaving(true);
    try {
      await dispatch(
        createPost({
          image: imageDataUrl,
          caption: text.trim(),
        })
      );

      onClose();
      navigate("/profile");
    } catch (e) {
      console.log("createPost error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>

      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
          setShowEmoji(false);
        }}
      >
        <div className={styles.header}>
          <p>Create new post</p>
          <button
            type="button"
            onClick={onShare}
            disabled={isSaving || !imageDataUrl}
          >
            Share
          </button>
        </div>

        <div className={styles.content}>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            {imageDataUrl ? (
              <img src={imageDataUrl} alt="Selected" className={styles.icon} />
            ) : (
              <img src={DropZoneIcon} alt="Drop Here" className={styles.icon} />
            )}
          </div>

          <div className={styles.rightBlock}>
            <textarea
              className={styles.textarea}
              maxLength={2200}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className={styles.counter}>{text.length}/2200</div>

            <div
              className={styles.emojiBar}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.emojiButton}
                onClick={() => setShowEmoji((prev) => !prev)}
              >
                <img src={EmojiIcon} alt="emoji" />
              </button>

              {showEmoji && (
                <div className={styles.emojiPicker}>
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    width={320}
                    height={320}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePopup;
