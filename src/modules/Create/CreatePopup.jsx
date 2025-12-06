import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import EmojiPicker from "emoji-picker-react";
import styles from "./CreatePopup.module.css";

import DropZoneIcon from "../../assets/icons/Drop.svg";
import EmojiIcon from "../../assets/icons/Emoji.svg";

const CreatePopup = ({ onClose }) => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Selected file:", acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
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
          <p>Create new post</p> <button>Share</button>
        </div>

        <div className={styles.content}>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            <img src={DropZoneIcon} alt="Drop Here" className={styles.icon} />
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
